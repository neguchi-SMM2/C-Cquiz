let cities = [];
let filteredCities = [];
let currentQuestion = 0;
let score = 0;
let questionLives = 3;
let totalLives = 3;
let questions = [];

const cityNameElem = document.getElementById("cityName");
const answerElem = document.getElementById("answer");
const feedbackElem = document.getElementById("feedback");
const quizElem = document.getElementById("quiz");
const setupElem = document.getElementById("setup");
const resultElem = document.getElementById("result");
const resultTextElem = document.getElementById("resultText");
const scoreElem = document.getElementById("score");
const totalElem = document.getElementById("total");
const questionLivesElem = document.getElementById("questionLives");
const totalLivesElem = document.getElementById("totalLives");

fetch("cities.json")
  .then(res => res.json())
  .then(data => {
    cities = data;
  });

document.getElementById("startBtn").addEventListener("click", () => {
  const minPop = parseInt(document.getElementById("minPop").value);
  const maxPop = parseInt(document.getElementById("maxPop").value);
  const questionCount = parseInt(document.getElementById("questionCount").value);
  setupElem.style.display = "none";

  filteredCities = cities.filter(c => c.population >= minPop && c.population <= maxPop);
  questions = shuffleArray(filteredCities).slice(0, questionCount);

  totalElem.textContent = questions.length;
  setupElem.classList.add("hidden");
  quizElem.classList.remove("hidden");
  showQuestion();
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const answer = answerElem.value.trim();
  const correct = questions[currentQuestion].country_jp;

  if (answer === correct) {
    score++;
    feedbackElem.textContent = "正解！";
    currentQuestion++;
    questionLives = 3;
    setTimeout(() => {
      if (currentQuestion >= questions.length) {
        showResult();
      } else {
        showQuestion();
      }
    }, 800);
  } else {
    questionLives--;
    totalLives--;
    feedbackElem.textContent = `不正解... 正解は ${answer} ではありません。`;
    updateStatus();
    if (questionLives <= 0 || totalLives <= 0) {
      setTimeout(showResult, 800);
    }
  }
});

function showQuestion() {
  const q = questions[currentQuestion];
  cityNameElem.textContent = q.city;
  answerElem.value = "";
  feedbackElem.textContent = "";
  questionLives = 3;
  updateStatus();
}

function showResult() {
  quizElem.classList.add("hidden");
  resultElem.classList.remove("hidden");
  if (score >= questions.length) {
    resultTextElem.textContent = `🎉 全問正解！ (${score}/${questions.length})`;
  } else if (totalLives <= 0) {
    resultTextElem.textContent = `😢 ゲームオーバー！ (${score}/${questions.length})`;
  } else {
    resultTextElem.textContent = `終了！ (${score}/${questions.length})`;
  }
}

function updateStatus() {
  scoreElem.textContent = score;
  questionLivesElem.textContent = questionLives;
  totalLivesElem.textContent = totalLives;
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
