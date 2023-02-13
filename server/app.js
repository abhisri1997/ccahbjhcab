const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const serveStatic = require("./serveStatic");
const serveHourlyForecast = require("./serveHourlyForecast");
const serveAllCityWeather = require("./serveAllCityWeather");
const serveOneCity = require("./serveOneCity");

const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "..");
app.use(bodyParser.json());
app.use(
  "/",
  (req, res, next) => {
    if (req.query.city) {
      serveOneCity(req, res);
    } else {
      next();
    }
  },
  express.static(staticPath)
);

app.post("/hourly-forecast", serveHourlyForecast);
app.get("/all-timezone-cities", serveAllCityWeather);

app.listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
