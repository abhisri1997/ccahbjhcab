/**
 * It takes object as an argument and returns a set of all continents
 *
 * @param {Object} weatherData - object of weather data
 * @return {Set<string>} set of all continents
 */
const getAllContinents = (weatherData) => {
  const allContinentsSet = new Set();

  for (let city in weatherData) {
    const continent = weatherData[city].timeZone.split("/")[0];

    allContinentsSet.add(continent);
  }
  return allContinentsSet;
};

export default getAllContinents;
