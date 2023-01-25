import {
  getCityDate,
  getCityTime,
  getCitySession,
} from "./getCityDateAndTime.js";

function CityPrototype(cityName, data) {
  this.cityName = data[cityName].cityName;
  this.dateAndTime = data[cityName].dateAndTime;
  this.timeZone = data[cityName].timeZone;
  this.temperature = parseInt(data[cityName].temperature);
  this.humidity = parseInt(data[cityName].humidity);
  this.precipitation = parseInt(data[cityName].precipitation);
  this.nextFiveHrs = data[cityName].nextFiveHrs;
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
  return this.nextFiveHrs;
};

export default CityPrototype;
