/**
 * Returns weather information in json format
 *
 * @return {json} JSON representation
 */
const getWeatherData = async () => {
  const response = await fetch("./assets/data/data.json");
  const data = await response.json();
  return data;
};

export default getWeatherData;
