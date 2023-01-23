import getWeatherData from "./WeatherData.js";

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

export default getAllCities;
