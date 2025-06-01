let cities = [];
let filteredCities = [];
let currentQuestion = 0;
let score = 0;
let totalQuestions = 5;
let questionLives = 3;
let currentCity = null;

const minPopInput = document.getElementById("minPop");
const maxPopInput = document.getElementById("maxPop");
const questionCountInput = document.getElementById("questionCount");
const startBtn = document.getElementById("startBtn");
const setupDiv = document.getElementById("setup");
const quizDiv = document.getElementById("quiz");
const cityNameSpan = document.getElementById("cityName");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const feedbackDiv = document.getElementById("feedback");
const questionLivesSpan = document.getElementById("questionLives");
const scoreSpan = document.getElementById("score");
const totalSpan = document.getElementById("total");
const resultDiv = document.getElementById("result");
const resultText = document.getElementById("resultText");
const answerReveal = document.getElementById("answerReveal");

fetch("cities.json")
  .then((res) => res.json())
  .then((data) => {
    cities = data;
  });

startBtn.addEventListener("click", () => {
  const minPop = parseInt(minPopInput.value, 10);
  const maxPop = parseInt(maxPopInput.value, 10);
  totalQuestions = parseInt(questionCountInput.value, 10);
  score = 0;
  currentQuestion = 0;
  questionLives = 3;

  filteredCities = cities.filter(
    (city) => city.population >= minPop && city.population <= maxPop
  );

  if (filteredCities.length < totalQuestions) {
    alert("指定された条件に合う都市が足りません。");
    return;
  }

  shuffleArray(filteredCities);
  setupDiv.classList.add("hidden");
  quizDiv.classList.remove("hidden");
  totalSpan.textContent = totalQuestions;
  scoreSpan.textContent = score;
  showQuestion();
});

submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim();
  if (!answer) return;

  if (answer === currentCity.country) {
    feedbackDiv.textContent = "正解！";
    feedbackDiv.className = "correct";
    score++;
    scoreSpan.textContent = score;
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  } else {
    questionLives--;
    if (questionLives > 0) {
      feedbackDiv.textContent = `不正解！ 残りミス: ${questionLives}`;
      feedbackDiv.className = "incorrect";
      questionLivesSpan.textContent = questionLives;
    } else {
      endGame(false);
    }
  }
});

function showQuestion() {
  feedbackDiv.textContent = "";
  answerInput.value = "";
  questionLives = 3;
  questionLivesSpan.textContent = questionLives;

  currentCity = filteredCities[currentQuestion];
  cityNameSpan.textContent = currentCity.name;
}

function nextQuestion() {
  currentQuestion++;
  if (score === totalQuestions) {
    endGame(true);
  } else if (currentQuestion < totalQuestions) {
    showQuestion();
  } else {
    endGame(true);
  }
}

function endGame(success) {
  quizDiv.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  if (success) {
    resultText.textContent = "🎉 ゲームクリア！おめでとう！";
    answerReveal.textContent = "";
  } else {
    resultText.textContent = "💀 ゲームオーバー...";
    answerReveal.textContent = `正解は「${currentCity.country}」、人口は ${currentCity.population.toLocaleString()} 人です。`;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
