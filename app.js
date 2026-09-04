import { dailyQuestions, dateKey, idleEvent, missedEvent } from "./data.js";
import { behaviorWeights, chooseBehavior, createAnimalProfile, species } from "./animal-system.js";
import { getAnimalDefinition } from "./animal-manifest.js";

const STORAGE_KEY = "daily-write-solo-v1";
let storedState;
try { storedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { storedState = null; }
const state = storedState?.answers ? storedState : { answers: [], animal: { name: "모찌" } };
const today = dateKey();
let selectedQuestion;
const ANIMAL_KEY = "daily-write-animal-profile-v1";
const PREFERENCES_KEY = "daily-write-preferences-v1";
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
let currentBehavior = "idle";
let animalPosition = { x: 50, y: 76 };
let currentLandmark = "open-lawn";
let behaviorTimer;
let walkFrameTimer;
let walkRunId = 0;
let archiveMonth = new Date(`${today}T12:00:00`);
const $ = (selector) => document.querySelector(selector);
const views = { garden: $("#garden-view"), today: $("#today-view"), room: $("#room-view"), archive: $("#archive-view") };

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function formatDate(day) { return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date(`${day}T12:00:00`)); }
function todayAnswer() { return state.answers.find((answer) => answer.date === today); }
function showView(name) { Object.entries(views).forEach(([key, view]) => view.classList.toggle("is-hidden", key !== name)); document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === name)); window.scrollTo(0, 0); }
const behaviorMessages = { idle: "모찌는 정원을 천천히 둘러보고 있어요.", "walk-a": "모찌는 정원을 산책하고 있어요.", "walk-b": "모찌는 정원을 산책하고 있어요.", sleep: "모찌는 잠깐 낮잠을 자고 있어요.", sit: "모찌는 잠깐 쉬어가기로 했어요.", read: "모찌는 치즈에 대해 공부하고 있어요.", carry: "모찌는 작은 것을 품에 안고 있어요." };
const gardenLandmarks = {
  "mailbox-left": { x: 19, y: 75 },
  "bush-left": { x: 29, y: 70 },
  "tree-right": { x: 76, y: 71 },
  "stone-right": { x: 77, y: 79 },
  "open-lawn": { x: 50, y: 76 },
};
let animalRenderId = 0;
const dwellTimes = { idle: [6000, 14000], sit: [8000, 16000], sleep: [15000, 35000], read: [10000, 20000], carry: [6000, 12000] };
const randomBetween = (min, max) => min + Math.random() * (max - min);
function animalDefinition() { return getAnimalDefinition(animalProfile); }
function animalName() { return animalProfile.name || animalDefinition().displayName || "모찌"; }
const mochiWalkPose = "walk-01";
const isMochi = () => animalDefinition().id === "hamster-mochi";
const isWalkPose = (pose) => pose.startsWith("walk-");
function imagePath(pose) { return isMochi() && pose === mochiWalkPose ? `assets/animals/hamster/mochi/${pose}.png` : animalDefinition().poseAssets[pose]; }
function messageFor(behavior, landmark) {
  const name = animalName();
  if (behavior === "sleep" && landmark === "tree-right") return `${name}는 나무 그늘 아래에서 잠들었어요.`;
  if ((behavior === "sit" || behavior === "carry") && landmark === "stone-right") return `${name}는 작은 돌멩이를 살펴보고 있어요.`;
  if (behavior === "sit" && landmark === "bush-left") return `${name}는 풀숲 옆에서 쉬고 있어요.`;
  return behaviorMessages[behavior].replace("모찌", name);
}
function setAnimalPosition(position) {
  const hamster = $("#hamster");
  const scale = Math.max(.88, Math.min(1, .88 + ((position.y - 62) / 20) * .12));
  hamster.style.left = `${position.x}%`;
  hamster.style.setProperty("--animal-ground-y", `${position.y}%`);
  hamster.style.setProperty("--animal-scale", scale.toFixed(3));
}
function setCaption() { $("#animal-caption").textContent = new Date().getHours() >= 20 && !todayAnswer() ? missedEvent(today) : messageFor(isWalkPose(currentBehavior) ? "walk-a" : currentBehavior, currentLandmark); }
function renderAnimal({ fade = false } = {}) { const renderId = ++animalRenderId; const asset = $("#hamster-asset"); const hamster = $("#hamster"); asset.className = `hamster-asset coat-${animalProfile.coat}${fade ? " is-fading" : ""}`; hamster.className = `hamster ${isWalkPose(currentBehavior) ? "is-walking" : "is-stationary"}`; if (!hamster.classList.contains("is-walking")) setAnimalPosition(animalPosition); hamster.style.setProperty("--face-direction", hamster.dataset.direction || "1"); const image = document.createElement("img"); image.src = imagePath(currentBehavior); image.alt = ""; image.draggable = false; asset.replaceChildren(image); if (fade) window.setTimeout(() => { if (renderId === animalRenderId) asset.classList.remove("is-fading"); }, 120); setCaption(); }
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
function startLegacyWalk(nextBehavior, landmark) { clearBehaviorTimers(); currentBehavior = "walk-a"; const start = { ...animalPosition }; const target = nearbyDestination(landmark); const direction = target.x < start.x ? -1 : 1; const duration = randomBetween(2000, 4000); const runId = walkRunId; const hamster = $("#hamster"); hamster.dataset.direction = String(direction); hamster.className = "hamster is-walking"; hamster.style.setProperty("--face-direction", String(direction)); hamster.style.setProperty("--walk-duration", `${duration}ms`); setAnimalPosition(start); renderAnimal(); window.requestAnimationFrame(() => { if (runId === walkRunId) setAnimalPosition(target); }); let frame = 0; walkFrameTimer = window.setInterval(() => { if (runId !== walkRunId) return; currentBehavior = frame++ % 2 ? "walk-a" : "walk-b"; renderAnimal(); }, 300); behaviorTimer = window.setTimeout(() => { if (runId !== walkRunId) return; animalPosition = target; currentLandmark = landmark; window.clearInterval(walkFrameTimer); currentBehavior = nextBehavior; hamster.style.setProperty("--walk-duration", "0ms"); renderAnimal({ fade: true }); scheduleStationary(); }, duration + 40); }
function startMochiWalk(nextBehavior, landmark, targetOverride, afterArrival) {
  clearBehaviorTimers();
  const start = { ...animalPosition };
  const target = targetOverride || nearbyDestination(landmark);
  const direction = target.x < start.x ? -1 : 1;
  const hamster = $("#hamster");
  const turning = hamster.dataset.direction && Number(hamster.dataset.direction) !== direction;
  const distance = Math.hypot((target.x - start.x) * 3, (target.y - start.y) * 6);
  const duration = Math.max(1500, Math.min(3000, 1400 + distance * 18));
  const runId = walkRunId;
  currentBehavior = "idle";
  renderAnimal({ fade: true });
  behaviorTimer = window.setTimeout(() => {
    if (runId !== walkRunId) return;
    hamster.dataset.direction = String(direction);
    renderAnimal();
    behaviorTimer = window.setTimeout(() => {
      if (runId !== walkRunId) return;
      currentBehavior = mochiWalkPose;
      hamster.style.setProperty("--walk-duration", `${duration}ms`);
      setAnimalPosition(start);
      renderAnimal();
      window.requestAnimationFrame(() => { if (runId === walkRunId) setAnimalPosition(target); });
      behaviorTimer = window.setTimeout(() => {
        if (runId !== walkRunId) return;
        animalPosition = target;
        currentLandmark = landmark;
        currentBehavior = "idle";
        hamster.style.setProperty("--walk-duration", "0ms");
        renderAnimal({ fade: true });
        behaviorTimer = window.setTimeout(() => {
          if (runId !== walkRunId) return;
          if (afterArrival) { afterArrival(); return; }
          currentBehavior = nextBehavior;
          renderAnimal({ fade: true });
          scheduleStationary();
        }, randomBetween(300, 700));
      }, duration);
    }, turning ? randomBetween(200, 400) : 0);
  }, randomBetween(200, 400));
}
function startWalk(nextBehavior = chooseStationaryBehavior(), landmark = "open-lawn") { if (isMochi()) { startMochiWalk(nextBehavior, landmark); return; } startLegacyWalk(nextBehavior, landmark); }
function startNextBehavior() { clearBehaviorTimers(); const nextBehavior = chooseStationaryBehavior(); const landmark = landmarkFor(nextBehavior); const weights = animalProfile.behaviorWeights || animalDefinition().behaviorWeights || behaviorWeights; const walkChance = Math.max(.16, Math.min(.5, .12 + ((weights["walk-a"] || 0) + (weights["walk-b"] || 0)) * .05)); if (landmark !== "open-lawn" || Math.random() < walkChance) { startWalk(nextBehavior, landmark); return; } currentLandmark = "open-lawn"; currentBehavior = nextBehavior; renderAnimal({ fade: true }); scheduleStationary(); }
function chooseAnimalBehavior() { clearBehaviorTimers(); currentBehavior = previewPose && ["idle", "walk-a", "walk-b", "sit", "sleep", "read", "carry"].includes(previewPose) ? previewPose : chooseStationaryBehavior(); renderAnimal(); scheduleStationary(); }
function renderGarden() { $("#page-date").textContent = formatDate(today); const answer = todayAnswer(); const record = $("#garden-record"); record.classList.toggle("is-hidden", !answer); if (answer) { record.querySelector(".garden-record-label").textContent = `오늘의 조각 · ${formatDate(answer.date)}`; record.querySelector(".garden-record-value").textContent = `“${answer.value}”을 남겼어요.`; } chooseAnimalBehavior(); }
function renderPreferences() { ["disliked", "liked"].forEach((kind) => { const container = $(`#${kind}-options`); container.replaceChildren(); species.forEach((name) => { const label = document.createElement("label"); label.innerHTML = `<input type="checkbox" value="${name}" ${preferences[`${kind}_species`].includes(name) ? "checked" : ""}/><span>${{ hamster: "햄스터", cat: "고양이", capybara: "카피바라", rabbit: "토끼" }[name]}</span>`; container.append(label); }); }); $("#no-dislike").checked = !preferences.disliked_species.length; }
function closePreferences() { $("#preferences-sheet").classList.add("is-hidden"); }

function renderToday() {
  const answer = todayAnswer(); const container = $("#question-cards"); $("#daily-status").textContent = answer ? `오늘은 “${answer.value}”을 남겼어요.` : "아래 세 장 중 하나만 골라주세요."; $("#today-complete").classList.toggle("is-hidden", !answer); container.replaceChildren();
  if (answer) { $("#today-complete").textContent = "모찌가 오늘의 이야기를 품고 있어요."; return; }
  const recentIds = state.answers.slice(-7).map((item) => item.questionId);
  dailyQuestions(today, recentIds).forEach((question, index) => { const button = document.createElement("button"); button.type = "button"; button.className = "question-card"; button.innerHTML = `<span>0${index + 1}</span><strong>${question.text}</strong><i>→</i>`; button.addEventListener("click", () => openAnswer(question)); container.append(button); });
}

function openAnswer(question) {
  selectedQuestion = question; $("#answer-question").textContent = question.text; const field = $("#answer-field"); field.replaceChildren();
  if (question.type === "choice") { const choices = document.createElement("div"); choices.className = "choice-list"; choices.innerHTML = question.options.map((option, index) => `<label><input required type="radio" name="answer" value="${option}" ${index === 0 ? "checked" : ""}/><span>${option}</span></label>`).join(""); field.append(choices); }
  else { const input = document.createElement("textarea"); input.name = "answer"; input.required = true; input.maxLength = 140; input.rows = 4; input.placeholder = "짧게 적어도 괜찮아요"; field.append(input); input.focus(); }
  $("#answer-sheet").classList.remove("is-hidden");
}

function localDateKey(year, month, day) { return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }
function showArchiveAnswer(answer) { const paper = $("#archive-paper"); document.querySelectorAll(".archive-item").forEach((entry) => entry.classList.toggle("is-selected", entry.dataset.date === answer?.date)); document.querySelectorAll(".calendar-day").forEach((entry) => entry.classList.toggle("is-selected", entry.dataset.date === answer?.date)); if (!answer) { paper.classList.add("is-hidden"); return; } $("#paper-date").textContent = formatDate(answer.date); $("#paper-question").textContent = answer.question; $("#paper-answer").textContent = answer.value; paper.classList.remove("is-hidden"); }
function renderArchive(selectedDay = state.answers.at(-1)?.date) {
  if (selectedDay) archiveMonth = new Date(`${selectedDay}T12:00:00`);
  const list = $("#archive-list"); const calendar = $("#archive-calendar"); list.replaceChildren(); calendar.replaceChildren(); $("#archive-paper").classList.add("is-hidden");
  const year = archiveMonth.getFullYear(); const month = archiveMonth.getMonth(); $("#archive-month").textContent = `${year}년 ${month + 1}월`;
  const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const answerDates = new Set(state.answers.map((answer) => answer.date));
  for (let index = 0; index < firstDay; index += 1) { const spacer = document.createElement("span"); spacer.className = "calendar-spacer"; calendar.append(spacer); }
  for (let day = 1; day <= daysInMonth; day += 1) { const date = localDateKey(year, month, day); const button = document.createElement("button"); button.type = "button"; button.className = `calendar-day${answerDates.has(date) ? " has-record" : ""}`; button.dataset.date = date; button.textContent = day; button.addEventListener("click", () => showArchiveAnswer(state.answers.find((answer) => answer.date === date))); calendar.append(button); }
  if (!state.answers.length) { list.innerHTML = '<p class="empty-state">아직 남긴 조각이 없어요.<br>오늘의 작은 이야기를 모찌에게 들려주세요.</p>'; return; }
  [...state.answers].reverse().forEach((answer) => { const item = document.createElement("button"); item.type = "button"; item.className = "archive-item"; item.dataset.date = answer.date; const date = document.createElement("p"); date.textContent = formatDate(answer.date); item.append(date); item.addEventListener("click", () => showArchiveAnswer(answer)); list.append(item); });
  showArchiveAnswer(state.answers.find((answer) => answer.date === selectedDay));
}

function closeSheet() { $("#answer-sheet").classList.add("is-hidden"); }
$("#answer-form").addEventListener("submit", (event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get("answer")?.trim(); if (!value) return; state.answers.push({ date: today, questionId: selectedQuestion.id, question: selectedQuestion.text, value }); save(); closeSheet(); renderToday(); renderGarden(); showView("today"); });
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => { const view = item.dataset.view; if (view === "today") renderToday(); if (view === "archive") renderArchive(); showView(view); }));
$("#archive-button").addEventListener("click", () => { renderArchive(); showView("archive"); });
$("#archive-back").addEventListener("click", () => showView("garden"));
$("#archive-prev").addEventListener("click", () => { archiveMonth = new Date(archiveMonth.getFullYear(), archiveMonth.getMonth() - 1, 1); renderArchive(null); });
$("#archive-next").addEventListener("click", () => { archiveMonth = new Date(archiveMonth.getFullYear(), archiveMonth.getMonth() + 1, 1); renderArchive(null); });
$("#sheet-backdrop").addEventListener("click", closeSheet); $("#close-sheet").addEventListener("click", closeSheet); renderGarden(); renderToday();
$("#preferences-button").addEventListener("click", () => { renderPreferences(); $("#preferences-sheet").classList.remove("is-hidden"); });
$("#preferences-backdrop").addEventListener("click", closePreferences); $("#close-preferences").addEventListener("click", closePreferences);
$("#save-preferences").addEventListener("click", () => { const selected = (id) => [...document.querySelectorAll(`#${id} input:checked`)].map((input) => input.value); preferences = { disliked_species: $("#no-dislike").checked ? [] : selected("disliked-options"), liked_species: selected("liked-options").slice(0, 3) }; localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)); closePreferences(); });
