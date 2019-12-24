import { APP, GET_ICONS } from '../model/components';
import { GET_COORDS } from '../model/location';
import GET_WEATHER from '../model/weatherAPI';
import { RENDER, SHOW_MODAL } from '../view/DOM';
import GET_TIME from '../model/time';
import TEMP_CONVERT from '../model/degreeConverter';
import { changeMap } from '../model/map';

function weatherSearch() {
  GET_COORDS(APP.DOM.searchInput.value, APP.language)
    .then((res) => {
      const { city, country } = res;
      APP.DOM.location.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...`;
      APP.DOM.temperature.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
      changeMap(res.lat, res.lng, APP);
      GET_WEATHER(res.lat, res.lng, APP.language, APP.units)
        .then((data) => {
          APP.condition = data.icon;
          if (APP.units === 'si') {
            APP.mainCelsius = data.temperature;
            APP.apparentCelsius = data.apparentTemp;
            APP.mainFahrenheit = TEMP_CONVERT('toF', data.temperature);
            APP.apparentFahreheit = TEMP_CONVERT('toF', data.apparentTemp);
            APP.day1Celsius = data.daily.day_1.temperature;
            APP.day1Fahrenheit = TEMP_CONVERT('toF', data.daily.day_1.temperature);
            APP.day2Celsius = data.daily.day_2.temperature;
            APP.day2Fahrenheit = TEMP_CONVERT('toF', data.daily.day_2.temperature);
            APP.day3Celsius = data.daily.day_3.temperature;
            APP.day3Fahrenheit = TEMP_CONVERT('toF', data.daily.day_3.temperature);
          } else if (APP.units === 'us') {
            APP.mainFahrenheit = data.temperature;
            APP.apparentFahreheit = data.apparentTemp;
            APP.mainCelsius = TEMP_CONVERT('toC', data.temperature);
            APP.apparentCelsius = TEMP_CONVERT('toC', data.apparentTemp);
            APP.day1Celsius = TEMP_CONVERT('toC', data.daily.day_1.temperature);
            APP.day1Fahrenheit = data.daily.day_1.temperature;
            APP.day2Celsius = TEMP_CONVERT('toC', data.daily.day_2.temperature);
            APP.day2Fahrenheit = data.daily.day_2.temperature;
            APP.day3Celsius = TEMP_CONVERT('toC', data.daily.day_3.temperature);
            APP.day3Fahrenheit = data.daily.day_3.temperature;
          }
          // if (APP.units === 'si') {
          //   APP.celsius = data.temperature;
          //   APP.fahrenheit = Math.trunc((data.temperature * (9 / 5)) + 32);
          // } else if (APP.units === 'us') {
          //   APP.fahrenheit = data.temperature;
          //   APP.celsius = Math.trunc((data.temperature - 32) * (5 / 9));
          // }
          APP.timeZone = data.timeZone;
          APP.localTime = GET_TIME(APP.timeZone, APP.language);
          clearInterval(APP.TIMER_ID);
          APP.TIME_UPDATE(APP.timeZone, APP.language);
          RENDER(
            [
              APP.DOM.location,
              APP.DOM.date,
              APP.DOM.temperature,
              APP.DOM.feelingTemp,
              APP.DOM.summary,
              APP.DOM.humidity,
              APP.DOM.windSpeed,
              APP.DOM.day_ONE,
              APP.DOM.day_ONE_TEMP,
              APP.DOM.day_TWO,
              APP.DOM.day_TWO_TEMP,
              APP.DOM.day_THREE,
              APP.DOM.day_THREE_TEMP,
            ],
            [
              `${city}, ${country}`,
              APP.localTime.currentDate,
              data.temperature,
              data.apparentTemp,
              data.summary,
              data.humidity,
              data.windSpeed,
              APP.localTime.day_ONE,
              data.daily.day_1.temperature,
              APP.localTime.day_TWO,
              data.daily.day_2.temperature,
              APP.localTime.day_THREE,
              data.daily.day_3.temperature,
            ],
          );
          document.querySelector('.degSign').style.display = 'inline';
          APP.DOM.icon.className = GET_ICONS(APP.localTime.hour)[data.icon];
          APP.DOM.day_ONE_ICON.className = GET_ICONS(APP.localTime.hour)[data.daily.day_1.icon];
          APP.DOM.day_TWO_ICON.className = GET_ICONS(APP.localTime.hour)[data.daily.day_2.icon];
          APP.DOM.day_THREE_ICON.className = GET_ICONS(APP.localTime.hour)[data.daily.day_3.icon];
          APP.updateImage(APP.localTime.season, APP.localTime.isDayTime, APP.condition);
          if (APP.DOM.location.textContent.length > 30) {
            APP.DOM.location.style.fontSize = '2.375rem';
          } else {
            APP.DOM.location.style.fontSize = '2.8125rem';
          }
          if (city === undefined && country) {
            const MSG = 'You have not entered valid city. Please try again';
            SHOW_MODAL(APP.GET_CURRENT_LOCATION_WEATHER, APP, MSG, true);
          }
        });
    })
    .catch(() => {
      const MSG = 'The location you entered is invalid. Please try again.';
      SHOW_MODAL(APP.GET_CURRENT_LOCATION_WEATHER, APP, MSG, false);
    });
  APP.DOM.search.reset();
}

export default weatherSearch;
