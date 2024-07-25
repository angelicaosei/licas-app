function currentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Windy");
  let pressureElement = document.querySelector("#Pressure");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  timeElement.innerHTML = formateDate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  pressureElement.innerHTML = `${response.data.temperature.pressure}pascal`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
}
function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let year = date.getFullYear();
  let day = date.getDay();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${month} ${day}, ${year} @${hours} :${minutes}`;
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
