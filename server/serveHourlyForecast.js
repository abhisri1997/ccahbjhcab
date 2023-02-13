const { allTimeZones, nextNhoursWeather } = require("./timeZone");

const serveHourlyForecast = (request, response) => {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string
  });

  request.on("end", () => {
    const jsonData = JSON.parse(body);
    const { city_Date_Time_Name, hours } = jsonData;
    const weatherData = allTimeZones();
    const output = JSON.stringify(
      nextNhoursWeather(city_Date_Time_Name, hours, weatherData)
    );
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(output);
  });
};

module.exports = serveHourlyForecast;
