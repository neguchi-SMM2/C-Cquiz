let cities = [];
let totalQuestions = 0;

const minPopInput = document.getElementById("minPop");
const maxPopInput = document.getElementById("maxPop");
const startBtn = document.getElementById("startBtn");
let result = document.getElementById("selectedCities");

fetch("cities.json")
  .then((res) => res.json())
  .then((data) => {
    cities = data;
  });

function generate() {
  let citiesValue = "";
  let selectedCities = [];
  for (let i = 0; i < cities.length; i++) {
    citiesValue = cities[i];
    if (citiesValue.population >= minPopInput && citiesValue.population <= maxPopInput) {
      selectedCities.push(citiesValue);
    }
  }
  result.innerHTML = selectedCities;
}
