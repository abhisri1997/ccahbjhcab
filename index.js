import getWeatherData from "./js/WeatherData.js";
import monthMatch from "./js/monthMatch.js";
import getPopularContinentCities from "./js/popularContinentCities.js";

const cityInputSelector = document.querySelector(
  ".city-selector > input[type=text]"
);

const preferenceIconSelector = document.querySelectorAll(
  ".preference-icon > .icons"
);

const spinnerSelector = document.querySelector("#top-picker");

const continentCardSelector = document.querySelector(".continent-temp-data");

const carouselSelector = document.querySelector(".carousel-container");

const leftArrowSelector = document.querySelector(".left-arrow");

const rightArrowSelector = document.querySelector(".right-arrow");

let activeElementSelector = document.querySelector(".active");

let activePreferenceIconSelector = document.querySelectorAll(
  ".active > .icons > img"
);

let sortContinetByContinentNameSelector = document.querySelector(
  ".sort-continent_name"
);

let sortByContinentTemperatureSelector = document.querySelector(".sort-temp");

/**
 * Takes city name and initializes the top section with the specified weather information received for particular city.
 *
 * @param {string} city
 */
const setCityInfo = (city) => {
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
 * Takes date and time in string format and return date, time and AM/PM in array format.
 *
 * @param {string} dateTime
 * @return {Array}
 */
export const getCityDateAndTime = (dateTime) => {
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
const getAllCities = () => {
  const weatherData = getWeatherData();
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
const setCitySelector = () => {
  const weatherData = getWeatherData();
  const allCities = getAllCities();

  const city_selector = document.getElementById("cityName");
  let options = "";

  for (let city of allCities) {
    options += `<option value="${city}">${weatherData[city].cityName}</option>`;
  }

  city_selector.innerHTML = options;

  setCityInfo(allCities[0]);
};

/**
 * Get all weather data for the preferred weather type
 *
 * @param {string} weatherType - Type of weather
 * @return {[]}
 */
const getPrefereceWeatherDetails = (weatherType) => {
  const weatherDetails = getWeatherData();
  const response = [];

  for (let city in weatherDetails) {
    const temperatureCheck = parseInt(weatherDetails[city].temperature);
    const humidityCheck = parseInt(weatherDetails[city].humidity);
    const precipitationCheck = parseInt(weatherDetails[city].precipitation);

    if (
      weatherConditionCheck(
        weatherType,
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

/**
 * Returns true if the provided checks are successful for the provided weather type
 *
 * @param {string} weatherType - Type of weather to check, example "sunny", "rainy", etc.
 * @param {Number} temperatureCheck - Temperature in Celsius to check for given weather type
 * @param {Number} humidityCheck - Humidity in percentage to check for given weather type
 * @param {Number} precipitationCheck - Precipitation in percentage to check for given weather type
 * @returns {boolean}
 */
const weatherConditionCheck = (
  weatherType,
  temperatureCheck,
  humidityCheck,
  precipitationCheck
) => {
  switch (weatherType) {
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
      console.error("Unknown weather type condition: " + weatherType);
  }

  return false;
};

/**
 * Generates dynamic weather carousel cards based on the weather conditions provided
 *
 * @param {string} [weatherType="sunny"] - Weather condition, default is "sunny"
 * @returns {null}
 */
const dynamicCard = (weatherType = "sunny") => {
  activePreferenceIconSelector = document.querySelectorAll(
    ".active > .icons > img"
  );
  const preferredWeatherCityDeatils = getPrefereceWeatherDetails(weatherType);
  const preferredWeatherCities = preferredWeatherCityDeatils.length;
  const numberOfCards = Math.min(
    Math.min(preferredWeatherCities, spinnerSelector.value),
    10
  );

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
      background-repeat: no-repeat;
      background-blend-mode: screen;
    `;
  }
};

/**
 * Slides the cards left and right
 *
 * @param {Object} e - event parameter when left/right arrows are clicked
 */
const carouselSlider = (e) => {
  const cardsSelector = document.querySelectorAll(".card");
  const cardsContainerSelector = document.querySelector(".carousel-container");
  const clickedClassName = e.target.className;
  let cardWidth = cardsSelector[1].clientWidth;

  if (clickedClassName === "left-arrow" || clickedClassName === "left-icon") {
    cardsContainerSelector.scrollLeft -= cardWidth;
  }
  if (clickedClassName == "right-arrow" || clickedClassName == "right-icon") {
    cardsContainerSelector.scrollLeft += cardWidth;
  }
};

/**
 * Dynamically generate card for bottom section of the UI
 *
 * @param {Map<string, [Object]} popularContinentDetails - Map of continents and it's popular cities
 * @returns {null}
 */
const dynamicContinentCard = (popularContinentDetails) => {
  let continentCardHTML = "";

  for (let [key, value] of popularContinentDetails.entries()) {
    value.forEach((continentCity) => {
      const {
        continentName,
        cityName,
        cityTime,
        cityTemperature,
        cityHumidity,
      } = continentCity;

      continentCardHTML += `
        <div class="continent-card">

          <div class="continent-details">

            <h4 class="continent-name">${continentName}</h4>

              <span class="continent-city-time">

                <h5 class="continent-city">${cityName}</h5>
                <h5 class="continent-time">, ${cityTime}</h5>

              </span>

          </div>

          <div class="continent-temp-details">

            <h4 class="city-temperature">${cityTemperature}</h4>

            <div class="city-precipitation">

              <img src="./assets/WeatherIcons/humidityIcon.svg" alt="" class="card-icon" loading="lazy">
              <h6>${cityHumidity}</h6>

            </div>

          </div>

        </div>
      `;
    });
  }
  continentCardSelector.innerHTML = continentCardHTML;
};

/**
 * Sorth the weather data according to the continent name
 *
 * @param {boolean} ascendingSort - boolean value to sort the output ascending or descending
 * @return {Map<String, [Object]>} Sorted Map
 */
const sortContinentByName = (ascendingSort) => {
  const popularContinentDetails = getPopularContinentCities();
  let sortedMap = new Map();
  const sortedArray = Array.from(popularContinentDetails).sort((a, b) => {
    if (ascendingSort) {
      return a[0].localeCompare(b[0]);
    } else {
      return b[0].localeCompare(a[0]);
    }
  });

  for (let [key, value] of sortedArray) {
    sortedMap.set(key, value);
  }

  return sortedMap;
};

/**
 * Sorth the provided weather data according to the temperature
 *
 * @param {Map<string, [Object]>} weatherData - Map of continents and it's popular cities weather info
 * @param {boolean} ascendingSort - boolean value to sort the output ascending or descending
 * @return {Map<string, [Object]>}  Sorted Map
 */
const sortContinentByTemperature = (weatherData, ascendingSort) => {
  let sortedMap = new Map();

  let mapToArray = Array.from(weatherData);

  mapToArray.forEach((key) => {
    key[1].sort((a, b) => {
      const tempA = parseInt(a.cityTemperature);
      const tempB = parseInt(b.cityTemperature);
      if (ascendingSort) {
        return tempA - tempB;
      } else {
        return tempB - tempA;
      }
    });
  });

  for (let [key, value] of mapToArray) {
    sortedMap.set(key, value);
  }

  return sortedMap;
};

//Event Listener for first page load.

window.addEventListener("DOMContentLoaded", () => {
  const allCities = getAllCities();

  setCityInfo(allCities[0]);
  setCitySelector();
  dynamicCard("sunny");
  let sortedPopularContinentCities = sortContinentByName(true);
  const isSortedAscending = false;
  sortedPopularContinentCities = sortContinentByTemperature(
    sortedPopularContinentCities,
    isSortedAscending
  );
  console.log(sortedPopularContinentCities);
  dynamicContinentCard(sortedPopularContinentCities);
});

// On Input change event listener for top section when city name changes

cityInputSelector.addEventListener("input", () => {
  let currentCityValue = cityInputSelector.value;
  const allCities = getAllCities();

  if (allCities.includes(currentCityValue)) setCityInfo(currentCityValue);
});

cityInputSelector.addEventListener("click", (e) => {
  e.target.value = "";
});

// Event listeners for all the icons in middle section of the UI.

preferenceIconSelector.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const weatherType = event.target.alt.split(" ")[0];
    console.log(weatherType);
    activeElementSelector = document.querySelector(".active");
    activeElementSelector.classList.remove("active");
    el.parentElement.classList.add("active");
    dynamicCard(weatherType);
  });
});

// On input change event listener for mid section spinner

spinnerSelector.addEventListener("change", (e) => {
  const spinnerValue = e.target.value;
  if (spinnerValue > 10 || spinnerValue < 3) {
    console.error("Please select values between 10 and 3");
    if (spinnerValue < 3) spinnerSelector.value = 3;
    else spinnerSelector.value = 10;
  } else {
    let weatherType = document.querySelector(".active img").alt.split(" ")[0];
    dynamicCard(weatherType);
  }
});

// Left and right carousel button event Listeners

leftArrowSelector.addEventListener("click", carouselSlider);
rightArrowSelector.addEventListener("click", carouselSlider);

// Event listener to handle sorting of continent cards based on continent name

sortContinetByContinentNameSelector.addEventListener("click", (e) => {
  e.preventDefault();
  let ascendingSort =
    e.target.nextElementSibling.alt === "sort_up" ? true : false;

  if (ascendingSort) {
    e.target.nextElementSibling.alt = "sort_down";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowDown.svg";
    ascendingSort = false;
  } else {
    e.target.nextElementSibling.alt = "sort_up";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowUp.svg";
    ascendingSort = true;
  }

  let sortedMap = sortContinentByName(ascendingSort);
  sortByContinentTemperatureSelector = document.querySelector(".sort-temp");
  const continentAscendingTempSort =
    sortByContinentTemperatureSelector.querySelector("img").alt === "sort_up"
      ? true
      : false;
  sortedMap = sortContinentByTemperature(sortedMap, continentAscendingTempSort);
  dynamicContinentCard(sortedMap);
});

// Event listener to handle sorting of continent cards based on continent city temperature

sortByContinentTemperatureSelector.addEventListener("click", (e) => {
  e.preventDefault();
  let ascendingSort =
    e.target.nextElementSibling.alt === "sort_up" ? true : false;

  if (ascendingSort) {
    e.target.nextElementSibling.alt = "sort_down";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowDown.svg";
    ascendingSort = false;
  } else {
    e.target.nextElementSibling.alt = "sort_up";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowUp.svg";
    ascendingSort = true;
  }
  sortContinetByContinentNameSelector = document.querySelector(
    ".sort-continent_name"
  );
  const continentAscendingContinentSort =
    sortContinetByContinentNameSelector.querySelector("img").alt === "sort_up"
      ? true
      : false;
  let sortedMap = sortContinentByName(continentAscendingContinentSort);
  sortedMap = sortContinentByTemperature(sortedMap, ascendingSort);
  dynamicContinentCard(sortedMap);
});
