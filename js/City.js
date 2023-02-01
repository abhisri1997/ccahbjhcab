import { getCityDate, getCityTime, getCitySession } from "./CityDateAndTime.js";

/**
 * City constructor function takes city information as parameters
 *
 * @param {string} cityValue
 * @param {string} cityName - City name
 * @param {string} cityHumidity - City humidity
 * @param {string} cityTemp - City temperature
 * @param {string} cityPrecipitation - City Precipitation
 * @param {string} cityContinent - City Continent
 * @param {string} cityDateAndTime - City Date and Time
 */
function City(
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
}

/**
 *
 * @returns {string} City Name
 */
City.prototype.getCityName = function () {
  return this.cityName;
};

/**
 * Return city date
 * @returns {string} - City Date
 */
City.prototype.getCityDate = function () {
  return getCityDate(this.cityDateAndTime);
};

/**
 * Return city time
 * @returns {string} - City Time
 */
City.prototype.getCityTime = function () {
  return getCityTime(this.cityDateAndTime);
};

/**
 * Returns city session
 * @returns {string} - City Session
 */
City.prototype.getCitySession = function () {
  return getCitySession(this.cityDateAndTime);
};

/**
 * Return city continent
 * @returns {string} - City Continent
 */
City.prototype.getCityTimeZone = function () {
  return this.cityContinent ? this.cityContinent.split("/")[0] : "";
};

/**
 * Returns city temperature
 * @returns {Number} - City Temperature
 */
City.prototype.getCityTemperature = function () {
  return this.cityTemp ? parseInt(this.cityTemp) : "";
};

/**
 * Returns city humidity
 * @returns {Number} - City Humidity
 */
City.prototype.getCityHumidity = function () {
  return this.cityHumidity ? parseInt(this.cityHumidity) : "";
};

/**
 * Returns city precipitation
 * @returns {Number} - City Precipitation
 */
City.prototype.getCityPrecipitation = function () {
  return this.cityPrecipitation ? parseInt(this.cityPrecipitation) : "";
};

export default City;
