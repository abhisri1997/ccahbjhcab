import getAllContinents from "./allContinents.js";
import getWeatherData from "./WeatherData.js";
import { getCityDateAndTime } from "./CityDateAndTime.js";
import fillWeatherData from "./fillWeatherData.js";

/**
 * Returns a list of popular cities with their weather data
 *
 * @return {Map<string, []}  returns a map of city and it's weather data
 */
const getPopularContinentCities = () => {
  const weatherData = getWeatherData();
  const allContinents = getAllContinents(weatherData);
  const continentCityMap = new Map();
  const allCity = fillWeatherData();

  for (let continent of allContinents) {
    continentCityMap.set(continent, []);
  }

  for (let city in weatherData) {
    const cityObj = allCity.getCity(city);
    const continent = cityObj.getCityTimeZone();
    const eachContinentCityNumber = continentCityMap.get(continent).length;
    const cityTime = cityObj.getCityTime().split("-")[0];
    const session = cityObj.getCitySession();
    const formattedTime = cityTime + " " + session;
    const cityWeather = {
      continentName: continent,
      cityName: cityObj.getCityName(),
      cityTime: formattedTime,
      cityTemperature: cityObj.getCityTemperature() + "°C",
      cityHumidity: cityObj.getCityHumidity() + "%",
    };

    if (eachContinentCityNumber < 2) {
      const currentContinent = continentCityMap.get(continent);
      currentContinent.push(cityWeather);
      continentCityMap.set(continent, currentContinent);
    }
  }

  return continentCityMap;
};

export default getPopularContinentCities;
