import City from "./City.js";
import getWeatherData from "./WeatherData.js";

/**
 * Takes arrays of City objects
 *
 * @param {Array<City>} array of city objects
 */
function Cities(cities) {
  City.call(this);
  this.cities = cities ? cities : [];
  this.cityNextFiveHrsForecast = "";
}

Cities.prototype = Object.create(City.prototype);
Cities.prototype.constructor = Cities;

Cities.prototype.getCity = function (cityValue) {
  return this.cities.find((city) => city.cityValue === cityValue);
};

Cities.prototype.addCity = function (city) {
  this.cities.push(city);
};

Cities.prototype.removeCity = function (cityName) {
  this.cities = this.cities.filter((city) => city.cityName !== cityName);
};

Cities.prototype.setCityForecast = function (cityValue) {
  const data = getWeatherData();
  const cityObj = data[cityValue];
  this.cityNextFiveHrsForecast = cityObj.nextFiveHrs;
};

Cities.prototype.getCityForecast = function (cityValue) {
  if (!this.cityNextFiveHrsForecast) {
    const city = this.cities.find((city) => city.cityValue === cityValue);
    this.setCityForecast(city.cityValue);
  }
  return this.cityNextFiveHrsForecast;
};

export default Cities;
