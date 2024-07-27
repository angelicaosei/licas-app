function currentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Windy");
  let pressureElement = document.querySelector("#Pressure");
  let timeElement = document.querySelector("#time");
  let now = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  iconElement.innerHTML = `<img
          src="${response.data.condition.icon_url}"class"emoji"/>`;
  timeElement.innerHTML = formateDate(now);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  pressureElement.innerHTML = `${response.data.temperature.pressure}pascal`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
}
function formateDate(now) {
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let year = now.getFullYear();
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];
  return `${day} ${month}, ${year} @${hours} :${minutes}`;
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
