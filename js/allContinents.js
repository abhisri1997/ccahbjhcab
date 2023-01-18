const getAllContinents = async (weatherData) => {
  const allContinentsSet = new Set();

  for (let city in weatherData) {
    const continent = weatherData[city].timeZone.split("/")[0];

    allContinentsSet.add(continent);
  }
  return allContinentsSet;
};

export default getAllContinents;
