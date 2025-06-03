const nameInput = document.getElementById("name");
const countryInput = document.getElementById("country");
const populationInput = document.getElementById("population");
const addBtn = document.getElementById("addBtn");
const cityList = document.getElementById("cityList");
const output = document.getElementById("output");

let cities = [];

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const country = countryInput.value.trim();
  const population = parseInt(populationInput.value.trim(), 10);

  if (!name || !country || isNaN(population)) {
    alert("全ての項目を正しく入力してください。");
    return;
  }

  const city = { name, country, population };
  cities.push(city);

  // 表示更新
  const li = document.createElement("li");
  li.textContent = `${name}（${country}）: ${population.toLocaleString()}`;
  cityList.appendChild(li);

  // JSON出力更新
  output.value = JSON.stringify(cities, null, 2);

  // 入力クリア
  nameInput.value = "";
  countryInput.value = "";
  populationInput.value = "";
});
