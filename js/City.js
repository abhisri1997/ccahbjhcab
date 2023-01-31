import { getCityDate, getCityTime, getCitySession } from "./CityDateAndTime.js";
import getWeatherData from "./WeatherData.js";

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
  }
  getCityName() {
    return this.cityName;
  }
  getCityDate() {
    return getCityDate(this.cityDateAndTime);
  }
  getCityTime() {
    return getCityTime(this.cityDateAndTime);
  }
  getCitySession() {
    return getCitySession(this.cityDateAndTime);
  }
  getCityTimeZone() {
    return this.cityContinent ? this.cityContinent.split("/")[0] : "";
  }
  getCityTemperature() {
    return this.cityTemp ? parseInt(this.cityTemp) : "";
  }
  getCityHumidity() {
    return this.cityHumidity ? parseInt(this.cityHumidity) : "";
  }
  getCityPrecipitation() {
    return this.cityPrecipitation ? parseInt(this.cityPrecipitation) : "";
  }
}

export default City;
