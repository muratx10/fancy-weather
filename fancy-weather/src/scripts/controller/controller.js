import { APP, GET_ICONS } from '../model/components';
import { GET_COORDS } from '../model/location';
import GET_WEATHER from '../model/weatherAPI';
import { RENDER } from '../view/DOM';
import GET_TIME from '../model/time';
import { changeMap } from '../model/map';
import SHOW_MODAL from '../model/modalWindow';

function weatherSearch() {
  if (APP.DOM.searchInput.value){
    GET_COORDS(APP.DOM.searchInput.value, APP.language)
      .then((res) => {
        const { city, country } = res;
        APP.DOM.location.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...`;
        APP.DOM.temperature.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        changeMap(res.lat, res.lng, APP);
        GET_WEATHER(res.lat, res.lng, APP.language, APP.units)
          .then((data) => {
            APP.weatherData = data;
            APP.localTime = GET_TIME(APP.weatherData.currState.timeZone, APP.language);
            clearInterval(APP.TIMER_ID);
            APP.TIME_UPDATE(APP.weatherData.currState.timeZone, APP.language);
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
                APP.units === 'si' ? APP.weatherData.temp.C.current : APP.weatherData.temp.F.current,
                APP.units === 'si' ? APP.weatherData.temp.C.apparent : APP.weatherData.temp.F.apparent,
                APP.weatherData.currState.summary,
                APP.weatherData.currState.humidity,
                APP.weatherData.currState.windSpeed,
                APP.localTime.day_ONE,
                APP.units === 'si' ? APP.weatherData.temp.C.day_1 : APP.weatherData.temp.F.day_1,
                APP.localTime.day_TWO,
                APP.units === 'si' ? APP.weatherData.temp.C.day_2 : APP.weatherData.temp.F.day_2,
                APP.localTime.day_THREE,
                APP.units === 'si' ? APP.weatherData.temp.C.day_3 : APP.weatherData.temp.F.day_3,
              ],
            );
            document.querySelector('.degSign').style.display = 'inline';
            APP.DOM.icon.className = GET_ICONS(APP.localTime.hour)[APP.weatherData.icons.current];
            APP.DOM.day_ONE_ICON.className = GET_ICONS(APP.localTime.hour)[APP.weatherData.icons.day_1];
            APP.DOM.day_TWO_ICON.className = GET_ICONS(APP.localTime.hour)[APP.weatherData.icons.day_2];
            APP.DOM.day_THREE_ICON.className = GET_ICONS(APP.localTime.hour)[APP.weatherData.icons.day_3];
            APP.updateImage(APP.localTime.season, APP.localTime.isDayTime, APP.weatherData.icons.current);
            if (APP.DOM.location.textContent.length > 30) {
              APP.DOM.location.style.fontSize = '2.375rem';
            } else {
              APP.DOM.location.style.fontSize = '2.8125rem';
            }
            if (city === undefined && country) {
              SHOW_MODAL(APP.GET_CURRENT_LOCATION_WEATHER, APP, true);
            }
          });
      })
      .catch(() => {
        SHOW_MODAL(APP.GET_CURRENT_LOCATION_WEATHER, APP, false);
      });
    APP.DOM.searchForm.reset();
  } else {
    return true;
  }
}

export default weatherSearch;
