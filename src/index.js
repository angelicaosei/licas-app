function currentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchcity(city) {
  let apikey = "b2a5adcct04b33178913oc335f405433";
  let apiurl = ` https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(apiurl).then(currentWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-inputForm");

  searchcity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
searchcity("new york");
