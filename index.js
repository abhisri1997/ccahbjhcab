import getWeatherData from "./WeatherData.js";
import monthMatch from "./monthMatch.js";

const cityInputSelector = document.querySelector(
  ".city-selector > input[type=text]"
);

const preferenceIconSelector = document.querySelectorAll(
  ".preference-icon > .icons"
);

const spinnerSelector = document.querySelector("#top-picker");

let activeElementSelector = document.querySelector(".active");

let activePreferenceIconSelector = document.querySelectorAll(
  ".active > .icons > img"
);

const carouselSelector = document.querySelector(".carousel-container");

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
 *
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
 * Gets all the cities from API.
 *
 * @return {Array} Array of cities
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
 * Sets the input selector data from the api
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
};

//Event Listener for first page load.

window.addEventListener("DOMContentLoaded", async () => {
  const allCities = await getAllCities();

  setCityInfo(allCities[0]);
  setCitySelector();
  dynamicCard("sunny");
});

// On Input change event listener for top section when city name changes

cityInputSelector.addEventListener("input", async () => {
  let currentCityValue = cityInputSelector.value;
  const allCities = await getAllCities();

  if (allCities.includes(currentCityValue)) setCityInfo(currentCityValue);
});

// IIFEE for adding event listeners to all the icons in middle section of the UI.

preferenceIconSelector.forEach((el) => {
  el.addEventListener("click", (event) => {
    const weatherType = event.target.alt.split(" ")[0];
    console.log(weatherType);
    activeElementSelector = document.querySelector(".active");
    activeElementSelector.classList.remove("active");
    el.parentElement.classList.add("active");
    dynamicCard(weatherType);
  });
});

// On input change event listener for mid section spinner

spinnerSelector.addEventListener("change", async (e) => {
  let weatherType = document.querySelector(".active img").alt.split(" ")[0];
  dynamicCard(weatherType);
});

const getPrefereceWeatherDetails = async (weather) => {
  const weatherDetails = await getWeatherData();
  const response = [];

  for (let city in weatherDetails) {
    const temperatureCheck = parseInt(weatherDetails[city].temperature);
    const humidityCheck = parseInt(weatherDetails[city].humidity);
    const precipitationCheck = parseInt(weatherDetails[city].precipitation);

    if (
      weatherConditionCheck(
        weather,
        temperatureCheck,
        humidityCheck,
        precipitationCheck
      )
    ) {
      response.push(weatherDetails[city]);
    }
  }

  return response;
};

const weatherConditionCheck = (
  weather,
  temperatureCheck,
  humidityCheck,
  precipitationCheck
) => {
  switch (weather) {
    case "sunny":
      if (
        temperatureCheck >= 29 &&
        humidityCheck < 50 &&
        precipitationCheck > 50
      ) {
        return true;
      }
      break;
    case "snowy":
      if (
        temperatureCheck >= 20 &&
        temperatureCheck <= 28 &&
        humidityCheck > 50 &&
        precipitationCheck < 50
      ) {
        return true;
      }
      break;
    case "rainy":
      if (temperatureCheck < 20 && humidityCheck >= 50) {
        return true;
      }
      break;
    default:
      console.error("Unknown weather condition: " + weather);
  }

  return false;
};

const dynamicCard = async (weatherType = "sunny") => {
  activePreferenceIconSelector = document.querySelectorAll(
    ".active > .icons > img"
  );
  const preferredWeatherCityDeatils = await getPrefereceWeatherDetails(
    weatherType
  );
  const preferredWeatherCities = preferredWeatherCityDeatils.length;
  const numberOfCards = Math.min(preferredWeatherCities, spinnerSelector.value);

  let card = "";
  let customCardStyle = {};

  for (let i = 0; i < numberOfCards; i++) {
    const city_name = preferredWeatherCityDeatils[i].cityName;
    const date_time = getCityDateAndTime(
      preferredWeatherCityDeatils[i].dateAndTime
    );
    const city_time = `${date_time[1].split("-")[0]} ${
      date_time[2] ? "AM" : "PM"
    }`;
    const city_date = date_time[0];
    const city_humidity = preferredWeatherCityDeatils[i].humidity;
    const city_temp = preferredWeatherCityDeatils[i].temperature;
    const city_precipitation = preferredWeatherCityDeatils[i].precipitation;
    const weatherType = activePreferenceIconSelector[0].alt.split(" ")[0];
    let weatherTypeIcon;
    switch (weatherType) {
      case "sunny":
        weatherTypeIcon = "sunnyIcon";
        break;
      case "snowy":
        weatherTypeIcon = "snowflakeIcon";
        break;
      case "rainy":
        weatherTypeIcon = "rainyIcon";
        break;
      default:
        console.error("Unknown weather type");
    }

    card += `
          <div class="card card-${i + 1}">

            <div class="card-details">

              <h2 class="city-name">${city_name}</h2>
              <h3 class="current-time">${city_time}</h3>
              <h3 class="current-date">${city_date}</h3>

              <div class="card-humidity">

                <img src="./assets/WeatherIcons/humidityIcon.svg" alt="" class="card-icon" loading="lazy">
                <h6>${city_humidity}</h6>

              </div>

              <div class="card-precipitation">

                <img src="./assets/WeatherIcons/precipitationIcon.svg" alt="" class="card-icon" loading="lazy">
                <h6>${city_precipitation}</h6>

              </div>

            </div>

            <div class="card-temp">

              <img src="./assets/WeatherIcons/${weatherTypeIcon}.svg" alt="" class="card-icon" loading="lazy">
              ${city_temp}

            </div>

          </div>`;
  }

  carouselSelector.innerHTML = card;

  for (let i = 0; i < numberOfCards; i++) {
    const currentCard = `card-${i + 1}`;
    const city_name = preferredWeatherCityDeatils[i].cityName.toLowerCase();
    const currentCardSelector = document.querySelector(`.${currentCard}`);

    currentCardSelector.style.cssText = `
      background-color: var(--bg-dark-grey-tile);
      background-image: url("./../assets/CityIcons/${city_name}.svg");
      background-size: 100%;
      background-position: calc(100% + 5px) calc(100% + 35px);
      background-repeat: no-repeat;
      background-blend-mode: screen;
    `;
  }
};
