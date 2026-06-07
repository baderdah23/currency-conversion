const currentNumberElement = document.querySelector("#current_number");
const currentCurrencyElement = document.querySelector("#current_Currency");
const goalCurrencyElement = document.querySelector("#goal_currency");
const conversionBtn = document.querySelector("#button");
const resultLabel = document.querySelector("#result");

let data = "";
let currentNumber = "";
let currentCurrency = "";
let goalCurrency = "";

async function fetchData() {
  const getDataFromApi = await fetch("https://open.er-api.com/v6/latest/USD");
  data = await getDataFromApi.json();
  return data;
}

fetchData();

const getDataFromApp = () => {
  currentNumber = currentNumberElement.value;
  currentCurrency = currentCurrencyElement.value.toUpperCase();
  goalCurrency = goalCurrencyElement.value.toUpperCase();
};

const conversion = () => {
  let divisionCurrency = data.rates[goalCurrency] / data.rates[currentCurrency];
  divisionCurrency = divisionCurrency.toFixed(2);
  const result = parseFloat(currentNumber) * divisionCurrency;
  return result;
};

conversionBtn.addEventListener("click", () => {
  getDataFromApp();
  const currentData = `${currentNumber} ${currentCurrency}`;
  const goalData = `${conversion()} ${goalCurrency}`;
  resultLabel.textContent = `${currentData} = ${goalData}`;
});
