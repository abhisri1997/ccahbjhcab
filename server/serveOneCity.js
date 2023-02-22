const { fork } = require("child_process");
const path = require("path");

const serveOneCity = (request, response) => {
  const city = request.query.city;

  const childFileLocation = path.join(__dirname, "getOneCityWeather.js");
  const childProcess = fork(childFileLocation);

  childProcess.send(city);
  childProcess.on("message", (data) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(data);
  });
};

module.exports = serveOneCity;
