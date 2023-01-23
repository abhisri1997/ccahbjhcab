import { continentCardSelector } from "./index.js";

/**
 * Dynamically generate card for bottom section of the UI
 *
 * @param {Map<string, [Object]} popularContinentDetails - Map of continents and it's popular cities
 * @returns {null}
 */
export const dynamicContinentCard = (popularContinentDetails) => {
  let continentCardHTML = "";
  let counter = 0;

  for (let [key, value] of popularContinentDetails.entries()) {
    value.forEach((continentCity) => {
      const {
        continentName,
        cityName,
        cityTime,
        cityTemperature,
        cityHumidity,
      } = continentCity;

      counter++;

      continentCardHTML +=
        counter < 13
          ? `
        <div class="continent-card">

          <div class="continent-details">

            <h4 class="continent-name">${continentName}</h4>

              <span class="continent-city-time">

                <h5 class="continent-city">${cityName}, &nbsp</h5>
                <h5 class="continent-time">${cityTime}</h5>

              </span>

          </div>

          <div class="continent-temp-details">

            <h4 class="city-temperature">${cityTemperature}</h4>

            <div class="city-precipitation">

              <img src="./assets/WeatherIcons/humidityIcon.svg" alt="" class="card-icon" loading="lazy">
              <h6>${cityHumidity}</h6>

            </div>

          </div>

        </div>
      `
          : "";
    });
  }
  continentCardSelector.innerHTML = continentCardHTML;
};
