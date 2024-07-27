function refreshWeather(response) {
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
  getForecast(response.data.city);
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

  axios.get(apiurl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-inputForm");
  searchcity(searchInput.value);
}
function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "mon", "Tue", "wed", "Thurs", "Fri", "sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apikey = "b2a5adcct04b33178913oc335f405433";
  let apiurl = ` https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}`;
  axios.get(apiurl).then(displayForeCast);
}

function displayForeCast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast">
            <div class="weather-date">${formateDay(day.time)}</div>
            <div class="weather-icon"><img src="${
              day.condition.icon_url
            }"/></div>
            <div class="weather-temperatures"><div class="weather-temperature"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></div> <div class="weather-temperature">${Math.round(
          day.temperature.minimum
        )}°</div> </div>
          </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
searchcity("new york");
