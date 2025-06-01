const cities = [
  { name: "Tokyo", country: "Japan", population: 37400068 },
  { name: "Delhi", country: "India", population: 28514000 },
  { name: "Osaka", country: "Japan", population: 19222665 },
  { name: "New York", country: "United States", population: 18713220 },
  { name: "Paris", country: "France", population: 11020000 },
  { name: "Sapporo", country: "Japan", population: 1950000 },
  { name: "Seoul", country: "South Korea", population: 9733509 },
  { name: "London", country: "United Kingdom", population: 8982000 }
];

let filtered = [], current = 0, score = 0, lives = 3;

const setup = document.getElementById("setup");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const answer = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const livesSpan = document.getElementById("lives");
const scoreSpan = document.getElementById("score");
const totalSpan = document.getElementById("total");

function showQuestion() {
  const q = filtered[current];
  cityName.textContent = q.name;
  answer.value = "";
  feedback.textContent = "";
}

document.getElementById("startBtn").onclick = () => {
  const min = parseInt(document.getElementById("minPop").value);
  const max = parseInt(document.getElementById("maxPop").value);
  const count = parseInt(document.getElementById("questionCount").value);
  filtered = cities.filter(c => c.population >= min && c.population <= max);
  filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, count);
  if (filtered.length === 0) {
    alert("その人口範囲には都市がありません。");
    return;
  }
  setup.classList.add("hidden");
  quiz.classList.remove("hidden");
  totalSpan.textContent = filtered.length;
  showQuestion();
};

document.getElementById("submitBtn").onclick = () => {
  const input = answer.value.trim().toLowerCase();
  const correct = filtered[current].country.toLowerCase();
  if (input === correct) {
    feedback.textContent = "正解！";
    score++;
    scoreSpan.textContent = score;
  } else {
    feedback.textContent = `不正解！ 正解: ${filtered[current].country}`;
    lives--;
    livesSpan.textContent = lives;
    if (lives <= 0) {
      quiz.classList.add("hidden");
      result.classList.remove("hidden");
      document.getElementById("resultText").textContent = `ゲームオーバー！正解数: ${score}`;
      return;
    }
  }
  current++;
  if (current >= filtered.length) {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");
    document.getElementById("resultText").textContent = `クリア！正解数: ${score}`;
  } else {
    showQuestion();
  }
};
