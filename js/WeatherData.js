// import data from "../assets/data/data.js";

/**
 * Returns weather information in object format
 *
 * @return {json} JSON representation
 */
const getWeatherData = async () => {
  const apiResponse = await fetch("http://127.0.0.1:3000/all-timezone-cities");
  const data = await apiResponse.json();
  return data;
};

export default getWeatherData;
