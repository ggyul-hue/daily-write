import { dailyQuestions, dateKey, questions } from "./data.js";
import { behaviorWeights, chooseBehavior, createAnimalProfile, species } from "./animal-system.js";
import { getAnimalDefinition } from "./animal-manifest.js";
import { normalizeInviteCode, roomBackend } from "./room-backend.js";

const query = new URLSearchParams(location.search);
const requestedQaDate = query.get("qaDate");
const parsedQaDate = requestedQaDate && /^\d{4}-\d{2}-\d{2}$/.test(requestedQaDate) ? new Date(`${requestedQaDate}T12:00:00`) : null;
const isQaMode = query.get("qa") === "1" && Boolean(parsedQaDate) && dateKey(parsedQaDate) === requestedQaDate;
const qaDate = isQaMode ? requestedQaDate : null;
const storagePrefix = isQaMode ? `dailyWrite.qa.${qaDate}` : "daily-write";
const STORAGE_KEY = isQaMode ? `${storagePrefix}.solo-v1` : "daily-write-solo-v1";
let storedState;
try { storedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { storedState = null; }
function answerText(answer) { return answer?.answer ?? answer?.value ?? ""; }
function normalizeAnswer(answer) {
  const value = answerText(answer);
  return { ...answer, answer: value, value: answer.value ?? value, createdAt: answer.createdAt || null };
}
const state = Array.isArray(storedState?.answers)
  ? { ...storedState, answers: storedState.answers.map(normalizeAnswer), dailyQuestionSets: typeof storedState.dailyQuestionSets === "object" && storedState.dailyQuestionSets ? storedState.dailyQuestionSets : {} }
  : { answers: [], animal: { name: "모찌" }, dailyQuestionSets: {} };
let today = qaDate || dateKey();
let selectedQuestion;
const ANIMAL_KEY = isQaMode ? `${storagePrefix}.animal-profile-v1` : "daily-write-animal-profile-v1";
const PREFERENCES_KEY = isQaMode ? `${storagePrefix}.preferences-v1` : "daily-write-preferences-v1";
const FRAGMENT_STATE_KEY = isQaMode ? `${storagePrefix}.fragment-state-v1` : "daily-write-fragment-state-v1";
let animalProfile = JSON.parse(localStorage.getItem(ANIMAL_KEY) || "null");
if (!animalProfile) { animalProfile = createAnimalProfile("hamster"); localStorage.setItem(ANIMAL_KEY, JSON.stringify(animalProfile)); }
const previewId = location.hostname === "127.0.0.1" ? new URLSearchParams(location.search).get("animalPreview") : null;
const previewPose = location.hostname === "127.0.0.1" ? new URLSearchParams(location.search).get("animalPreviewPose") : null;
if (previewId) {
  const [speciesName, variant] = previewId.split("/");
  const previewAnimal = getAnimalDefinition({ species: speciesName, variant });
  animalProfile = { species: previewAnimal.species, variant: previewAnimal.variant, name: previewAnimal.displayName, behaviorWeights: { ...previewAnimal.behaviorWeights } };
}
let preferences = JSON.parse(localStorage.getItem(PREFERENCES_KEY) || '{"disliked_species":[],"liked_species":[]}');
let storedFragmentState;
try { storedFragmentState = JSON.parse(localStorage.getItem(FRAGMENT_STATE_KEY) || "null"); } catch { storedFragmentState = null; }
let fragmentState = {
  pending: Array.isArray(storedFragmentState?.pending) ? storedFragmentState.pending.filter((fragment) => fragment?.date && fragment?.source) : [],
  claimed: Array.isArray(storedFragmentState?.claimed) ? storedFragmentState.claimed.filter((fragment) => fragment?.date) : [],
};
let fragmentSyncPromise = null;
let activePet = null;
let activePetPromise = null;
let activePetPromiseIdentity = null;
let fragmentCtaError = "";
let currentBehavior = "idle";
let currentCaptionBehavior = "idle";
let animalState = { state: "REST", pose: "idle", message: "모찌는 잠깐 쉬어가기로 했어요." };
let animalPosition = { x: 50, y: 76 };
let currentLandmark = "open-lawn";
let behaviorTimer;
let walkFrameTimer;
let walkRunId = 0;
let viewedMonth = new Date(`${today}T12:00:00`);
let selectedDate = null;
const $ = (selector) => document.querySelector(selector);
const views = { garden: $("#garden-view"), today: $("#today-view"), room: $("#room-view"), roomInterior: $("#room-interior-view"), archive: $("#archive-view") };
let roomIdentity = null;
let activeRooms = [];
let afterNickname = null;
let roomDailyRenderId = 0;

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function saveFragmentState() { localStorage.setItem(FRAGMENT_STATE_KEY, JSON.stringify(fragmentState)); }
function formatDate(day) { return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date(`${day}T12:00:00`)); }
function syncToday() {
  if (isQaMode) return qaDate;
  const currentDay = dateKey();
  if (today !== currentDay) { today = currentDay; selectedQuestion = undefined; }
  return today;
}
function answerForDate(day) { return [...state.answers].reverse().find((answer) => answer.date === day); }
function todayAnswer() { return answerForDate(syncToday()); }
function fragmentForDate(day) {
  return fragmentState.claimed.find((fragment) => fragment.date === day && !fragment.consumed_at)
    || fragmentState.pending.find((fragment) => fragment.date === day);
}
function activePetIdentity() {
  const animal = animalDefinition();
  return { species: animal.species, variant: animal.variant };
}
async function ensureActivePet() {
  if (isQaMode || !roomBackend.isConfigured) return null;
  const identity = activePetIdentity();
  if (activePet?.species === identity.species && activePet?.variant === identity.variant) return activePet;
  if (activePetPromise) {
    if (activePetPromiseIdentity?.species === identity.species && activePetPromiseIdentity?.variant === identity.variant) return activePetPromise;
    await activePetPromise;
    return ensureActivePet();
  }
  activePetPromiseIdentity = identity;
  activePetPromise = roomBackend.ensureActivePet(identity)
    .then((pet) => {
      activePet = pet;
      return pet;
    })
    .finally(() => { activePetPromise = null; activePetPromiseIdentity = null; });
  return activePetPromise;
}
async function restoreFragmentEvents() {
  if (isQaMode || !roomBackend.isConfigured) return;
  try {
    const events = await roomBackend.listFragmentEventsFromExistingSession();
    if (events === null) return;
    fragmentState.claimed = events;
    fragmentState.pending = fragmentState.pending.filter((pending) => !events.some((event) => event.date === pending.date));
    saveFragmentState();
    renderGarden({ resetAnimal: false });
  } catch {
    // The local cache remains usable if the existing session cannot be read.
  }
}
function renderFragmentCta() {
  const fragment = fragmentForDate(syncToday());
  const cta = $("#fragment-cta");
  const button = $("#feed-fragment");
  cta.classList.toggle("is-hidden", !fragment);
  if (!fragment) return;
  const isPending = fragmentState.pending.includes(fragment);
  const identity = activePetIdentity();
  const hasActivePet = activePet?.species === identity.species && activePet?.variant === identity.variant;
  $("#fragment-message").textContent = fragmentCtaError || (isPending ? "오늘의 조각을 준비하고 있어요." : "오늘의 조각이 생겼어요.");
  button.textContent = `${animalName()}에게 주기`;
  button.disabled = isQaMode || isPending || !fragment.id || !hasActivePet || Boolean(activePetPromise);
  if (!isQaMode && !isPending && !hasActivePet && !activePetPromise) {
    void ensureActivePet().then(() => renderFragmentCta()).catch(() => {
      fragmentCtaError = "조각을 준비하지 못했어요. 잠시 후 다시 시도해주세요.";
      renderFragmentCta();
    });
  }
}
function queueDailyFragment(source, day = syncToday()) {
  if (fragmentForDate(day)) return;
  fragmentCtaError = "";
  fragmentState.pending.push({ date: day, source });
  saveFragmentState();
  renderGarden({ resetAnimal: false });
  void syncPendingFragments();
}
async function syncPendingFragments() {
  if (isQaMode || !fragmentState.pending.length || fragmentSyncPromise) return fragmentSyncPromise;
  fragmentSyncPromise = (async () => {
    try {
      await roomBackend.initialize();
      const pending = [...fragmentState.pending];
      for (const fragment of pending) {
        const claimed = await roomBackend.claimDailyFragment(fragment);
        fragmentState.claimed = [...fragmentState.claimed.filter((entry) => entry.date !== claimed.date), claimed];
        fragmentState.pending = fragmentState.pending.filter((entry) => entry !== fragment);
      }
    } catch {
      // Keep the local queue: a later Garden visit retries without blocking the saved answer.
    } finally {
      saveFragmentState();
      fragmentSyncPromise = null;
      renderGarden({ resetAnimal: false });
    }
  })();
  return fragmentSyncPromise;
}
async function consumeTodayFragment() {
  const fragment = fragmentForDate(syncToday());
  const button = $("#feed-fragment");
  if (!fragment?.id || button.disabled || isQaMode) return;
  button.disabled = true;
  fragmentCtaError = "";
  button.textContent = "먹이고 있어요...";
  try {
    const pet = await ensureActivePet();
    if (!pet) throw new Error("pet unavailable");
    const result = await roomBackend.consumeDailyFragment({ fragmentId: fragment.id, petId: pet.id });
    if (!result || !["consumed", "already_consumed"].includes(result.status)) throw new Error("consume failed");
    if (result.status === "consumed") activePet = { ...pet, id: result.pet_id || pet.id, growth_points: result.growth_points };
    fragmentState.pending = fragmentState.pending.filter((entry) => entry.date !== fragment.date);
    fragmentState.claimed = fragmentState.claimed.map((entry) => entry.id === fragment.id
      ? { ...entry, pet_id: result.pet_id, consumed_at: result.consumed_at }
      : entry);
    saveFragmentState();
    renderGarden({ resetAnimal: false });
    if (result.status === "consumed") startFragmentReaction();
  } catch {
    fragmentCtaError = "조각을 먹이지 못했어요. 다시 시도해주세요.";
    renderFragmentCta();
  }
}
function dailyQuestionSet(day = syncToday()) {
  const questionById = new Map(questions.map((question) => [question.id, question]));
  const savedIds = state.dailyQuestionSets[day];
  if (Array.isArray(savedIds) && savedIds.length === 3 && savedIds.every((id) => questionById.has(id))) return savedIds.map((id) => questionById.get(id));
  const generated = dailyQuestions(day).map((question) => question.id);
  state.dailyQuestionSets[day] = generated;
  save();
  return generated.map((id) => questionById.get(id));
}
function showView(name) {
  Object.entries(views).forEach(([key, view]) => view.classList.toggle("is-hidden", key !== name));
  const navView = name === "roomInterior" ? "room" : name;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === navView));
  if (name === "room") void refreshRooms();
  if (name === "garden") void syncPendingFragments();
  window.scrollTo(0, 0);
}
const behaviorMessages = {
  idle: "모찌는 잠깐 쉬어가기로 했어요.",
  walk: "모찌는 정원을 산책하고 있어요.",
  "walk-a": "모찌는 정원을 산책하고 있어요.",
  "walk-b": "모찌는 정원을 산책하고 있어요.",
  "look-around": "모찌는 정원을 천천히 둘러보고 있어요.",
  observe: "모찌는 정원 안쪽을 가만히 바라보고 있어요.",
  sleep: "모찌는 잠깐 낮잠을 자고 있어요.",
  sit: "모찌는 잠깐 쉬어가기로 했어요.",
  read: "모찌는 치즈에 대해 공부하고 있어요.",
  carry: "모찌는 작은 것을 품에 안고 있어요.",
};
const gardenLandmarks = {
  "mailbox-left": { x: 19, y: 75 },
  "bush-left": { x: 29, y: 70 },
  "tree-right": { x: 76, y: 71 },
  "stone-right": { x: 77, y: 79 },
  "open-lawn": { x: 50, y: 76 },
};
let animalRenderId = 0;
const assetReady = new Map();
const dwellTimes = { idle: [6000, 14000], sit: [8000, 16000], sleep: [15000, 35000], read: [10000, 20000], carry: [6000, 12000] };
const randomBetween = (min, max) => min + Math.random() * (max - min);
function animalDefinition() { return getAnimalDefinition(animalProfile); }
function animalName() { return animalProfile.name || animalDefinition().displayName || "모찌"; }
const mochiPhaseAPoses = ["idle", "sit", "read", "carry", "sleep", "stand-front", "stand-back", "walk-side-01", "walk-side-02", "walk-side-03", "walk-side-04"];
const mochiWalkFrames = ["walk-side-01", "walk-side-02", "walk-side-03", "walk-side-04"];
const mochiPoseVisualScale = { "stand-front": .92, "stand-back": .92 };
const isMochi = () => animalDefinition().id === "hamster-mochi";
const isWalkPose = (pose) => pose.startsWith("walk-");
const isMochiSidePose = (pose) => pose.startsWith("walk-side-");
function imagePath(pose) { return isMochi() && mochiPhaseAPoses.includes(pose) ? `assets/animals/hamster/mochi/${pose}.png` : animalDefinition().poseAssets[pose]; }
function preloadAsset(src) {
  if (assetReady.has(src)) return assetReady.get(src);
  const ready = new Promise((resolve) => {
    const image = new Image();
    const finish = () => {
      if (!image.decode) { resolve(true); return; }
      image.decode().then(() => resolve(true)).catch(() => resolve(image.naturalWidth > 0));
    };
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", () => resolve(false), { once: true });
    image.src = src;
    if (image.complete && image.naturalWidth > 0) finish();
  });
  assetReady.set(src, ready);
  return ready;
}
function preloadMochiPhaseAAssets() { return Promise.all(mochiPhaseAPoses.map((pose) => preloadAsset(imagePath(pose)))).then((results) => results.every(Boolean)); }
function messageFor(behavior, landmark) {
  const name = animalName();
  if (behavior === "sleep" && landmark === "tree-right") return `${name}는 나무 그늘 아래에서 잠들었어요.`;
  if ((behavior === "sit" || behavior === "carry") && landmark === "stone-right") return `${name}는 작은 돌멩이를 살펴보고 있어요.`;
  if (behavior === "sit" && landmark === "bush-left") return `${name}는 풀숲 옆에서 쉬고 있어요.`;
  return (behaviorMessages[behavior] || behaviorMessages.idle).replace("모찌", name);
}
function setAnimalPosition(position) {
  const hamster = $("#hamster");
  const scene = hamster.parentElement;
  const scale = Math.max(.88, Math.min(1, .88 + ((position.y - 62) / 20) * .12));
  hamster.style.setProperty("--animal-x", `${(scene.clientWidth * position.x) / 100}px`);
  hamster.style.setProperty("--animal-y", `${-scene.clientHeight * (1 - position.y / 100)}px`);
  hamster.style.setProperty("--animal-scale", scale.toFixed(3));
}
function stateNameFor(behavior) { return { idle: "REST", sit: "REST", sleep: "SLEEP", read: "READ", carry: "CARRY", walk: "WALK", "walk-a": "WALK", "walk-b": "WALK", "look-around": "LOOK_AROUND", observe: "OBSERVE" }[behavior] || behavior.toUpperCase(); }
function setCaption(message) { $("#animal-caption").textContent = message; }
function renderAnimal({ pose = currentBehavior, captionBehavior = pose, stateName = stateNameFor(captionBehavior), message } = {}) {
  const renderId = ++animalRenderId;
  const src = imagePath(pose);
  return preloadAsset(src).then((ready) => {
    if (!ready || renderId !== animalRenderId) return false;
    const asset = $("#hamster-asset");
    const hamster = $("#hamster");
    const applyFrame = () => {
      if (renderId !== animalRenderId) return false;
      const isWalking = isWalkPose(pose);
      asset.className = `hamster-asset species-${animalDefinition().species} coat-${animalProfile.coat || "golden"}`;
      hamster.className = `hamster ${isWalking ? "is-walking" : "is-stationary"}`;
      if (!isWalking) setAnimalPosition(animalPosition);
      hamster.style.setProperty("--face-direction", isMochi() && !isMochiSidePose(pose) ? "1" : (hamster.dataset.direction || "1"));
      asset.style.setProperty("--pose-scale", String(isMochi() ? (mochiPoseVisualScale[pose] || 1) : 1));
      const resolvedMessage = message || messageFor(captionBehavior, currentLandmark);
      currentCaptionBehavior = captionBehavior;
      animalState = { state: stateName, pose, message: resolvedMessage };
      setCaption(resolvedMessage);
      return true;
    };
    const existing = asset.querySelector("img");
    if (existing?.dataset.assetSrc === src) return applyFrame();
    return new Promise((resolve) => {
      const image = document.createElement("img");
      let installed = false;
      const install = () => {
        if (installed) return;
        installed = true;
        if (renderId !== animalRenderId) { resolve(false); return; }
        image.dataset.assetSrc = src;
        image.alt = "";
        image.draggable = false;
        // Keep the current sprite on screen until this exact DOM image is decoded.
        asset.replaceChildren(image);
        resolve(applyFrame());
      };
      image.addEventListener("load", () => {
        if (image.decode) image.decode().then(install).catch(install);
        else install();
      }, { once: true });
      image.addEventListener("error", () => resolve(false), { once: true });
      image.src = src;
      if (image.complete && image.naturalWidth > 0) {
        if (image.decode) image.decode().then(install).catch(install);
        else install();
      }
    });
  });
}
function clearBehaviorTimers() { window.clearTimeout(behaviorTimer); window.clearInterval(walkFrameTimer); walkRunId += 1; }
function chooseStationaryBehavior() { const weights = { ...(animalProfile.behaviorWeights || animalDefinition().behaviorWeights || behaviorWeights), "walk-a": 0, "walk-b": 0, read: Math.min((animalProfile.behaviorWeights || animalDefinition().behaviorWeights || behaviorWeights).read || 0, 3), carry: Math.min((animalProfile.behaviorWeights || animalDefinition().behaviorWeights || behaviorWeights).carry || 0, 3) }; return chooseBehavior(weights); }
function scheduleStationary() { const [min, max] = dwellTimes[currentBehavior] || dwellTimes.idle; behaviorTimer = window.setTimeout(startNextBehavior, randomBetween(min, max)); }
function landmarkFor(behavior) {
  const preferred = animalDefinition().preferredLandmarks || ["open-lawn"];
  const landmark = preferred[Math.floor(Math.random() * preferred.length)] || "open-lawn";
  if (behavior === "sleep" && preferred.includes("tree-right") && Math.random() < .7) return "tree-right";
  if ((behavior === "sit" || behavior === "carry") && ["stone-right", "bush-left"].includes(landmark) && Math.random() < .55) return landmark;
  return "open-lawn";
}
function nearbyDestination(landmark) {
  if (landmark === "open-lawn") return { x: randomBetween(12, 88), y: randomBetween(62, 82) };
  const anchor = gardenLandmarks[landmark] || gardenLandmarks["open-lawn"];
  return {
    x: Math.max(12, Math.min(88, anchor.x + randomBetween(-4, 4))),
    y: Math.max(62, Math.min(82, anchor.y + randomBetween(-2, 2))),
  };
}
function mochiSideDestination(start) {
  const direction = Math.random() < .5 ? -1 : 1;
  const distance = randomBetween(16, 32) * direction;
  let x = Math.max(12, Math.min(88, start.x + distance));
  if (Math.abs(x - start.x) < 12) x = Math.max(12, Math.min(88, start.x - distance));
  return { x, y: Math.max(70, Math.min(80, start.y + randomBetween(-1.5, 1.5))) };
}
function startLegacyWalk(nextBehavior, landmark) { clearBehaviorTimers(); currentBehavior = "walk-a"; const start = { ...animalPosition }; const target = nearbyDestination(landmark); const direction = target.x < start.x ? -1 : 1; const duration = randomBetween(2000, 4000); const runId = walkRunId; const hamster = $("#hamster"); hamster.dataset.direction = String(direction); hamster.className = "hamster is-walking"; hamster.style.setProperty("--face-direction", String(direction)); hamster.style.setProperty("--walk-duration", `${duration}ms`); setAnimalPosition(start); renderAnimal(); window.requestAnimationFrame(() => { if (runId === walkRunId) setAnimalPosition(target); }); let frame = 0; walkFrameTimer = window.setInterval(() => { if (runId !== walkRunId) return; currentBehavior = frame++ % 2 ? "walk-a" : "walk-b"; renderAnimal(); }, 300); behaviorTimer = window.setTimeout(() => { if (runId !== walkRunId) return; animalPosition = target; currentLandmark = landmark; window.clearInterval(walkFrameTimer); currentBehavior = nextBehavior; hamster.style.setProperty("--walk-duration", "0ms"); renderAnimal({ fade: true }); scheduleStationary(); }, duration + 40); }
async function startMochiWalk(nextBehavior) {
  clearBehaviorTimers();
  const runId = walkRunId;
  if (!(await preloadMochiPhaseAAssets()) || runId !== walkRunId) return;
  const start = { ...animalPosition };
  const target = mochiSideDestination(start);
  const direction = target.x < start.x ? -1 : 1;
  const hamster = $("#hamster");
  const mustTurn = hamster.dataset.direction && Number(hamster.dataset.direction) !== direction;
  const duration = Math.max(1800, Math.min(3200, 1400 + Math.abs(target.x - start.x) * 55));

  // A side pose is shown before travel; no sprite is ever hidden while it changes.
  currentBehavior = "idle";
  hamster.style.setProperty("--walk-duration", "0ms");
  await renderAnimal({ pose: "idle", captionBehavior: "idle" });
  if (runId !== walkRunId) return;
  behaviorTimer = window.setTimeout(async () => {
    if (runId !== walkRunId) return;
    hamster.dataset.direction = String(direction);
    currentBehavior = "walk-side-01";
    await renderAnimal({ pose: "walk-side-01", captionBehavior: "idle" });
    if (runId !== walkRunId) return;
    behaviorTimer = window.setTimeout(() => {
      if (runId !== walkRunId) return;
      let frameIndex = 0;
      currentBehavior = mochiWalkFrames[frameIndex];
      hamster.style.setProperty("--walk-duration", `${duration}ms`);
      renderAnimal({ pose: currentBehavior, captionBehavior: "walk" });
      walkFrameTimer = window.setInterval(() => {
        if (runId !== walkRunId) return;
        frameIndex = (frameIndex + 1) % mochiWalkFrames.length;
        currentBehavior = mochiWalkFrames[frameIndex];
        renderAnimal({ pose: currentBehavior, captionBehavior: "walk" });
      }, 150);
      window.requestAnimationFrame(() => { if (runId === walkRunId) setAnimalPosition(target); });
      behaviorTimer = window.setTimeout(() => {
        if (runId !== walkRunId) return;
        window.clearInterval(walkFrameTimer);
        animalPosition = target;
        currentLandmark = "open-lawn";
        hamster.style.setProperty("--walk-duration", "0ms");
        currentBehavior = "walk-side-01";
        renderAnimal({ pose: "walk-side-01", captionBehavior: "walk" });
        behaviorTimer = window.setTimeout(() => {
          if (runId !== walkRunId) return;
          currentBehavior = nextBehavior;
          renderAnimal({ pose: nextBehavior, captionBehavior: nextBehavior });
          scheduleStationary();
        }, 280);
      }, duration);
    }, mustTurn ? randomBetween(250, 400) : 250);
  }, 250);
}
async function startMochiLookAround() {
  clearBehaviorTimers();
  const runId = walkRunId;
  if (!(await preloadMochiPhaseAAssets()) || runId !== walkRunId) return;
  const hamster = $("#hamster");
  const steps = [
    { pose: "stand-front", direction: 1, delay: 500 },
    { pose: "walk-side-01", direction: 1, delay: 600 },
    { pose: "stand-front", direction: 1, delay: 300 },
    { pose: "walk-side-01", direction: -1, delay: 600 },
    { pose: "stand-front", direction: 1, delay: 350 },
  ];
  let stepIndex = 0;
  const showStep = () => {
    if (runId !== walkRunId) return;
    const step = steps[stepIndex++];
    if (!step) {
      currentBehavior = "idle";
      renderAnimal({ pose: "idle", captionBehavior: "idle" });
      scheduleStationary();
      return;
    }
    hamster.dataset.direction = String(step.direction);
    currentBehavior = step.pose;
    renderAnimal({ pose: step.pose, captionBehavior: "look-around" });
    behaviorTimer = window.setTimeout(showStep, step.delay);
  };
  showStep();
}
async function startMochiObserve() {
  clearBehaviorTimers();
  const runId = walkRunId;
  if (!(await preloadMochiPhaseAAssets()) || runId !== walkRunId) return;
  const steps = [
    { pose: "stand-front", caption: "idle", delay: 300 },
    { pose: "stand-back", caption: "observe", delay: randomBetween(1000, 2000) },
    { pose: "stand-front", caption: "idle", delay: 350 },
  ];
  let stepIndex = 0;
  const showStep = () => {
    if (runId !== walkRunId) return;
    const step = steps[stepIndex++];
    if (!step) {
      currentBehavior = "idle";
      renderAnimal({ pose: "idle", captionBehavior: "idle" });
      scheduleStationary();
      return;
    }
    currentBehavior = step.pose;
    renderAnimal({ pose: step.pose, captionBehavior: step.caption });
    behaviorTimer = window.setTimeout(showStep, step.delay);
  };
  showStep();
}
function startWalk(nextBehavior = chooseStationaryBehavior(), landmark = "open-lawn") { if (isMochi()) { startMochiWalk(nextBehavior, landmark); return; } startLegacyWalk(nextBehavior, landmark); }
function startNextBehavior() {
  clearBehaviorTimers();
  if (isMochi()) {
    const moment = Math.random();
    if (moment < .16) { startMochiLookAround(); return; }
    if (moment < .25) { startMochiObserve(); return; }
  }
  const nextBehavior = chooseStationaryBehavior();
  const landmark = landmarkFor(nextBehavior);
  const weights = animalProfile.behaviorWeights || animalDefinition().behaviorWeights || behaviorWeights;
  const walkChance = Math.max(.16, Math.min(.5, .12 + ((weights["walk-a"] || 0) + (weights["walk-b"] || 0)) * .05));
  if (landmark !== "open-lawn" || Math.random() < walkChance) { startWalk(nextBehavior, landmark); return; }
  currentLandmark = "open-lawn";
  currentBehavior = nextBehavior;
  renderAnimal({ pose: nextBehavior, captionBehavior: nextBehavior });
  scheduleStationary();
}
function startAnswerReaction() {
  clearBehaviorTimers();
  const runId = walkRunId;
  const reaction = Math.random() < .5
    ? { pose: "carry", stateName: "ANSWER_REACTION", message: `${animalName()}가 오늘의 이야기를 꼭 품었어요.` }
    : { pose: "read", stateName: "ANSWER_REACTION", message: `${animalName()}가 오늘의 이야기를 천천히 읽고 있어요.` };
  currentLandmark = "open-lawn";
  currentBehavior = reaction.pose;
  renderAnimal({ pose: reaction.pose, captionBehavior: reaction.pose, stateName: reaction.stateName, message: reaction.message });
  behaviorTimer = window.setTimeout(() => {
    if (runId !== walkRunId) return;
    currentBehavior = "idle";
    renderAnimal({ pose: "idle", captionBehavior: "idle" });
    scheduleStationary();
  }, 2600);
}
function startFragmentReaction() {
  clearBehaviorTimers();
  const runId = walkRunId;
  currentLandmark = "open-lawn";
  currentBehavior = "carry";
  renderAnimal({ pose: "carry", captionBehavior: "carry", stateName: "FRAGMENT_REACTION", message: `${animalName()}가 오늘의 조각을 맛있게 먹었어요.` });
  behaviorTimer = window.setTimeout(() => {
    if (runId !== walkRunId) return;
    currentBehavior = "idle";
    renderAnimal({ pose: "idle", captionBehavior: "idle" });
    scheduleStationary();
  }, 2600);
}
function chooseAnimalBehavior() { clearBehaviorTimers(); currentBehavior = previewPose && ["idle", "walk-a", "walk-b", "sit", "sleep", "read", "carry"].includes(previewPose) ? previewPose : chooseStationaryBehavior(); renderAnimal(); scheduleStationary(); }
function renderGarden({ resetAnimal = true } = {}) {
  syncToday();
  $("#page-date").textContent = formatDate(today);
  const answer = todayAnswer();
  const record = $("#garden-record");
  record.classList.toggle("is-hidden", !answer);
  if (answer) {
    record.querySelector(".garden-record-label").textContent = `오늘의 조각 · ${formatDate(answer.date)}`;
    record.querySelector(".garden-record-value").textContent = `“${answerText(answer)}”을 남겼어요.`;
  }
  renderFragmentCta();
  if (resetAnimal) chooseAnimalBehavior();
}
function renderPreferences() { ["disliked", "liked"].forEach((kind) => { const container = $(`#${kind}-options`); container.replaceChildren(); species.forEach((name) => { const label = document.createElement("label"); label.innerHTML = `<input type="checkbox" value="${name}" ${preferences[`${kind}_species`].includes(name) ? "checked" : ""}/><span>${{ hamster: "햄스터", cat: "고양이", capybara: "카피바라", rabbit: "토끼" }[name]}</span>`; container.append(label); }); }); $("#no-dislike").checked = !preferences.disliked_species.length; }
function closePreferences() { $("#preferences-sheet").classList.add("is-hidden"); }

function renderToday() {
  syncToday();
  const answer = todayAnswer(); const container = $("#question-cards"); $("#daily-status").textContent = answer ? `오늘은 “${answerText(answer)}”을 남겼어요.` : "아래 세 장 중 하나만 골라주세요."; $("#today-complete").classList.toggle("is-hidden", !answer); container.replaceChildren();
  if (answer) { $("#today-complete").textContent = "모찌가 오늘의 이야기를 품고 있어요."; return; }
  dailyQuestionSet(today).forEach((question, index) => { const button = document.createElement("button"); button.type = "button"; button.className = "question-card"; button.innerHTML = `<span>0${index + 1}</span><strong>${question.text}</strong><i>→</i>`; button.addEventListener("click", () => openAnswer(question)); container.append(button); });
}

function openAnswer(question) {
  if (todayAnswer()) { renderToday(); return; }
  selectedQuestion = question; $("#answer-question").textContent = question.text; const field = $("#answer-field"); field.replaceChildren();
  if (question.type === "choice") { const choices = document.createElement("div"); choices.className = "choice-list"; choices.innerHTML = question.options.map((option, index) => `<label><input required type="radio" name="answer" value="${option}" ${index === 0 ? "checked" : ""}/><span>${option}</span></label>`).join(""); field.append(choices); }
  else { const input = document.createElement("textarea"); input.name = "answer"; input.required = true; input.maxLength = 140; input.rows = 4; input.placeholder = "짧게 적어도 괜찮아요"; field.append(input); input.focus(); }
  $("#answer-sheet").classList.remove("is-hidden");
}

function localDateKey(year, month, day) { return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }
function createdLabel(answer) {
  if (!answer?.createdAt) return `작성 · ${formatDate(answer.date)}`;
  const createdAt = new Date(answer.createdAt);
  if (Number.isNaN(createdAt.getTime())) return `작성 · ${formatDate(answer.date)}`;
  return `작성 · ${new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(createdAt)}`;
}
function isInViewedMonth(day) {
  const date = new Date(`${day}T12:00:00`);
  return date.getFullYear() === viewedMonth.getFullYear() && date.getMonth() === viewedMonth.getMonth();
}
function answersInViewedMonth() { return state.answers.filter((answer) => isInViewedMonth(answer.date)); }
function showArchiveAnswer(answer) {
  const paper = $("#archive-paper");
  document.querySelectorAll(".archive-item").forEach((entry) => entry.classList.toggle("is-selected", entry.dataset.date === answer?.date));
  document.querySelectorAll(".calendar-day").forEach((entry) => entry.classList.toggle("is-selected", entry.dataset.date === answer?.date));
  if (!answer) { paper.classList.add("is-hidden"); return; }
  $("#paper-date").textContent = createdLabel(answer);
  $("#paper-question").textContent = answer.question;
  $("#paper-answer").textContent = answerText(answer);
  paper.classList.remove("is-hidden");
}
function renderArchive() {
  if (selectedDate && !isInViewedMonth(selectedDate)) selectedDate = null;
  const list = $("#archive-list"); const calendar = $("#archive-calendar"); list.replaceChildren(); calendar.replaceChildren(); $("#archive-paper").classList.add("is-hidden");
  const year = viewedMonth.getFullYear(); const month = viewedMonth.getMonth(); $("#archive-month").textContent = `${year}년 ${month + 1}월`;
  const monthAnswers = answersInViewedMonth();
  const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const answerDates = new Set(monthAnswers.map((answer) => answer.date));
  for (let index = 0; index < firstDay; index += 1) { const spacer = document.createElement("span"); spacer.className = "calendar-spacer"; calendar.append(spacer); }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = localDateKey(year, month, day);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `calendar-day${answerDates.has(date) ? " has-record" : ""}`;
    button.dataset.date = date;
    button.textContent = day;
    button.addEventListener("click", () => { selectedDate = answerDates.has(date) ? date : null; renderArchive(); });
    calendar.append(button);
  }
  if (!monthAnswers.length) {
    list.innerHTML = `<p class="empty-state">${month + 1}월에는 아직 남긴 조각이 없어요.</p>`;
    showArchiveAnswer(null);
    return;
  }
  [...monthAnswers].reverse().forEach((answer) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "archive-item";
    item.dataset.date = answer.date;
    const date = document.createElement("p");
    date.textContent = formatDate(answer.date);
    item.append(date);
    item.addEventListener("click", () => { selectedDate = answer.date; renderArchive(); });
    list.append(item);
  });
  showArchiveAnswer(selectedDate ? answerForDate(selectedDate) : null);
}

function roomErrorMessage(error) {
  if (/room not found/i.test(error?.message || "")) return "코드를 다시 확인해주세요.";
  if (/nickname required/i.test(error?.message || "")) return "먼저 닉네임을 정해주세요.";
  if (/already answered|이미 답변/i.test(error?.message || "")) return "오늘은 이미 답변을 남겼어요.";
  return "방을 연결하지 못했어요. 잠시 후 다시 시도해주세요.";
}
function setRoomStatus(message = "") { $("#room-status").textContent = message; }
function closeNicknameSheet() { $("#nickname-sheet").classList.add("is-hidden"); }
function closeJoinRoomSheet() { $("#join-room-sheet").classList.add("is-hidden"); }
function closeRoomInviteSheet() { $("#room-invite-sheet").classList.add("is-hidden"); }
function openNicknameSheet() {
  $("#nickname-sheet").classList.remove("is-hidden");
  window.setTimeout(() => $("#nickname-input").focus(), 0);
}
function openJoinRoomSheet() {
  $("#join-room-sheet").classList.remove("is-hidden");
  window.setTimeout(() => $("#invite-code-input").focus(), 0);
}
function openRoomInviteSheet() {
  const room = activeRooms[0];
  if (!room) return;
  $("#room-invite-code").textContent = room.invite_code;
  $("#copy-room-invite").textContent = "코드 복사";
  $("#room-invite-sheet").classList.remove("is-hidden");
}
function roomQuestionCandidate(roomId, day) {
  let seed = 0;
  for (const character of `${roomId}:${day}`) seed = ((seed << 5) - seed + character.charCodeAt(0)) | 0;
  return questions[(seed >>> 0) % questions.length];
}
function roomQuestionById(id) { return questions.find((question) => question.id === id); }
function hideRoomDaily() { $("#room-daily").classList.add("is-hidden"); }
function setRoomAnswerField(question) {
  const field = $("#room-answer-field");
  field.replaceChildren();
  if (question.type === "choice") {
    const choices = document.createElement("div");
    choices.className = "choice-list";
    choices.innerHTML = question.options.map((option, index) => `<label><input required type="radio" name="room-answer" value="${option}" ${index === 0 ? "checked" : ""}/><span>${option}</span></label>`).join("");
    field.append(choices);
    return;
  }
  const input = document.createElement("textarea");
  input.name = "room-answer";
  input.required = true;
  input.maxLength = 140;
  input.rows = 4;
  input.placeholder = "짧게 적어도 괜찮아요";
  field.append(input);
}
function renderRoomSeats(statuses, answers, unlocked) {
  const list = $("#room-seat-list");
  const answersByUser = new Map(answers.map((answer) => [answer.user_id, answer]));
  list.replaceChildren();
  statuses.forEach((member) => {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    const state = document.createElement("p");
    name.textContent = member.nickname;
    const answer = answersByUser.get(member.user_id);
    if (unlocked && answer) {
      state.textContent = answer.answer;
    } else if (member.answered) {
      state.textContent = "● 답을 남겼어요. 내가 답하면 열려요.";
      state.className = "room-seat-locked";
    } else {
      state.textContent = "아직 오지 않았어요.";
      state.className = "room-seat-muted";
    }
    item.append(name, state);
    list.append(item);
  });
}
function roomName(room, statuses = []) {
  const owner = statuses.find((member) => member.user_id === room.owner_user_id);
  return owner ? `${owner.nickname}의 작은 방` : "우리의 작은 방";
}
function updateRoomInteriorHeader(room, statuses) {
  const answered = statuses.filter((member) => member.answered).length;
  $("#room-interior-title").textContent = roomName(room, statuses);
  $("#room-interior-presence").textContent = `${statuses.map((member) => member.nickname).join(" · ")} · 오늘 ${answered}/${statuses.length}명이 답했어요.`;
}
async function renderRoomDaily(room) {
  const renderId = ++roomDailyRenderId;
  const day = syncToday();
  try {
    const proposed = roomQuestionCandidate(room.id, day);
    const daily = await roomBackend.ensureDailyQuestion(room.id, day, proposed.id);
    if (renderId !== roomDailyRenderId) return;
    const question = roomQuestionById(daily.question_id);
    if (!question) throw new Error("question unavailable");
    const statuses = await roomBackend.memberDailyStatus(room.id, day);
    if (renderId !== roomDailyRenderId) return;
    const mine = statuses.find((member) => member.user_id === roomBackend.user.id);
    const answers = await roomBackend.listRoomAnswers(room.id, day);
    if (renderId !== roomDailyRenderId) return;
    updateRoomInteriorHeader(room, statuses);
    $("#room-daily-date").textContent = `TODAY · ${formatDate(day)}`;
    $("#room-question-text").textContent = question.text;
    $("#room-member-count").textContent = `${statuses.length}명`;
    $("#room-daily").dataset.roomId = room.id;
    $("#room-daily").dataset.date = day;
    $("#room-daily").dataset.questionId = daily.question_id;
    const form = $("#room-answer-form");
    const hint = $("#room-answer-hint");
    if (mine?.answered) {
      form.classList.add("is-hidden");
      hint.textContent = "내 답변을 남겼어요. 오늘의 답이 열렸어요.";
      $("#room-seat-hint").textContent = "오늘 함께 남긴 답이에요.";
      renderRoomSeats(statuses, answers, true);
    } else {
      form.classList.remove("is-hidden");
      setRoomAnswerField(question);
      hint.textContent = statuses.some((member) => member.user_id !== roomBackend.user.id && member.answered)
        ? "친구가 먼저 답했어요. 나도 답하면 열려요."
        : "내 답을 남기면 친구들의 답도 함께 열려요.";
      $("#room-seat-hint").textContent = "내가 답하면 오늘의 답이 열려요.";
      renderRoomSeats(statuses, [], false);
    }
    $("#room-daily").classList.remove("is-hidden");
  } catch (error) {
    if (renderId !== roomDailyRenderId) return;
    hideRoomDaily();
    setRoomStatus("오늘의 방을 불러오지 못했어요. Phase 3 schema migration을 확인해주세요.");
  }
}
async function renderRoomLobby(room) {
  const statuses = await roomBackend.memberDailyStatus(room.id, syncToday());
  $("#active-room-name").textContent = roomName(room, statuses);
  $("#active-room-members").textContent = statuses.map((member) => member.nickname).join(" · ");
  const answered = statuses.filter((member) => member.answered).length;
  $("#active-room-summary").textContent = `오늘 ${answered}/${statuses.length}명이 답했어요.`;
}
async function openRoomInterior() {
  const room = activeRooms[0];
  if (!room) return;
  showView("roomInterior");
  await renderRoomDaily(room);
}
function renderRoom() {
  const empty = $("#room-empty");
  const active = $("#active-room");
  const create = $("#create-room");
  const join = $("#open-join-room");
  if (!roomBackend.isConfigured) {
    setRoomStatus("공유 방은 backend 연결 후 사용할 수 있어요.");
    empty.classList.remove("is-hidden");
    active.classList.add("is-hidden");
    create.disabled = true;
    join.disabled = true;
    return;
  }
  create.disabled = false;
  join.disabled = false;
  if (!roomIdentity) { setRoomStatus("내 작은 방을 준비하고 있어요."); return; }
  const room = activeRooms[0];
  if (!room) {
    setRoomStatus(roomIdentity.profile?.nickname ? `${roomIdentity.profile.nickname}님의 작은 방을 만들 수 있어요.` : "닉네임을 정하고 작은 방을 시작해보세요.");
    empty.classList.remove("is-hidden");
    active.classList.add("is-hidden");
    return;
  }
  setRoomStatus("");
  empty.classList.add("is-hidden");
  active.classList.remove("is-hidden");
}
async function refreshRooms() {
  renderRoom();
  if (!roomBackend.isConfigured) return;
  try {
    roomIdentity = await roomBackend.initialize();
    activeRooms = roomIdentity.profile ? await roomBackend.listRooms() : [];
    renderRoom();
    if (activeRooms[0]) {
      await renderRoomLobby(activeRooms[0]);
      if (!views.roomInterior.classList.contains("is-hidden")) await renderRoomDaily(activeRooms[0]);
    }
    if (!roomIdentity.profile?.nickname) openNicknameSheet();
  } catch (error) {
    setRoomStatus("공유 방을 준비하지 못했어요. backend 설정을 확인해주세요.");
  }
}
async function runWithNickname(action) {
  if (!roomBackend.isConfigured) { renderRoom(); return; }
  try {
    roomIdentity = await roomBackend.initialize();
    if (!roomIdentity.profile?.nickname) {
      afterNickname = action;
      openNicknameSheet();
      return;
    }
    await action();
  } catch (error) {
    setRoomStatus(roomErrorMessage(error));
  }
}
async function createRoom() {
  await runWithNickname(async () => {
    setRoomStatus("작은 방을 만들고 있어요.");
    await roomBackend.createRoom();
    await refreshRooms();
  });
}
async function joinRoom(inviteCode) {
  let joined = false;
  await runWithNickname(async () => {
    setRoomStatus("방에 참여하고 있어요.");
    await roomBackend.joinRoom(inviteCode);
    joined = true;
    await refreshRooms();
  });
  return joined;
}

function closeSheet() { $("#answer-sheet").classList.add("is-hidden"); }
$("#answer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  syncToday();
  const value = new FormData(event.currentTarget).get("answer")?.trim();
  if (!value || !selectedQuestion || todayAnswer()) { closeSheet(); renderToday(); return; }
  state.answers.push({ date: today, questionId: selectedQuestion.id, question: selectedQuestion.text, answer: value, value, createdAt: new Date().toISOString() });
  save();
  queueDailyFragment("solo", today);
  closeSheet();
  renderToday();
  renderGarden({ resetAnimal: false });
  showView("garden");
  startAnswerReaction();
});
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => { const view = item.dataset.view; if (view === "today") renderToday(); showView(view); }));
$("#archive-button").addEventListener("click", () => {
  syncToday();
  viewedMonth = new Date(`${today}T12:00:00`);
  selectedDate = todayAnswer()?.date || null;
  renderArchive();
  showView("archive");
});
$("#archive-back").addEventListener("click", () => showView("garden"));
$("#archive-prev").addEventListener("click", () => { viewedMonth = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() - 1, 1); selectedDate = null; renderArchive(); });
$("#archive-next").addEventListener("click", () => { viewedMonth = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 1); selectedDate = null; renderArchive(); });
$("#sheet-backdrop").addEventListener("click", closeSheet); $("#close-sheet").addEventListener("click", closeSheet); if (isMochi()) preloadMochiPhaseAAssets(); renderGarden(); renderToday(); void restoreFragmentEvents(); if (fragmentState.pending.length) void syncPendingFragments();
$("#preferences-button").addEventListener("click", () => { renderPreferences(); $("#preferences-sheet").classList.remove("is-hidden"); });
$("#preferences-backdrop").addEventListener("click", closePreferences); $("#close-preferences").addEventListener("click", closePreferences);
$("#save-preferences").addEventListener("click", () => { const selected = (id) => [...document.querySelectorAll(`#${id} input:checked`)].map((input) => input.value); preferences = { disliked_species: $("#no-dislike").checked ? [] : selected("disliked-options"), liked_species: selected("liked-options").slice(0, 3) }; localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)); closePreferences(); });
$("#create-room").addEventListener("click", () => { void createRoom(); });
$("#open-join-room").addEventListener("click", () => { void runWithNickname(async () => openJoinRoomSheet()); });
$("#active-room").addEventListener("click", () => { void openRoomInterior(); });
$("#room-interior-back").addEventListener("click", () => showView("room"));
$("#open-room-invite").addEventListener("click", openRoomInviteSheet);
$("#nickname-backdrop").addEventListener("click", closeNicknameSheet); $("#close-nickname").addEventListener("click", closeNicknameSheet);
$("#join-room-backdrop").addEventListener("click", closeJoinRoomSheet); $("#close-join-room").addEventListener("click", closeJoinRoomSheet);
$("#room-invite-backdrop").addEventListener("click", closeRoomInviteSheet); $("#close-room-invite").addEventListener("click", closeRoomInviteSheet);
$("#copy-room-invite").addEventListener("click", async (event) => {
  const code = $("#room-invite-code").textContent;
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    event.currentTarget.textContent = "복사했어요";
  } catch {
    event.currentTarget.textContent = code;
  }
});
$("#nickname-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const nickname = await roomBackend.saveNickname(new FormData(event.currentTarget).get("nickname"));
    roomIdentity = { ...roomIdentity, profile: { ...(roomIdentity?.profile || {}), nickname } };
    closeNicknameSheet();
    const next = afterNickname;
    afterNickname = null;
    if (next) await next();
    else await refreshRooms();
  } catch (error) { setRoomStatus(roomErrorMessage(error)); }
});
$("#join-room-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = $("#invite-code-input");
  input.value = normalizeInviteCode(input.value);
  if (await joinRoom(input.value)) closeJoinRoomSheet();
});
$("#room-answer-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const daily = $("#room-daily");
  const value = new FormData(event.currentTarget).get("room-answer");
  if (!daily.dataset.roomId || !value) return;
  const submit = $("#room-answer-submit");
  submit.disabled = true;
  try {
    await roomBackend.submitRoomAnswer({ roomId: daily.dataset.roomId, date: daily.dataset.date, questionId: daily.dataset.questionId, answer: value });
    queueDailyFragment("room", daily.dataset.date);
    await refreshRooms();
  } catch (error) {
    $("#room-answer-hint").textContent = roomErrorMessage(error);
  } finally { submit.disabled = false; }
});
$("#feed-fragment").addEventListener("click", () => { void consumeTodayFragment(); });
$("#invite-code-input").addEventListener("input", (event) => { event.currentTarget.value = normalizeInviteCode(event.currentTarget.value); });
