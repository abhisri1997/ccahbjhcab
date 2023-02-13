const http = require("http");
const path = require("path");
const serveStatic = require("./serveStatic");
const serveHourlyForecast = require("./serveHourlyForecast");
const serveAllCityWeather = require("./serveAllCityWeather");
const serveOneCity = require("./serveOneCity");

const url = require("url");
const PORT = process.env.PORT || 3000;

http
  .createServer((request, response) => {
    if (request.url === "/hourly-forecast") {
      serveHourlyForecast(request, response);
    } else if (request.url === "/all-timezone-cities") {
      serveAllCityWeather(request, response);
    } else if (request.url.split("=")[0] === "/?city") {
      serveOneCity(request, response);
    } else {
      serveStatic(request, response);
    }
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
