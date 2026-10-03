import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { deriveSoloFlowState, resolveConsumeOutcome } from "./solo-flow-recovery.js";

const app = readFileSync("app.js", "utf8");
const schema = readFileSync("supabase-schema.sql", "utf8");

assert.equal(deriveSoloFlowState({ answerSaved: false }), "QUESTION_READY");
assert.equal(deriveSoloFlowState({ answerSaved: true }), "ANSWER_SAVED");
assert.equal(deriveSoloFlowState({ answerSaved: true, pending: true }), "FRAGMENT_PENDING");
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: { id: "f1" } }), "FRAGMENT_READY");
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: { id: "f1" }, feedInteraction: "submitting" }), "FEEDING");
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: { id: "f1" }, feedInteraction: "retry" }), "FEED_RETRY");
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: { id: "f1" }, petLoadStatus: "error" }), "PET_LOAD_ERROR");
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: { id: "f1", consumed_at: "now" } }), "FEED_COMMITTED");
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: { id: "f1", consumed_at: "now" }, growthUpdated: true }), "GROWTH_UPDATED");

// Claim failure retains the local pending state; a later successful claim derives READY.
const pending = { date: "2026-10-03", source: "solo" };
assert.equal(deriveSoloFlowState({ answerSaved: true, pending }), "FRAGMENT_PENDING");
const claimed = { id: "fragment-1", date: pending.date, source: "solo", consumed_at: null };
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: claimed }), "FRAGMENT_READY");

// A failed consume with an unconsumed canonical event remains retryable.
const retry = await resolveConsumeOutcome({
  consume: async () => { throw new Error("offline"); },
  readFragment: async () => claimed,
  readPet: async () => ({ growth_points: 4 }),
});
assert.equal(retry.status, "retry");
assert.equal(retry.event.id, claimed.id);

// Model the existing SQL idempotency contract: a fragment can grant one point only once.
let serverPoints = 3;
let serverEvent = { ...claimed };
const consumeOnce = async () => {
  if (serverEvent.consumed_at) return { status: "already_consumed", fragment_id: serverEvent.id, pet_id: "pet-1", growth_points: serverPoints, consumed_at: serverEvent.consumed_at };
  serverPoints += 1;
  serverEvent = { ...serverEvent, pet_id: "pet-1", consumed_at: "2026-10-03T00:01:00Z", growth_result: { growth_points: serverPoints } };
  return { status: "consumed", fragment_id: serverEvent.id, pet_id: "pet-1", growth_points: serverPoints, consumed_at: serverEvent.consumed_at };
};
const committed = await resolveConsumeOutcome({ consume: consumeOnce, readFragment: async () => serverEvent, readPet: async () => ({ id: "pet-1", growth_points: serverPoints }) });
assert.equal(committed.status, "committed");
assert.equal(committed.growthPoints, 4);
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: serverEvent, growthUpdated: true }), "GROWTH_UPDATED");
const duplicate = await resolveConsumeOutcome({ consume: consumeOnce, readFragment: async () => serverEvent, readPet: async () => ({ id: "pet-1", growth_points: serverPoints }) });
assert.equal(duplicate.status, "committed");
assert.equal(duplicate.result.status, "already_consumed");
assert.equal(serverPoints, 4, "duplicate consume must not grant another point");

// Server commit followed by a lost client response is recovered from fragment_events and pets.
let responseLost = false;
const lostResponse = await resolveConsumeOutcome({
  consume: async () => {
    if (!responseLost) {
      responseLost = true;
      serverEvent = { ...serverEvent, consumed_at: "2026-10-03T00:02:00Z", growth_result: { growth_points: 5 } };
      serverPoints = 5;
      throw new Error("response lost");
    }
  },
  readFragment: async () => serverEvent,
  readPet: async () => ({ id: "pet-1", growth_points: serverPoints }),
});
assert.equal(lostResponse.status, "committed");
assert.equal(lostResponse.recoveredFromResponseLoss, true);
assert.equal(lostResponse.growthPoints, 5);

// already_consumed is success, including when the event read is unavailable; RPC point is canonical fallback.
const already = await resolveConsumeOutcome({
  consume: async () => ({ status: "already_consumed", fragment_id: "f1", pet_id: "pet-1", growth_points: 5, consumed_at: "2026-10-03T00:02:00Z" }),
  readFragment: async () => { throw new Error("read unavailable"); },
  readPet: async () => { throw new Error("pet read unavailable"); },
});
assert.equal(already.status, "committed");
assert.equal(already.growthPoints, 5);
assert.equal(already.growthRefreshFailed, true);

// Pet read failure is represented separately from an actual zero-point loaded pet.
assert.equal(deriveSoloFlowState({ answerSaved: true, fragment: claimed, petLoadStatus: "error" }), "PET_LOAD_ERROR");
assert.match(app, /ensureActivePet\(\{ explicitRetry = false \} = \{\}\)/);
assert.match(app, /ensureActivePet\(\{ explicitRetry: true \}\)/);
assert.match(app, /if \(petLoadStatus === "error" && !explicitRetry\) return null/);

// Rapid click is guarded in the real click path; answer save precedes the local fragment enqueue.
assert.match(app, /!\["idle", "retry"\]\.includes\(feedInteraction\)/);
assert.match(app, /state\.answers\.push\([\s\S]*?save\(\);\s*queueDailyFragment\("solo", today\)/);
assert.match(app, /fragmentState\.pending\.push\(\{ date: day, source \}\)/);
assert.match(app, /await roomBackend\.claimDailyFragment\(fragment\)/);
assert.match(app, /fragmentState\.pending = fragmentState\.pending\.filter\(\(entry\) => entry !== fragment\)/);
const recovery = readFileSync("solo-flow-recovery.js", "utf8");
assert.match(recovery, /\["consumed", "already_consumed"\]\.includes\(result\.status\)/);
assert.match(app, /outcome\.status !== "committed"/);
assert.match(app, /getPetStateFromExistingSession\(activePetIdentity\(\)\)/);
assert.match(schema, /unique \(user_id, date\)/);
assert.match(schema, /if fragment_row\.consumed_at is not null/);
assert.match(schema, /set growth_points = p\.growth_points \+ 1/);
assert.deepEqual([...app.matchAll(/\["(potted-flower|flower-bed|stepping-stones|garden-bench|sapling)", (\d+)\]/g)].map((match) => [match[1], Number(match[2])]), [
  ["potted-flower", 21], ["flower-bed", 30], ["stepping-stones", 45], ["garden-bench", 60], ["sapling", 90],
]);

function extractFunction(name, nextName) {
  const start = app.indexOf(`async function ${name}(`);
  const end = app.indexOf(`\nfunction ${nextName}(`, start + 1);
  assert.ok(start >= 0 && end > start, `function ${name} exists`);
  return app.slice(start, end);
}
function extractRegularFunction(name, nextName) {
  const start = app.indexOf(`function ${name}(`);
  const end = app.indexOf(`\nfunction ${nextName}(`, start + 1);
  assert.ok(start >= 0 && end > start, `function ${name} exists`);
  return app.slice(start, end);
}
function makeConsumeHarness({ initialConsumedAt = null, mode = "success" } = {}) {
  const fragment = { id: "fragment-live", date: "2026-10-03", source: "solo", consumed_at: null };
  let points = 8;
  let event = { ...fragment, consumed_at: initialConsumedAt, growth_result: initialConsumedAt ? { growth_points: points } : null };
  let consumeCalls = 0;
  let growthWrites = 0;
  const button = { disabled: false, textContent: "주기", classList: { add() {}, remove() {} } };
  const archive = { classList: { contains: () => true } };
  const context = {
    fragmentForDate: () => event.consumed_at ? null : { ...event },
    syncToday: () => fragment.date,
    $(selector) { return selector === "#feed-fragment" ? button : archive; },
    canUseFragmentBackend: true,
    feedInteraction: "idle",
    fragmentCtaError: "",
    fragmentState: { pending: [], claimed: [{ ...event }] },
    petLoadStatus: "ready",
    ensureActivePet: async () => ({ id: "pet-live", species: "hamster", variant: "mochi", growth_points: points }),
    updateFragmentDebug() {},
    recordFragmentDebugError() {},
    resolveConsumeOutcome,
    roomBackend: {
      async consumeDailyFragment() {
        consumeCalls += 1;
        if (mode === "fail") throw new Error("network unavailable");
        if (event.consumed_at) return { status: "already_consumed", fragment_id: event.id, pet_id: "pet-live", growth_points: points, consumed_at: event.consumed_at };
        points += 1;
        growthWrites += 1;
        event = { ...event, consumed_at: "2026-10-03T00:05:00Z", growth_result: { growth_points: points } };
        if (mode === "response-loss") throw new Error("response lost");
        return { status: "consumed", fragment_id: event.id, pet_id: "pet-live", growth_points: points, consumed_at: event.consumed_at };
      },
      async getFragmentEvent() { return { ...event }; },
      async getPetStateFromExistingSession() { return { id: "pet-live", species: "hamster", variant: "mochi", growth_points: points }; },
    },
    createRuntimePetState(identity, pet) { return { identity, growthPoints: pet.growth_points, growthStage: "GROWING", growthScale: 1, primaryTrait: null, loaded: true }; },
    runtimePetIdentity: () => "hamster:mochi",
    applyRuntimePetScale() {},
    renderPetRecord() {},
    renderFragmentCta() {},
    renderGarden() {},
    playFragmentFeedMotion: async () => {},
    startFragmentReaction() {},
    renderArchive() {},
    safeDebugMessage: (error) => error?.message || "",
    Number,
    Date,
  };
  context.activePet = null;
  context.runtimePetState = { growthPoints: 8 };
  runInNewContext(`${extractFunction("consumeTodayFragment", "dailyQuestionSet")}\nglobalThis.runConsume = consumeTodayFragment;`, context);
  return { context, button, get points() { return points; }, get event() { return event; }, get consumeCalls() { return consumeCalls; }, get growthWrites() { return growthWrites; } };
}

// Exercise the actual application consume handler against a fake, idempotent RPC boundary.
const liveSuccess = makeConsumeHarness();
await liveSuccess.context.runConsume();
assert.equal(liveSuccess.points, 9);
assert.equal(liveSuccess.growthWrites, 1);
assert.ok(liveSuccess.context.fragmentState.claimed[0].consumed_at);

const liveResponseLoss = makeConsumeHarness({ mode: "response-loss" });
await liveResponseLoss.context.runConsume();
assert.equal(liveResponseLoss.points, 9);
assert.equal(liveResponseLoss.growthWrites, 1);
assert.ok(liveResponseLoss.context.fragmentState.claimed[0].consumed_at);

const liveAlreadyConsumed = makeConsumeHarness({ initialConsumedAt: "2026-10-03T00:03:00Z" });
await liveAlreadyConsumed.context.runConsume();
assert.equal(liveAlreadyConsumed.points, 8);
assert.equal(liveAlreadyConsumed.growthWrites, 0);
assert.ok(liveAlreadyConsumed.context.fragmentState.claimed[0].consumed_at);

const liveFailure = makeConsumeHarness({ mode: "fail" });
await liveFailure.context.runConsume();
assert.equal(liveFailure.context.feedInteraction, "retry");
assert.equal(liveFailure.context.fragmentState.claimed[0].consumed_at, null);
assert.equal(liveFailure.points, 8);

// Run the real local queue writer and claim retry loop with stubbed persistence/backend.
const queueContext = {
  syncToday: () => "2026-10-03",
  fragmentForDate: () => null,
  fragmentCtaError: "",
  fragmentState: { pending: [], claimed: [] },
  saved: false,
  saveFragmentState() { queueContext.saved = true; },
  recordFragmentDebugError() {},
  renderGarden() {},
  started: false,
  startFragmentLifecycle() { queueContext.started = true; },
};
runInNewContext(`${extractRegularFunction("queueDailyFragment", "startFragmentLifecycle")}\nglobalThis.queueFragment = queueDailyFragment;`, queueContext);
queueContext.queueFragment("solo");
assert.equal(queueContext.fragmentState.pending.length, 1);
assert.equal(queueContext.saved, true);
assert.equal(queueContext.started, true);

const claimFailureContext = {
  canUseFragmentBackend: true,
  fragmentState: { pending: [{ date: "2026-10-03", source: "solo" }], claimed: [] },
  fragmentSyncPromise: null,
  roomBackend: { initialize: async () => {}, claimDailyFragment: async () => { throw new Error("offline"); } },
  updateFragmentDebug() {}, recordFragmentDebugError() {}, saveFragmentState() {}, renderGarden() {}, restoreFragmentEvents: async () => {},
};
runInNewContext(`${extractFunction("syncPendingFragments", "playFragmentFeedMotion")}\nglobalThis.syncPending = syncPendingFragments;`, claimFailureContext);
await claimFailureContext.syncPending();
assert.equal(claimFailureContext.fragmentState.pending.length, 1);

const claimSuccessContext = {
  canUseFragmentBackend: true,
  fragmentState: { pending: [{ date: "2026-10-03", source: "solo" }], claimed: [] },
  fragmentSyncPromise: null,
  roomBackend: { initialize: async () => {}, claimDailyFragment: async (entry) => ({ ...entry, id: "fragment-claimed", consumed_at: null }) },
  updateFragmentDebug() {}, recordFragmentDebugError() {}, saveFragmentState() {}, renderGarden() {}, restoreFragmentEvents: async () => {},
};
runInNewContext(`${extractFunction("syncPendingFragments", "playFragmentFeedMotion")}\nglobalThis.syncPending = syncPendingFragments;`, claimSuccessContext);
await claimSuccessContext.syncPending();
assert.equal(claimSuccessContext.fragmentState.pending.length, 0);
assert.equal(claimSuccessContext.fragmentState.claimed[0].id, "fragment-claimed");

const recoveryStart = app.indexOf("async function recoverTodaySoloFragment(");
const recoveryEnd = app.indexOf("\nfunction renderFragmentCta(", recoveryStart);
assert.ok(recoveryStart >= 0 && recoveryEnd > recoveryStart);
const refreshedClaim = { id: "fragment-after-refresh", date: "2026-10-03", source: "solo", consumed_at: null };
const refreshRecoveryContext = {
  canUseFragmentBackend: true,
  fragmentState: { pending: [], claimed: [] },
  fragmentRecoveryPromise: null,
  syncToday: () => "2026-10-03",
  todayAnswer: () => ({ date: "2026-10-03", answer: "기록" }),
  roomBackend: { claimDailyFragment: async () => refreshedClaim, listFragmentEventsFromExistingSession: async () => [refreshedClaim] },
  updateFragmentDebug() {}, recordFragmentDebugError() {}, saveFragmentState() {}, renderGarden() {},
};
runInNewContext(`${app.slice(recoveryStart, recoveryEnd)}\nglobalThis.recoverSolo = recoverTodaySoloFragment;`, refreshRecoveryContext);
await refreshRecoveryContext.recoverSolo([]);
assert.equal(refreshRecoveryContext.fragmentState.claimed[0].id, "fragment-after-refresh");
assert.equal(refreshRecoveryContext.fragmentState.pending.length, 0);

const restoreStart = app.indexOf("async function restoreFragmentEvents(");
const restoreEnd = app.indexOf("\nasync function recoverTodaySoloFragment(", restoreStart);
assert.ok(restoreStart >= 0 && restoreEnd > restoreStart);
const serverConsumed = { id: "fragment-restored-consumed", date: "2026-10-03", source: "solo", consumed_at: "2026-10-03T00:06:00Z", growth_result: { growth_points: 9 } };
const restoreContext = {
  canUseFragmentBackend: true,
  roomBackend: { isConfigured: true, listFragmentEventsFromExistingSession: async () => [serverConsumed] },
  fragmentState: { pending: [], claimed: [] },
  updateFragmentDebug() {}, recordFragmentDebugError() {}, saveFragmentState() {}, renderGarden() {}, renderArchive() {},
  $(selector) { return { classList: { contains: () => true } }; },
  recoverTodaySoloFragment: async () => {},
};
runInNewContext(`${app.slice(restoreStart, restoreEnd)}\nglobalThis.restoreEvents = restoreFragmentEvents;`, restoreContext);
await restoreContext.restoreEvents();
assert.equal(restoreContext.fragmentState.claimed[0].consumed_at, serverConsumed.consumed_at);

const doubleClick = makeConsumeHarness();
const firstClick = doubleClick.context.runConsume();
await doubleClick.context.runConsume();
await firstClick;
assert.equal(doubleClick.consumeCalls, 1);
assert.equal(doubleClick.growthWrites, 1);

// The pet retry handler is user-triggered and supplies the explicit retry flag once.
const retryApp = app.slice(app.indexOf("async function retryPetLoad()"), app.indexOf("async function restoreFragmentEvents()"));
let petRetryCalls = 0;
const retryContext = {
  fragmentCtaError: "",
  fragmentForDate: () => ({ id: "fragment-live" }),
  syncToday: () => "2026-10-03",
  ensureActivePet: async (options) => { petRetryCalls += 1; assert.equal(options.explicitRetry, true); },
  renderPetRecord() {}, renderFragmentCta() {},
};
runInNewContext(`${retryApp}\nglobalThis.retryPet = retryPetLoad;`, retryContext);
await retryContext.retryPet();
assert.equal(petRetryCalls, 1);

const petLoadStart = app.indexOf("async function loadRuntimePetState(");
const petLoadEnd = app.indexOf("\nasync function ensureActivePet(", petLoadStart);
assert.ok(petLoadStart >= 0 && petLoadEnd > petLoadStart);
const beginNormal = app.slice(app.indexOf("function beginNormalApp()"), app.indexOf("\nfunction formatDate(", app.indexOf("function beginNormalApp()")));
const restoreEvents = app.slice(app.indexOf("async function restoreFragmentEvents("), app.indexOf("\nasync function recoverTodaySoloFragment(", app.indexOf("async function restoreFragmentEvents(")));
const renderGarden = app.slice(app.indexOf("function renderGarden({ resetAnimal = true }") , app.indexOf("\nfunction renderPreferences(", app.indexOf("function renderGarden({ resetAnimal = true }")));
const showView = app.slice(app.indexOf("function showView("), app.indexOf("\nconst behaviorMessages =", app.indexOf("function showView(")));
assert.match(beginNormal, /renderGarden\(\)/, "normal bootstrap's initial Pet-load consumer is renderGarden");
assert.match(beginNormal, /startFragmentLifecycle\(\)/, "normal bootstrap also starts fragment restoration");
assert.match(restoreEvents, /renderGarden\(\{ resetAnimal: false \}\)/, "fragment restore re-renders Garden after the initial fetch settles");
assert.match(renderGarden, /void loadRuntimePetState\(\)/, "both Garden renders request runtime Pet state");
assert.ok(renderGarden.indexOf("void loadRuntimePetState()") < renderGarden.indexOf("renderFragmentCta()"), "the shared load marks Pet state loading before the CTA can request ensureActivePet");
assert.match(showView, /if \(name === "garden"\) void startFragmentLifecycle\(\)/, "initial view selection also enters the lifecycle bootstrap");
assert.match(app.slice(petLoadStart, petLoadEnd), /if \(runtimePetLoadPromise\) return runtimePetLoadPromise/, "concurrent Pet consumers share the in-flight request");
assert.match(app.slice(petLoadStart, petLoadEnd), /petLoadStatus === "error" && runtimePetState\.identity === identity/, "settled failure suppresses implicit lifecycle retries");
let petLoadFailureReads = 0;
const petLoadFailureContext = {
  runtimePetIdentity: () => "hamster:mochi",
  activePetIdentity: () => ({ species: "hamster", variant: "mochi" }),
  canUseFragmentBackend: true,
  roomBackend: { isConfigured: true, getPetStateFromExistingSession: async () => { petLoadFailureReads += 1; throw new Error("offline"); } },
  petLoadStatus: "idle", runtimePetState: { identity: "hamster:mochi", loaded: false }, runtimePetLoadId: 0, runtimePetLoadPromise: null, activePet: null,
  createRuntimePetState: (identity) => ({ identity, growthPoints: 0, loaded: false }),
  applyRuntimePetScale() {}, renderPetRecord() {}, renderFragmentCta() {},
};
runInNewContext(`${app.slice(petLoadStart, petLoadEnd)}\nglobalThis.loadPetState = loadRuntimePetState;`, petLoadFailureContext);
assert.equal(await petLoadFailureContext.loadPetState(), false);
assert.equal(petLoadFailureReads, 1, "error initial load performs one Pet read");
assert.equal(petLoadFailureContext.petLoadStatus, "error");
assert.equal(petLoadFailureContext.runtimePetState.loaded, false, "failed fetch must not become a loaded zero-growth pet");
assert.equal(await petLoadFailureContext.loadPetState(), false, "a later lifecycle render must not automatically retry the failed load");
assert.equal(petLoadFailureReads, 1, "post-error renderer performs no additional automatic Pet read");
await new Promise((resolve) => setTimeout(resolve, 1500));
assert.equal(petLoadFailureReads, 1, "waiting 1.5 seconds after Pet-load error starts no automatic request");

// Two renderers asking during one in-flight load share one actual backend read.
let resolvePetRead;
let duplicateConsumerReads = 0;
const duplicateConsumerContext = {
  runtimePetIdentity: () => "hamster:mochi",
  activePetIdentity: () => ({ species: "hamster", variant: "mochi" }),
  canUseFragmentBackend: true,
  roomBackend: { isConfigured: true, getPetStateFromExistingSession: async () => {
    duplicateConsumerReads += 1;
    return new Promise((resolve) => { resolvePetRead = resolve; });
  } },
  petLoadStatus: "idle", runtimePetState: { identity: "hamster:mochi", loaded: false }, runtimePetLoadId: 0, runtimePetLoadPromise: null, activePet: null,
  createRuntimePetState: (identity, pet) => ({ identity, growthPoints: pet?.growth_points ?? null, loaded: Boolean(pet) }),
  applyRuntimePetScale() {}, renderPetRecord() {}, renderFragmentCta() {},
};
runInNewContext(`${app.slice(petLoadStart, petLoadEnd)}\nglobalThis.loadPetState = loadRuntimePetState;`, duplicateConsumerContext);
const firstPetConsumer = duplicateConsumerContext.loadPetState();
const secondPetConsumer = duplicateConsumerContext.loadPetState();
assert.equal(duplicateConsumerReads, 1, "same-loading consumers must share one backend read");
resolvePetRead({ id: "pet-1", species: "hamster", variant: "mochi", growth_points: 8, growth_stage: "GROWING" });
assert.equal(await firstPetConsumer, true);
assert.equal(await secondPetConsumer, true);
assert.equal(duplicateConsumerContext.petLoadStatus, "ready");

// An explicit retry starts exactly one new request after the prior failure.
let retryReadCalls = 0;
const manualRetryContext = {
  runtimePetIdentity: () => "hamster:mochi",
  activePetIdentity: () => ({ species: "hamster", variant: "mochi" }),
  canUseFragmentBackend: true,
  roomBackend: { isConfigured: true, getPetStateFromExistingSession: async () => {
    retryReadCalls += 1;
    if (retryReadCalls === 1) throw new Error("offline");
    return { id: "pet-1", species: "hamster", variant: "mochi", growth_points: 8, growth_stage: "GROWING" };
  } },
  petLoadStatus: "idle", runtimePetState: { identity: "hamster:mochi", loaded: false }, runtimePetLoadId: 0, runtimePetLoadPromise: null, activePet: null,
  createRuntimePetState: (identity, pet) => ({ identity, growthPoints: pet?.growth_points ?? null, loaded: Boolean(pet) }),
  applyRuntimePetScale() {}, renderPetRecord() {}, renderFragmentCta() {},
};
runInNewContext(`${app.slice(petLoadStart, petLoadEnd)}\nglobalThis.loadPetState = loadRuntimePetState;`, manualRetryContext);
assert.equal(await manualRetryContext.loadPetState(), false);
await manualRetryContext.loadPetState();
assert.equal(retryReadCalls, 1, "failed promise must not be cached as an implicit retry");
assert.equal(await manualRetryContext.loadPetState({ force: true }), true, "explicit retry must bypass the failure guard");
assert.equal(retryReadCalls, 2, "explicit retry starts one fresh backend read");
assert.equal(manualRetryContext.petLoadStatus, "ready");

console.log("Solo core-flow recovery checks passed (state mapping, claim recovery model, consume retry/lost-response/idempotency, Pet load single-flight/error guard/manual retry, guarded clicks, growth and garden thresholds). No backend or localStorage was contacted.");
