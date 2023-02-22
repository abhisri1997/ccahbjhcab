const { allTimeZones, nextNhoursWeather } = require("weatherforecastpackage");

console.log("Serving at process id: ", process.pid);

const getHourlyForecast = (data) => {
  const jsonData = data;
  const { city_Date_Time_Name, hours } = jsonData;
  const weatherData = allTimeZones();
  const output = JSON.stringify(
    nextNhoursWeather(city_Date_Time_Name, hours, weatherData)
  );
  return output;
};

process.on("message", (message) => {
  const output = getHourlyForecast(message);
  process.send(output);
});
