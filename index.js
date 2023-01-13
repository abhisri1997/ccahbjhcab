import getWeatherData from "./WeatherData.js";
import monthMatch from "./monthMatch.js";

const cityInputSelector = document.querySelector(
  ".city-selector > input[type=text]"
);

/**
 * Takes city name and initializes the top section with the specified weather information received for particular city.
 *
 * @param {string} city
 */
const setCityInfo = async (city) => {
  const cityName = city;
  const weatherData = await getWeatherData();

  const cityData = {
    temperature: weatherData[cityName].temperature,
    humidity: weatherData[cityName].humidity,
    dateTime: weatherData[cityName].dateAndTime,
    precipitation: weatherData[cityName].precipitation,
    forecast: weatherData[cityName].nextFiveHrs,
  };

  const date = getCityDateAndTime(cityData.dateTime)[0];
  const time = getCityDateAndTime(cityData.dateTime)[1];
  const isAM = getCityDateAndTime(cityData.dateTime)[2];

  cityInputSelector.value = weatherData[cityName].cityName;
  setCityIcon(cityName);
  setCityTemperature(cityData.temperature);
  setCityDateTime(date, time, isAM);
  setCityHumidityAndPrecipitation(cityData.humidity, cityData.precipitation);
  setForecastData(cityData.forecast, cityData.temperature);
};

/**
 * Takes a city name and sets the icon in top section of the UI for the particular city.
 *
 * @param {string} cityName
 */
const setCityIcon = (cityName) => {
  const cityIconElement = document.getElementsByClassName("city-icon")[0];
  const iconLocation = `./assets/CityIcons/${cityName}.svg`;
  cityIconElement.src = iconLocation;
};

/**
 * Takes date and time in string format and return date, time and AM/PM in array format.
 *
 * @param {string} dateTime
 * @return {Array}
 */
const getCityDateAndTime = (dateTime) => {
  const dateAndTime = dateTime.split(",");

  let date = dateAndTime[0].split("/")[1];
  date = parseInt(date) <= 9 ? 0 + date : date;

  const monthIndex = dateAndTime[0].split("/")[0];
  const month = monthMatch[monthIndex];
  const year = dateAndTime[0].split("/")[2];
  const formattedDate = date + "-" + month + "-" + year;

  const time = dateAndTime[1].trim().split(" ")[0];
  const hours =
    parseInt(time.split(":")[0]) <= 9
      ? 0 + time.split(":")[0]
      : time.split(":")[0];
  const minutes = time.split(":")[1];
  const seconds = time.split(":")[2];
  const formattedTime = hours + ":" + minutes + "-" + seconds;
  const isAM = dateAndTime[1].trim().split(" ")[1] == "AM" ? true : false;

  return [formattedDate, formattedTime, isAM];
};

/**
 *
 *
 * @param {*} cityTemperature
 */
const setCityTemperature = (cityTemperature) => {
  const farenheitTemperature = parseInt(cityTemperature) * (9 / 5) + 32 + " F";

  const cityCelciusTemperatureElement =
    document.getElementsByClassName("city-temp-c")[0];

  cityCelciusTemperatureElement.innerHTML = cityTemperature;

  const cityFarenheitTemperatureElement =
    document.getElementsByClassName("city-temp-f")[0];

  cityFarenheitTemperatureElement.innerHTML = farenheitTemperature;
};

/**
 *
 *
 * @param {*} date
 * @param {*} time
 * @param {*} isAM
 */
const setCityDateTime = (date, time, isAM) => {
  const dateElement = document.getElementsByClassName("city-date")[0];
  dateElement.innerHTML = date;

  const timeElement = document.getElementsByClassName("city-time")[0];
  timeElement.innerHTML = time.split("-")[0];

  const timeSecondsElement = document.getElementsByClassName("city-second")[0];
  timeSecondsElement.innerHTML = ":" + time.split("-")[1];

  const dayIcon = "./assets/Images_Icons/amState.svg";
  const nightIcon = "./assets/Images_Icons/pmState.svg";
  const isAMElement = document.getElementsByClassName("day-night-icon")[0];
  isAMElement.src = isAM ? dayIcon : nightIcon;
};

/**
 *
 *
 * @param {*} forecast
 * @param {*} currentTemp
 */
const setForecastData = (forecast, currentTemp) => {
  const forecastLength = forecast.length;
  let tempNow = parseInt(currentTemp);

  const weatherIconsHTML = document.getElementsByClassName("weather-icon");
  const forecastHTML = document.getElementsByClassName("time-data");

  let weatherType = tempNow < 8 ? "snowflakeIcon" : "sunnyIcon";
  let altText = weatherType === "sunnyIcon" ? "sunny" : "snowy";
  let iconLocation = `./assets/WeatherIcons/${weatherType}.svg`;

  weatherIconsHTML[0].setAttribute("src", iconLocation);
  weatherIconsHTML[0].setAttribute("alt", altText);

  forecastHTML[0].innerHTML = tempNow.toString();

  for (let i = 1; i <= forecastLength; i++) {
    let forecastTemp = parseInt(forecast[i - 1]);

    weatherType = forecastTemp < 8 ? "snowflakeIcon" : "sunnyIcon";
    altText = weatherType === "sunnyIcon" ? "sunny" : "snowy";
    iconLocation = `./assets/WeatherIcons/${weatherType}.svg`;

    weatherIconsHTML[i].setAttribute("src", iconLocation);
    weatherIconsHTML[i].setAttribute("alt", altText);

    forecastHTML[i].innerHTML = forecastTemp.toString();
  }
};

/**
 *
 *
 * @param {*} humidity
 * @param {*} precipitation
 */
const setCityHumidityAndPrecipitation = (humidity, precipitation) => {
  const humidityElement = document.getElementsByClassName("city-humidity")[0];
  humidityElement.innerHTML = humidity;

  const precipitationElement = document.getElementsByClassName(
    "city-precipitation-top"
  )[0];
  precipitationElement.innerHTML = precipitation;
};

/**
 *
 *
 * @return {*}
 */
const getAllCities = async () => {
  const weatherData = await getWeatherData();
  const allCities = [];

  for (let city in weatherData) {
    allCities.push(city);
  }

  allCities.sort();

  return allCities;
};

/**
 *
 *
 */
const setCitySelector = async () => {
  const weatherData = await getWeatherData();
  const allCities = await getAllCities();

  const city_selector = document.getElementById("cityName");
  let options = "";

  for (let city of allCities) {
    options += `<option value="${city}">${weatherData[city].cityName}</option>`;
  }

  city_selector.innerHTML = options;

  setCityInfo(allCities[0]);
};

//Event Listener for first page load.

window.addEventListener("DOMContentLoaded", setCitySelector());

// On Input change event listener for top section when city name changes

cityInputSelector.addEventListener("input", async () => {
  let currentCityValue = cityInputSelector.value;
  const allCities = await getAllCities();

  if (allCities.includes(currentCityValue)) setCityInfo(currentCityValue);
});
