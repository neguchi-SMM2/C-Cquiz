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
  const minPop = parseInt(minPopInput.value, 10);
  const maxPop = parseInt(maxPopInput.value, 10);

  let selectedCities = cities.filter(city => 
    city.population >= minPop && city.population <= maxPop
  );

  result.innerHTML = selectedCities.map(city => `<li>${city.name} (${city.population})</li>`).join('');
}
