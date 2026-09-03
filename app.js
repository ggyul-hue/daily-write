import { dailyQuestions, dateKey, idleEvent, missedEvent } from "./data.js";
import { behaviorWeights, chooseBehavior, createAnimalProfile, species } from "./animal-system.js";

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
let preferences = JSON.parse(localStorage.getItem(PREFERENCES_KEY) || '{"disliked_species":[],"liked_species":[]}');
let currentBehavior = "idle";
let animalPosition = 50;
let behaviorTimer;
let walkFrameTimer;
let walkRunId = 0;
const $ = (selector) => document.querySelector(selector);
const views = { garden: $("#garden-view"), today: $("#today-view"), room: $("#room-view"), archive: $("#archive-view") };

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function formatDate(day) { return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date(`${day}T12:00:00`)); }
function todayAnswer() { return state.answers.find((answer) => answer.date === today); }
function showView(name) { Object.entries(views).forEach(([key, view]) => view.classList.toggle("is-hidden", key !== name)); document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === name)); window.scrollTo(0, 0); }
const behaviorMessages = { idle: "모찌는 정원을 천천히 둘러보고 있어요.", "walk-a": "모찌는 정원을 산책하고 있어요.", "walk-b": "모찌는 정원을 산책하고 있어요.", sleep: "모찌는 햇볕 아래에서 잠들었어요.", sit: "모찌는 풀잎 옆에 앉아 쉬고 있어요.", read: "모찌는 치즈에 대해 공부하고 있어요.", carry: "모찌는 작은 돌멩이를 주머니에 모으고 있어요." };
let animalRenderId = 0;
const dwellTimes = { idle: [6000, 14000], sit: [8000, 16000], sleep: [15000, 35000], read: [10000, 20000], carry: [6000, 12000] };
const randomBetween = (min, max) => min + Math.random() * (max - min);
function imagePath(pose) { return `assets/animals/hamster/${pose}.png`; }
function setCaption() { $("#animal-caption").textContent = new Date().getHours() >= 20 && !todayAnswer() ? missedEvent(today) : behaviorMessages[currentBehavior]; }
function renderAnimal({ fade = false } = {}) { const renderId = ++animalRenderId; const asset = $("#hamster-asset"); const hamster = $("#hamster"); asset.className = `hamster-asset coat-${animalProfile.coat}${fade ? " is-fading" : ""}`; hamster.className = `hamster ${currentBehavior === "walk-a" || currentBehavior === "walk-b" ? "is-walking" : "is-stationary"}`; if (!hamster.classList.contains("is-walking")) hamster.style.left = `${animalPosition}%`; hamster.style.setProperty("--face-direction", hamster.dataset.direction || "1"); const image = document.createElement("img"); image.src = imagePath(currentBehavior); image.alt = ""; image.draggable = false; asset.replaceChildren(image); if (fade) window.setTimeout(() => { if (renderId === animalRenderId) asset.classList.remove("is-fading"); }, 120); setCaption(); }
function clearBehaviorTimers() { window.clearTimeout(behaviorTimer); window.clearInterval(walkFrameTimer); walkRunId += 1; }
function chooseStationaryBehavior() { const weights = { ...(animalProfile.behaviorWeights || behaviorWeights), "walk-a": 0, "walk-b": 0, read: 0.35, carry: 0.45 }; return chooseBehavior(weights); }
function scheduleStationary() { const [min, max] = dwellTimes[currentBehavior] || dwellTimes.idle; behaviorTimer = window.setTimeout(startNextBehavior, randomBetween(min, max)); }
function startWalk() { clearBehaviorTimers(); currentBehavior = "walk-a"; const start = animalPosition; const distance = randomBetween(10, 22) * (Math.random() < 0.5 ? -1 : 1); const target = Math.min(82, Math.max(18, start + distance)); const direction = target < start ? -1 : 1; const duration = randomBetween(2000, 4000); const runId = walkRunId; const hamster = $("#hamster"); hamster.dataset.direction = String(direction); hamster.className = "hamster is-walking"; hamster.style.setProperty("--face-direction", String(direction)); hamster.style.setProperty("--walk-duration", `${duration}ms`); hamster.style.left = `${start}%`; renderAnimal(); window.requestAnimationFrame(() => { if (runId === walkRunId) hamster.style.left = `${target}%`; }); let frame = 0; walkFrameTimer = window.setInterval(() => { if (runId !== walkRunId) return; currentBehavior = frame++ % 2 ? "walk-a" : "walk-b"; renderAnimal(); }, 300); behaviorTimer = window.setTimeout(() => { if (runId !== walkRunId) return; animalPosition = target; window.clearInterval(walkFrameTimer); currentBehavior = chooseStationaryBehavior(); hamster.style.setProperty("--walk-duration", "0ms"); renderAnimal({ fade: true }); scheduleStationary(); }, duration + 40); }
function startNextBehavior() { clearBehaviorTimers(); if (Math.random() < 0.28) { startWalk(); return; } currentBehavior = chooseStationaryBehavior(); renderAnimal({ fade: true }); scheduleStationary(); }
function chooseAnimalBehavior() { clearBehaviorTimers(); currentBehavior = chooseStationaryBehavior(); renderAnimal(); scheduleStationary(); }
function renderGarden() { $("#page-date").textContent = formatDate(today); const answer = todayAnswer(); $("#garden-record").textContent = answer ? `오늘은 “${answer.value}”을 남겼어요.` : ""; chooseAnimalBehavior(); }
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

function renderArchive(selectedDay = state.answers.at(-1)?.date) {
  const list = $("#archive-list"); const paper = $("#archive-paper"); list.replaceChildren(); paper.classList.add("is-hidden"); $("#archive-month").textContent = selectedDay ? new Intl.DateTimeFormat("ko-KR", { month: "long" }).format(new Date(`${selectedDay}T12:00:00`)) : "기록 없음";
  if (!state.answers.length) { list.innerHTML = '<p class="empty-state">아직 남긴 조각이 없어요.<br>오늘의 작은 이야기를 모찌에게 들려주세요.</p>'; return; }
  [...state.answers].reverse().forEach((answer) => { const item = document.createElement("button"); item.type = "button"; item.className = "archive-item"; const date = document.createElement("p"); date.textContent = formatDate(answer.date); item.append(date); item.addEventListener("click", () => { document.querySelectorAll(".archive-item").forEach((entry) => entry.classList.remove("is-selected")); item.classList.add("is-selected"); $("#paper-date").textContent = formatDate(answer.date); $("#paper-question").textContent = answer.question; $("#paper-answer").textContent = answer.value; paper.classList.remove("is-hidden"); }); list.append(item); if (answer.date === selectedDay) item.click(); });
}

function closeSheet() { $("#answer-sheet").classList.add("is-hidden"); }
$("#answer-form").addEventListener("submit", (event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get("answer")?.trim(); if (!value) return; state.answers.push({ date: today, questionId: selectedQuestion.id, question: selectedQuestion.text, value }); save(); closeSheet(); renderToday(); renderGarden(); showView("today"); });
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => { const view = item.dataset.view; if (view === "today") renderToday(); if (view === "archive") renderArchive(); showView(view); }));
$("#archive-button").addEventListener("click", () => { renderArchive(); showView("archive"); });
$("#sheet-backdrop").addEventListener("click", closeSheet); $("#close-sheet").addEventListener("click", closeSheet); renderGarden(); renderToday();
$("#preferences-button").addEventListener("click", () => { renderPreferences(); $("#preferences-sheet").classList.remove("is-hidden"); });
$("#preferences-backdrop").addEventListener("click", closePreferences); $("#close-preferences").addEventListener("click", closePreferences);
$("#save-preferences").addEventListener("click", () => { const selected = (id) => [...document.querySelectorAll(`#${id} input:checked`)].map((input) => input.value); preferences = { disliked_species: $("#no-dislike").checked ? [] : selected("disliked-options"), liked_species: selected("liked-options").slice(0, 3) }; localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)); closePreferences(); });
