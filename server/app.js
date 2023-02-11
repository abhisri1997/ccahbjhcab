const http = require("http");
const fs = require("fs");
const path = require("path");
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone");
const url = require("url");
const PORT = process.env.PORT || 3000;

http
  .createServer((request, response) => {
    console.log("request ", request.url);

    if (request.url === "/hourly-forecast") {
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
        console.log("output ", output);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(output);
      });
    } else if (request.url === "/all-timezone-cities") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(allTimeZones()));
    } else if (request.url.split("=")[0] === "/?city") {
      const query = url.parse(request.url, true).query;
      const city = query.city;
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(timeForOneCity(city)));
    } else {
      var filePath = "." + request.url;

      if (filePath == "./") {
        filePath = "./index.html";
      }
      const extname = String(path.extname(filePath)).toLowerCase();
      const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".wasm": "application/wasm",
      };

      const contentType = mimeTypes[extname] || "application/octet-stream";

      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code == "ENOENT") {
            fs.readFile("./404.html", (error, content) => {
              response.writeHead(404, { "Content-Type": "text/html" });
              response.end(content, "utf-8");
            });
          } else {
            response.writeHead(500);
            response.end(
              "Sorry, check with the site admin for error: " +
                error.code +
                " ..\n"
            );
          }
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content, "utf-8");
        }
      });
    }
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
