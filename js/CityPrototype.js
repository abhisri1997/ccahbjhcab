import { getCityDate, getCityTime, getCitySession } from "./CityDateAndTime.js";
import getWeatherData from "./WeatherData.js";

function CityPrototype(cityName) {
  const weatherData = getWeatherData();
  let cityObj = weatherData[cityName];
  if (!cityObj) throw new Error(`City ${cityName} not found in weather data`);
  this.cityName = cityObj.cityName;
  this.dateAndTime = cityObj.dateAndTime;
  this.timeZone = cityObj.timeZone;
  this.temperature = parseInt(cityObj.temperature);
  this.humidity = parseInt(cityObj.humidity);
  this.precipitation = parseInt(cityObj.precipitation);
  this.nextFiveHrsForecast = cityObj.nextFiveHrs;
}

CityPrototype.prototype.getCityName = function () {
  return this.cityName;
};

CityPrototype.prototype.getCityDate = function () {
  return getCityDate(this.dateAndTime);
};

CityPrototype.prototype.getCityTime = function () {
  return getCityTime(this.dateAndTime);
};

CityPrototype.prototype.getCitySession = function () {
  return getCitySession(this.dateAndTime);
};

CityPrototype.prototype.getCityTimeZone = function () {
  return this.timeZone.split("/")[0];
};

CityPrototype.prototype.getCityTemperature = function () {
  return this.temperature;
};

CityPrototype.prototype.getCityHumidity = function () {
  return this.humidity;
};

CityPrototype.prototype.getCityPrecipitation = function () {
  return this.precipitation;
};

CityPrototype.prototype.getCityForecast = function () {
  return this.nextFiveHrsForecast;
};

export default CityPrototype;
