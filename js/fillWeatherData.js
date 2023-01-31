import getWeatherData from "./WeatherData.js";
import City from "./City.js";
import Cities from "./Cities.js";

const fillWeatherData = () => {
  const data = getWeatherData();
  const allCities = [];

  for (let key in data) {
    const cityObj = data[key];
    const cityName = cityObj.cityName;
    const cityValue = key;
    const cityHumidity = cityObj.humidity;
    const cityTemp = cityObj.temperature;
    const cityPrecipitation = cityObj.precipitation;
    const cityContinent = cityObj.timeZone;
    const cityDateAndTime = cityObj.dateAndTime;

    const city = new City(
      cityValue,
      cityName,
      cityHumidity,
      cityTemp,
      cityPrecipitation,
      cityContinent,
      cityDateAndTime
    );
    allCities.push(city);
  }

  const cities = new Cities(allCities);

  return cities;
};

export default fillWeatherData;
