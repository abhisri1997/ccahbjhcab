const { fork } = require("child_process");
const path = require("path");

const serveAllCityWeather = (request, response) => {
  const childFileLocation = path.join(__dirname, "getAllCityWeather.js");
  const child = fork(childFileLocation);

  child.send("allTimeZones");
  child.on("message", (data) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(data);
  });
};

module.exports = serveAllCityWeather;
