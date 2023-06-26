function formatedDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0{hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

let now = document.querySelector("li.time");
let currentTime = new Date();
now.innerHTML = formatedDate(currentTime);
let iconElement = document.querySelector("#icon");

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;

  let roundedTemp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#digit").innerHTML = `${roundedTemp}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#winds").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#precipitation"
  ).innerHTML = `${response.data.weather[0].precipitation} %`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fd665f227453ba8279e3d39e454b700&units=metric`;
  let apiKey = "6fd665f227453ba8279e3d39e454b700";
  axios.get(apiUrl).then(displayWeather);
}

function press(event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  searchCity(city);
}
function displayFahrenheitLinkTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#digit");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", press);
searchCity("Cape Town");

function searchLocation(position) {
  let apiKey = "6fd665f227453ba8279e3d39e454b700";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6fd665f227453ba8279e3d39e454b700&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", displayLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitLinkTemperature);
