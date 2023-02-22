const { fork } = require("child_process");
const path = require("path");

const serveHourlyForecast = (request, response) => {
  const jsonData = request.body;

  const childFileLocation = path.join(__dirname, "getHourlyForecast.js");
  const child = fork(childFileLocation);

  child.send(jsonData);
  child.on("message", (data) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(data);
  });
};

module.exports = serveHourlyForecast;
