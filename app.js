import { dailyQuestions, dateKey, idleEvent, missedEvent } from "./data.js";

const STORAGE_KEY = "daily-write-solo-v1";
let storedState;
try { storedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { storedState = null; }
const state = storedState?.answers ? storedState : { answers: [], animal: { name: "모찌" } };
const today = dateKey();
let selectedQuestion;
const $ = (selector) => document.querySelector(selector);
const views = { garden: $("#garden-view"), today: $("#today-view"), room: $("#room-view"), archive: $("#archive-view") };

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function formatDate(day) { return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date(`${day}T12:00:00`)); }
function todayAnswer() { return state.answers.find((answer) => answer.date === today); }
function showView(name) { Object.entries(views).forEach(([key, view]) => view.classList.toggle("is-hidden", key !== name)); document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === name)); window.scrollTo(0, 0); }
function animalMessage() { const answer = todayAnswer(); if (answer) return "모찌가 이야기를 듣고 폴짝 뛰었어요."; if (new Date().getHours() >= 20) return missedEvent(today); return idleEvent(today); }
function renderGarden() { $("#page-date").textContent = formatDate(today); $("#animal-caption").textContent = animalMessage(); const answer = todayAnswer(); $("#garden-record").textContent = answer ? `오늘은 “${answer.value}”을 남겼어요.` : ""; }

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
$("#answer-form").addEventListener("submit", (event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get("answer")?.trim(); if (!value) return; state.answers.push({ date: today, questionId: selectedQuestion.id, question: selectedQuestion.text, value }); save(); $("#hamster").classList.remove("is-idle"); $("#hamster").classList.add("is-happy"); closeSheet(); renderToday(); renderGarden(); showView("today"); });
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => { const view = item.dataset.view; if (view === "today") renderToday(); if (view === "archive") renderArchive(); showView(view); }));
$("#archive-button").addEventListener("click", () => { renderArchive(); showView("archive"); });
$("#sheet-backdrop").addEventListener("click", closeSheet); $("#close-sheet").addEventListener("click", closeSheet); renderGarden(); renderToday();
