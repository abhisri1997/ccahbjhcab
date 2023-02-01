import City from "./City.js";
import getWeatherData from "./WeatherData.js";


/**
* Takes arrays of City objects
*
* @param {Array<City>} array of city objects
*/
  class Cities extends City {
    constructor(cities) {
      super();
      this.cities = cities ? cities : [];
      this.cityNextFiveHrsForecast = "";
    }
    getCity(cityValue) {
      return this.cities.find((city) => city.cityValue === cityValue);
    }
    addCity(city) {
      this.cities.push(city);
    }
    removeCity(cityName) {
      this.cities = this.cities.filter((city) => city.cityName !== cityName);
    }
    setCityForecast(cityValue) {
      const data = getWeatherData();
      const cityObj = data[cityValue];
      this.cityNextFiveHrsForecast = cityObj.nextFiveHrs;
    }
    getCityForecast(cityValue) {
      if (!this.cityNextFiveHrsForecast) {
        const city = this.cities.find((city) => city.cityValue === cityValue);
        this.setCityForecast(city.cityValue);
      }
      return this.cityNextFiveHrsForecast;
    }
  }
);

export default Cities;
