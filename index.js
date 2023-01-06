const monthMatch = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const getWeatherData = async () => {
  const response = await fetch("./assets/data/data.json");
  const data = await response.json();
  return data;
};

const setCityInfo = async (selector = null, city = null) => {
  const cityName = selector == null ? city : selector.value;
  const weatherData = await getWeatherData();
  const cityData = {
    temperature: weatherData[cityName].temperature,
    humidity: weatherData[cityName].humidity,
    dateTime: weatherData[cityName].dateAndTime,
    precipitation: weatherData[cityName].precipitation,
    forecast: weatherData[cityName].nextFiveHrs,
  };

  const date = getCityDateAndTime(cityData.dateTime)[0];
  const time = getCityDateAndTime(cityData.dateTime)[1];
  const isAM = getCityDateAndTime(cityData.dateTime)[2];

  setCityIcon(cityName);
  setCityTemperature(cityData.temperature);
  setCityDateTime(date, time, isAM);
  setCityHumidityAndPrecipitation(cityData.humidity, cityData.precipitation);
};

const setCityIcon = (cityName) => {
  const cityIconElement = document.getElementsByClassName("city-icon")[0];
  const iconLocation = `./assets/CityIcons/${cityName}.svg`;
  cityIconElement.src = iconLocation;
};

const getCityDateAndTime = (dateTime) => {
  const dateAndTime = dateTime.split(",");

  let date = dateAndTime[0].split("/")[1];
  date = parseInt(date) <= 9 ? 0 + date : date;

  const monthIndex = dateAndTime[0].split("/")[0];
  const month = monthMatch[monthIndex];
  const year = dateAndTime[0].split("/")[2];
  const formattedDate = date + "-" + month + "-" + year;

  const time = dateAndTime[1].trim().split(" ")[0];
  const hours =
    parseInt(time.split(":")[0]) <= 9
      ? 0 + time.split(":")[0]
      : time.split(":")[0];
  const minutes = time.split(":")[1];
  const seconds = time.split(":")[2];
  const formattedTime = hours + ":" + minutes + "-" + seconds;
  const isAM = dateAndTime[1].trim().split(" ")[1] == "AM" ? true : false;

  return [formattedDate, formattedTime, isAM];
};

const setCityTemperature = (cityTemperature) => {
  const farenheitTemperature = parseInt(cityTemperature) * (9 / 5) + 32 + " F";

  const cityCelciusTemperatureElement =
    document.getElementsByClassName("city-temp-c")[0];

  cityCelciusTemperatureElement.innerHTML = cityTemperature;

  const cityFarenheitTemperatureElement =
    document.getElementsByClassName("city-temp-f")[0];

  cityFarenheitTemperatureElement.innerHTML = farenheitTemperature;
};

const setCityDateTime = (date, time, isAM) => {
  const dateElement = document.getElementsByClassName("city-date")[0];
  dateElement.innerHTML = date;

  const timeElement = document.getElementsByClassName("city-time")[0];
  timeElement.innerHTML = time.split("-")[0];

  const timeSecondsElement = document.getElementsByClassName("city-second")[0];
  timeSecondsElement.innerHTML = ":" + time.split("-")[1];

  const dayIcon = "./assets/Images_Icons/amState.svg";
  const nightIcon = "./assets/Images_Icons/pmState.svg";
  const isAMElement = document.getElementsByClassName("day-night-icon")[0];
  isAMElement.src = isAM ? dayIcon : nightIcon;
};

const setCityHumidityAndPrecipitation = (humidity, precipitation) => {
  const humidityElement = document.getElementsByClassName("city-humidity")[0];
  humidityElement.innerHTML = humidity;

  const precipitationElement = document.getElementsByClassName(
    "city-precipitation-top"
  )[0];
  precipitationElement.innerHTML = precipitation;
};

const setCitySelector = async (firstLoad) => {
  const weatherData = await getWeatherData();
  const allCities = [];

  for (let city in weatherData) {
    allCities.push(city);
  }

  const city_selector = document.getElementById("city-select");
  let options = "";

  for (let city of allCities) {
    options += `<option value="${city}">${weatherData[city].cityName}</option>`;
  }

  city_selector.innerHTML = options;

  if (firstLoad) {
    setCityInfo(null, allCities[0]);
  }
};

setCitySelector(false);
