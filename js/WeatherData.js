// import data from "../assets/data/data.js";

/**
 * Returns weather information in object format
 *
 * @return {json} JSON representation
 */
const getWeatherData = async () => {
  const base = `${location.protocol}//${location.host}`;
  const apiResponse = await fetch(`${base}/all-timezone-cities`);
  const data = await apiResponse.json();
  return data;
};

export default getWeatherData;
