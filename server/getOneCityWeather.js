const { timeForOneCity } = require("weatherforecastpackage");

console.log("Serving at process id: ", process.pid);

const getOneCityWeather = (city) => {
  const weatherData = JSON.stringify(timeForOneCity(city));
  return weatherData;
};

process.on("message", (message) => {
  const output = getOneCityWeather(message);
  process.send(output);
});
