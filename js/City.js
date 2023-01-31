import { getCityDate, getCityTime, getCitySession } from "./CityDateAndTime.js";

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

City.prototype.getCityName = function () {
  return this.cityName;
};

City.prototype.getCityDate = function () {
  return getCityDate(this.cityDateAndTime);
};

City.prototype.getCityTime = function () {
  return getCityTime(this.cityDateAndTime);
};

City.prototype.getCitySession = function () {
  return getCitySession(this.cityDateAndTime);
};

City.prototype.getCityTimeZone = function () {
  return this.cityContinent ? this.cityContinent.split("/")[0] : "";
};

City.prototype.getCityTemperature = function () {
  return this.cityTemp ? parseInt(this.cityTemp) : "";
};

City.prototype.getCityHumidity = function () {
  return this.cityHumidity ? parseInt(this.cityHumidity) : "";
};

City.prototype.getCityPrecipitation = function () {
  return this.cityPrecipitation ? parseInt(this.cityPrecipitation) : "";
};

export default City;
