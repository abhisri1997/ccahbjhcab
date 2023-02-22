const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const serveOneCity = require("./serveOneCity");
const serveHourlyForecast = require("./serveHourlyForecast");
const serveAllCityWeather = require("./serveAllCityWeather");

const app = express();
const HOST = process.env.HOST || "http://127.0.0.1";
const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));
