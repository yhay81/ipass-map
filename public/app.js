const elements = {
  answerExplanation: document.querySelector("[data-answer-explanation]"),
  answerNote: document.querySelector("[data-answer-note]"),
  answerResult: document.querySelector("[data-answer-result]"),
  choiceList: document.querySelector("[data-choice-list]"),
  copyResult: document.querySelector("[data-copy-result]"),
  mapStatus: document.querySelector("[data-map-status]"),
  nextQuestion: document.querySelector("[data-next-question]"),
  progressBar: document.querySelector("[data-progress-bar]"),
  questionDomain: document.querySelector("[data-question-domain]"),
  questionPosition: document.querySelector("[data-question-position]"),
  questionPrompt: document.querySelector("[data-question-prompt]"),
  quizKind: document.querySelector("[data-quiz-kind]"),
  quizSheet: document.querySelector("[data-quiz-sheet]"),
  resultScore: document.querySelector("[data-result-score]"),
  resultSheet: document.querySelector("[data-result-sheet]"),
  resultSummary: document.querySelector("[data-result-summary]"),
  resultTitle: document.querySelector("[data-result-title]"),
  routeDiagnosis: document.querySelector("[data-route-diagnosis]"),
  routeDrill: document.querySelector("[data-route-drill]"),
  startSheet: document.querySelector("[data-start-sheet]"),
  topicMap: document.querySelector("[data-topic-map]"),
  weakList: document.querySelector("[data-weak-list]"),
};

const storageKey = "ipass-map-progress-v1";
const sessionKey = "ipass-map-session-v1";
const automated =
  new URLSearchParams(location.search).get("qa") === "1" || navigator.webdriver === true;
const domainLabels = {
  strategy: "ストラテジ",
  management: "マネジメント",
  technology: "テクノロジ",
};

let questions = [];
let queue = [];
let currentIndex = 0;
let selectedChoice = null;
let answerRevealed = false;
let sessionAnswers = [];
let lastResult = null;

const makeSessionId = () => {
  const existing = localStorage.getItem(sessionKey);
  if (
    existing &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(existing)
  ) {
    return existing;
  }
  const value = crypto.randomUUID();
  localStorage.setItem(sessionKey, value);
  return value;
};

const sessionId = makeSessionId();

const readProgress = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    return {
      attempts: parsed.attempts && typeof parsed.attempts === "object" ? parsed.attempts : {},
      lastVisit: typeof parsed.lastVisit === "string" ? parsed.lastVisit : "",
      sessions: Number.isInteger(parsed.sessions) ? parsed.sessions : 0,
      version: 1,
    };
  } catch {
    return { attempts: {}, lastVisit: "", sessions: 0, version: 1 };
  }
};

let progress = readProgress();

const saveProgress = () => {
  localStorage.setItem(storageKey, JSON.stringify(progress));
};

const sendEvent = (name, questionCount = 0, score = 0) => {
  fetch("/api/events", {
    body: JSON.stringify({ automated, name, questionCount, score, sessionId }),
    headers: { "content-type": "application/json" },
    keepalive: true,
    method: "POST",
  }).catch(() => undefined);
};

const shuffle = (items) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
};

const topicStats = () => {
  const stats = new Map();
  for (const question of questions) {
    if (!stats.has(question.topic)) {
      stats.set(question.topic, {
        correct: 0,
        domain: question.domain,
        label: question.topic,
        total: 0,
      });
    }
    const attempt = progress.attempts[question.id];
    if (attempt) {
      const item = stats.get(question.topic);
      item.correct += attempt.correct;
      item.total += attempt.total;
    }
  }
  return [...stats.values()].map((item) => ({
    ...item,
    percent: item.total > 0 ? Math.round((item.correct / item.total) * 100) : null,
  }));
};

const updateMap = () => {
  const stats = topicStats();
  const answered = Object.keys(progress.attempts).length;
  elements.mapStatus.textContent = answered > 0 ? `${answered}問の履歴` : "未診断";

  for (const tile of elements.topicMap.querySelectorAll("[data-topic]")) {
    const item = stats.find((stat) => stat.label === tile.dataset.topic);
    const percent = item?.percent;
    const meter = tile.querySelector(".topic-meter i");
    const value = tile.querySelector("em");
    tile.classList.remove("is-weak", "is-growing", "is-strong");
    if (percent === null || percent === undefined) {
      meter.style.width = "0%";
      value.textContent = "--";
      continue;
    }
    meter.style.width = `${Math.max(percent, 6)}%`;
    value.textContent = `${percent}%`;
    tile.classList.add(percent < 50 ? "is-weak" : percent < 80 ? "is-growing" : "is-strong");
  }
};

const chooseDiagnosis = () =>
  Object.keys(domainLabels).flatMap((domain) =>
    shuffle(questions.filter((question) => question.domain === domain)).slice(0, 4),
  );

const chooseWeakDrill = () => {
  const rank = new Map(
    topicStats()
      .sort((left, right) => (left.percent ?? 0) - (right.percent ?? 0))
      .map((item, index) => [item.label, index]),
  );
  return shuffle(questions)
    .sort((left, right) => (rank.get(left.topic) ?? 99) - (rank.get(right.topic) ?? 99))
    .slice(0, 10);
};

const setView = (view) => {
  elements.startSheet.hidden = view !== "start";
  elements.quizSheet.hidden = view !== "quiz";
  elements.resultSheet.hidden = view !== "result";
};

const startQuiz = (nextMode) => {
  queue = nextMode === "diagnosis" ? chooseDiagnosis() : chooseWeakDrill();
  currentIndex = 0;
  selectedChoice = null;
  answerRevealed = false;
  sessionAnswers = [];
  elements.quizKind.textContent = nextMode === "diagnosis" ? "弱点診断" : "苦手10問";
  elements.routeDiagnosis.classList.toggle("is-current", nextMode === "diagnosis");
  elements.routeDrill.classList.toggle("is-current", nextMode === "drill");
  setView("quiz");
  renderQuestion();
  sendEvent(nextMode === "diagnosis" ? "diagnosis_started" : "drill_started");
};

const renderQuestion = () => {
  const question = queue[currentIndex];
  selectedChoice = null;
  answerRevealed = false;
  elements.answerNote.hidden = true;
  elements.questionPosition.textContent = `${currentIndex + 1} / ${queue.length}`;
  elements.progressBar.style.width = `${(currentIndex / queue.length) * 100}%`;
  elements.questionDomain.className = `question-domain domain-${question.domain}`;
  elements.questionDomain.textContent = `${domainLabels[question.domain]} / ${question.topic}`;
  elements.questionPrompt.textContent = question.prompt;
  elements.choiceList.replaceChildren(
    ...question.choices.map((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.dataset.choice = String(index);
      button.setAttribute("aria-pressed", "false");
      const mark = document.createElement("span");
      mark.textContent = String.fromCharCode(65 + index);
      const text = document.createElement("strong");
      text.textContent = choice;
      button.append(mark, text);
      button.addEventListener("click", () => {
        if (answerRevealed) return;
        selectedChoice = index;
        for (const item of elements.choiceList.querySelectorAll("button")) {
          const active = Number(item.dataset.choice) === index;
          item.classList.toggle("is-selected", active);
          item.setAttribute("aria-pressed", String(active));
        }
        elements.nextQuestion.disabled = false;
      });
      return button;
    }),
  );
  elements.nextQuestion.disabled = true;
  elements.nextQuestion.textContent = "答えを決める";
};

const recordAnswer = () => {
  const question = queue[currentIndex];
  const correct = selectedChoice === question.answer;
  const previous = progress.attempts[question.id] ?? { correct: 0, total: 0 };
  progress.attempts[question.id] = {
    correct: previous.correct + (correct ? 1 : 0),
    total: previous.total + 1,
  };
  saveProgress();
  sessionAnswers.push({
    correct,
    domain: question.domain,
    topic: question.topic,
  });
  sendEvent("answer_submitted", 1, correct ? 1 : 0);
  updateMap();

  for (const button of elements.choiceList.querySelectorAll("button")) {
    const choice = Number(button.dataset.choice);
    button.disabled = true;
    button.classList.toggle("is-correct", choice === question.answer);
    button.classList.toggle("is-wrong", choice === selectedChoice && !correct);
  }
  elements.answerResult.textContent = correct
    ? "正解"
    : `正解は ${String.fromCharCode(65 + question.answer)}`;
  elements.answerResult.className = correct ? "answer-correct" : "answer-wrong";
  elements.answerExplanation.textContent = question.explanation;
  elements.answerNote.hidden = false;
  elements.nextQuestion.disabled = false;
  elements.nextQuestion.textContent =
    currentIndex === queue.length - 1 ? "結果を見る" : "次の問題へ";
  elements.progressBar.style.width = `${((currentIndex + 1) / queue.length) * 100}%`;
  answerRevealed = true;
};

const sessionTopicStats = () => {
  const stats = new Map();
  for (const answer of sessionAnswers) {
    const item = stats.get(answer.topic) ?? {
      correct: 0,
      domain: answer.domain,
      label: answer.topic,
      total: 0,
    };
    item.total += 1;
    item.correct += answer.correct ? 1 : 0;
    stats.set(answer.topic, item);
  }
  return [...stats.values()]
    .map((item) => ({ ...item, percent: Math.round((item.correct / item.total) * 100) }))
    .sort((left, right) => left.percent - right.percent || right.total - left.total);
};

const showResult = () => {
  const score = sessionAnswers.filter((answer) => answer.correct).length;
  const weak = sessionTopicStats().slice(0, 3);
  progress.sessions += 1;
  saveProgress();
  lastResult = { score, total: queue.length, weak };
  elements.resultScore.textContent = `${score} / ${queue.length}`;
  elements.resultTitle.textContent =
    score >= queue.length * 0.8
      ? "仕上げに進めます"
      : score >= queue.length * 0.55
        ? "伸ばす場所が見えました"
        : "ここから地図を埋めましょう";
  elements.resultSummary.textContent =
    weak.length > 0
      ? `まずは「${weak[0].label}」から。弱いテーマを優先して10問を組み直します。`
      : "回答履歴から次の10問を組み直します。";
  elements.weakList.replaceChildren(
    ...weak.map((item, index) => {
      const row = document.createElement("li");
      const number = document.createElement("span");
      number.textContent = `0${index + 1}`;
      const name = document.createElement("strong");
      name.textContent = item.label;
      const value = document.createElement("em");
      value.textContent = `${item.percent}%`;
      row.className = `weak-${item.domain}`;
      row.append(number, name, value);
      return row;
    }),
  );
  setView("result");
  sendEvent("diagnosis_completed", queue.length, score);
};

elements.nextQuestion.addEventListener("click", () => {
  if (!answerRevealed) {
    if (selectedChoice !== null) recordAnswer();
    return;
  }
  if (currentIndex >= queue.length - 1) {
    showResult();
    return;
  }
  currentIndex += 1;
  renderQuestion();
});

document.querySelector("[data-start-diagnosis]").addEventListener("click", () => {
  if (questions.length > 0) startQuiz("diagnosis");
});

document.querySelector("[data-start-drill]").addEventListener("click", () => {
  if (questions.length > 0) startQuiz("drill");
});

document.querySelector("[data-quit-quiz]").addEventListener("click", () => {
  setView("start");
  elements.routeDiagnosis.classList.add("is-current");
  elements.routeDrill.classList.remove("is-current");
});

document.querySelector("[data-reset-progress]").addEventListener("click", () => {
  if (!confirm("この端末の解答履歴をすべて消しますか？")) return;
  progress = {
    attempts: {},
    lastVisit: new Date().toISOString().slice(0, 10),
    sessions: 0,
    version: 1,
  };
  saveProgress();
  updateMap();
  setView("start");
});

elements.copyResult.addEventListener("click", async () => {
  if (!lastResult) return;
  const weakText = lastResult.weak.map((item) => `${item.label} ${item.percent}%`).join(" / ");
  const text = `ITパスポート弱点マップ：${lastResult.score}/${lastResult.total}｜復習候補 ${weakText}｜https://ipass-map.yhay81.com/`;
  await navigator.clipboard.writeText(text);
  elements.copyResult.textContent = "コピーしました";
  sendEvent("result_copied", lastResult.total, lastResult.score);
});

for (const link of document.querySelectorAll("[data-official-link]")) {
  link.addEventListener("click", () => sendEvent("official_opened"));
}

const today = new Date().toISOString().slice(0, 10);
sendEvent("visited");
if (progress.lastVisit && progress.lastVisit !== today) sendEvent("returned");
progress.lastVisit = today;
saveProgress();

fetch("/api/questions")
  .then((response) => {
    if (!response.ok) throw new Error("questions_unavailable");
    return response.json();
  })
  .then((payload) => {
    questions = Array.isArray(payload.questions) ? payload.questions : [];
    if (questions.length < 30) throw new Error("not_enough_questions");
    updateMap();
  })
  .catch(() => {
    const startButton = document.querySelector("[data-start-diagnosis]");
    startButton.disabled = true;
    startButton.textContent = "問題を読み込めませんでした";
  });
