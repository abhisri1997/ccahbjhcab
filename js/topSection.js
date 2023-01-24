import getWeatherData from "./WeatherData.js";
import { cityInputSelector } from "./index.js";
import { getCityDateAndTime } from "./getCityDateAndTime.js";
import getAllCities from "./getAllCities.js";
import LiveClock from "./LiveClock.js";

export const topSectionLiveClock = new LiveClock();

/**
 * Takes city name and initializes the top section with the specified weather information received for particular city.
 *
 * @param {string} city
 */
export const setCityInfo = (city) => {
  const cityName = city;
  const weatherData = getWeatherData();

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
 * Sets the temperature in top section of the UI.
 *
 * @param {string} cityTemperature
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
 * Sets the city date and time in top section of the UI.
 *
 * @param {String} date
 * @param {string} time
 * @param {string} isAM
 */
const setCityDateTime = (date, time, isAM) => {
  const dateElement = document.getElementsByClassName("city-date")[0];
  dateElement.innerHTML = date;

  const timeElement = document.getElementsByClassName("city-time")[0];
  timeElement.innerHTML = time.split("-")[0];

  const timeSecondsElement = document.getElementsByClassName("city-second")[0];
  timeSecondsElement.innerHTML = ":" + time.split("-")[1];

  const times = time.split("-")[0] + ":" + time.split("-")[1];

  topSectionLiveClock.liveClock(times, document.querySelector(".time"));

  const dayIcon = "./assets/Images_Icons/amState.svg";
  const nightIcon = "./assets/Images_Icons/pmState.svg";
  const isAMElement = document.getElementsByClassName("day-night-icon")[0];
  isAMElement.src = isAM ? dayIcon : nightIcon;
};

/**
 * Return weather icon based on the temperature passed.
 *
 * @param {number} temp
 * @return {string} weather icon
 */
const getWeatherIconType = (temp) => {
  let weatherType = "";

  if (temp > 29) weatherType = "sunnyIcon";
  else if (temp < 18 && temp > 10) weatherType = "rainyIcon";
  else if (temp >= 23 && temp <= 29) weatherType = "cloudyIcon";
  else if (temp <= 10) weatherType = "snowflakeIcon";
  else weatherType = "windyIcon";

  return weatherType;
};

/**
 * Sets next five hours forecast data in Top Section of the UIU
 *
 * @param {Array<T>} array of forecast temperature
 * @param {number} currentTemp
 */
const setForecastData = (forecast, currentTemp) => {
  const forecastLength = forecast.length;
  let tempNow = parseInt(currentTemp);

  const weatherIconsHTML = document.getElementsByClassName("weather-icon");
  const forecastHTML = document.getElementsByClassName("time-data");

  let weatherType = getWeatherIconType(tempNow);

  let altText = weatherType === "sunnyIcon" ? "sunny" : "snowy";
  let iconLocation = `./assets/WeatherIcons/${weatherType}.svg`;

  weatherIconsHTML[0].setAttribute("src", iconLocation);
  weatherIconsHTML[0].setAttribute("alt", altText);

  forecastHTML[0].innerHTML = tempNow.toString();

  for (let i = 1; i <= forecastLength; i++) {
    let forecastTemp = parseInt(forecast[i - 1]);

    weatherType = getWeatherIconType(forecastTemp);

    altText = weatherType === "sunnyIcon" ? "sunny" : "snowy";
    iconLocation = `./assets/WeatherIcons/${weatherType}.svg`;

    weatherIconsHTML[i].setAttribute("src", iconLocation);
    weatherIconsHTML[i].setAttribute("alt", altText);

    forecastHTML[i].innerHTML = forecastTemp.toString();
  }
};

/**
 * Sets Humidity and Precipitation in top section of UI.
 *
 * @param {string} humidity
 * @param {string} precipitation
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
 * Sets the input selector data from the api for top Section of UI
 *
 */
export const setCitySelector = () => {
  const weatherData = getWeatherData();
  const allCities = getAllCities();

  const city_selector = document.getElementById("cityName");
  let options = "";

  for (let city of allCities) {
    options += `<option value="${city}">${weatherData[city].cityName}</option>`;
  }

  city_selector.innerHTML = options;
};
