const { allTimeZones } = require("weatherforecastpackage");

console.log("Serving at process id: ", process.pid);

const getAllCityWeather = () => {
  const weatherData = JSON.stringify(allTimeZones());
  return weatherData;
};

process.on("message", (message) => {
  const output = getAllCityWeather();
  process.send(output);
});
