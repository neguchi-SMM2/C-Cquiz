const nameInput = document.getElementById("name");
const countryInput = document.getElementById("country");
const populationInput = document.getElementById("population");
const addBtn = document.getElementById("addBtn");
const loadBtn = document.getElementById("loadBtn");
const cityList = document.getElementById("cityList");
const output = document.getElementById("output");

let cities = [];

function updateDisplay() {
  cityList.innerHTML = "";
  cities.forEach(city => {
    const li = document.createElement("li");
    li.textContent = `${city.name}（${city.country}）: ${city.population.toLocaleString()}`;
    cityList.appendChild(li);
  });
  output.value = JSON.stringify(cities, null, 2);
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const country = countryInput.value.trim();
  const population = parseInt(populationInput.value.trim(), 10);

  if (!name || !country || isNaN(population)) {
    alert("全ての項目を正しく入力してください。");
    return;
  }

  cities.push({ name, country, population });
  updateDisplay();

  nameInput.value = "";
  populationInput.value = "";
});

loadBtn.addEventListener("click", () => {
  try {
    const imported = JSON.parse(output.value);
    if (!Array.isArray(imported)) {
      alert("配列形式のJSONを貼り付けてください。");
      return;
    }

    for (const city of imported) {
      if (city.name && city.country && typeof city.population === "number") {
        cities.push(city);
      }
    }

    updateDisplay();
  } catch (e) {
    alert("有効なJSONデータを貼り付けてください。");
  }
});
