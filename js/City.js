import { getCityDate, getCityTime, getCitySession } from "./CityDateAndTime.js";
import getWeatherData from "./WeatherData.js";

/**
 * City Class takes city information as parameters
 *
 * @param {string} cityValue
 * @param {string} cityName - City name
 * @param {string} cityHumidity - City humidity
 * @param {string} cityTemp - City temperature
 * @param {string} cityPrecipitation - City Precipitation
 * @param {string} cityContinent - City Continent
 * @param {string} cityDateAndTime - City Date and Time
 */
class City {
  constructor(
    cityValue,
    cityName,
    cityHumidity,
    cityTemp,
    cityPrecipitation,
    cityContinent,
    cityDateAndTime
  ) {
    this.cityValue = cityValue;
    this.cityName = cityName;
    this.cityTemp = cityTemp;
    this.cityHumidity = cityHumidity;
    this.cityPrecipitation = cityPrecipitation;
    this.cityContinent = cityContinent;
    this.cityDateAndTime = cityDateAndTime;
    this.cityNextFiveHrsForecast = "";
  }

  /**
   *
   * @returns {string} City Name
   */
  getCityName() {
    return this.cityName;
  }

  /**
   * Return city date
   * @returns {string} - City Date
   */
  getCityDate() {
    return getCityDate(this.cityDateAndTime);
  }

  /**
   * Return city time
   * @returns {string} - City Time
   */
  getCityTime() {
    return getCityTime(this.cityDateAndTime);
  }

  /**
   * Returns city session
   * @returns {string} - City Session
   */
  getCitySession() {
    return getCitySession(this.cityDateAndTime);
  }

  /**
   * Return city continent
   * @returns {string} - City Continent
   */
  getCityTimeZone() {
    return this.cityContinent ? this.cityContinent.split("/")[0] : "";
  }

  /**
   * Returns city temperature
   * @returns {Number} - City Temperature
   */
  getCityTemperature() {
    return this.cityTemp ? parseInt(this.cityTemp) : "";
  }

  /**
   * Returns city humidity
   * @returns {Number} - City Humidity
   */
  getCityHumidity() {
    return this.cityHumidity ? parseInt(this.cityHumidity) : "";
  }

  /**
   * Returns city precipitation
   * @returns {Number} - City Precipitation
   */
  getCityPrecipitation() {
    return this.cityPrecipitation ? parseInt(this.cityPrecipitation) : "";
  }

  setCityForecast(cityValue) {
    const data = getWeatherData();
    const cityObj = data[cityValue];
    this.cityNextFiveHrsForecast = cityObj.nextFiveHrs;
  }

  getCityForecast(cityValue) {
    if (!this.cityNextFiveHrsForecast) {
      this.setCityForecast(cityValue);
    }
    return this.cityNextFiveHrsForecast;
  }
}

export default City;
