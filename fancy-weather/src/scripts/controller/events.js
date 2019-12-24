import { APP } from '../model/components';
import { GET_COORDS } from '../model/location';
import GET_WEATHER from '../model/weatherAPI';
import GET_TIME from '../model/time';
import { RENDER, SHOW_MODAL } from '../view/DOM';
import weatherSearch from './controller';

const CHANGE_LANG = (app = APP) => {
  const LANG_ELEM = app.DOM.selectedLang;
  LANG_ELEM.addEventListener('click', (e) => {
    const label = e.target.textContent.toLowerCase();
    const feelsLike = document.getElementById('feelsLikeLabel');
    const windLabel = document.getElementById('windLabel');
    const humidityLabel = document.getElementById('humidityLabel');
    const windSpeedUnit = document.getElementById('ms');
    if (label === 'ru') {
      feelsLike.textContent = 'Ощущаемая: ';
      windLabel.textContent = 'Ветер: ';
      humidityLabel.textContent = 'Влажность: ';
      windSpeedUnit.textContent = 'м/с';
      app.DOM.searchInput.setAttribute('placeholder', 'Поиск...');
      app.DOM.searchBtn.textContent = 'Найти';
    } else if (label === 'be') {
      feelsLike.textContent = 'Адчуваецца: ';
      windLabel.textContent = 'Вецер: ';
      humidityLabel.textContent = 'Вільготнасць: ';
      windSpeedUnit.textContent = 'м/с';
      app.DOM.searchInput.setAttribute('placeholder', 'Пошук...');
      app.DOM.searchBtn.textContent = 'знайсці';
    } else {
      feelsLike.textContent = 'Feels like: ';
      windLabel.textContent = 'Wind: ';
      humidityLabel.textContent = 'Humidity: ';
      windSpeedUnit.textContent = 'm/s';
      app.DOM.searchInput.setAttribute('placeholder', 'Find...');
      app.DOM.searchBtn.textContent = 'SEARCH';
    }
    app.DOM.language.textContent = label.toUpperCase();
    app.language = label;
    GET_COORDS(app.DOM.location.textContent, app.language)
      .then((res) => {
        const { city, country } = res;
        GET_WEATHER(res.lat, res.lng, app.language, app.units)
          .then((data) => {
            app.timeZone = data.timeZone;
            app.localTime = GET_TIME(app.timeZone, app.language);
            clearInterval(app.TIMER_ID);
            app.TIME_UPDATE(app.timeZone, app.language);
            RENDER(
              [
                app.DOM.location,
                app.DOM.date,
                app.DOM.summary,
                app.DOM.day_ONE,
                app.DOM.day_TWO,
                app.DOM.day_THREE,
              ],
              [
                `${city}, ${country}`,
                app.localTime.currentDate,
                data.summary,
                app.localTime.day_ONE,
                app.localTime.day_TWO,
                app.localTime.day_THREE,
              ],
            );
            if (app.DOM.location.textContent.length > 30) {
              app.DOM.location.style.fontSize = '38px';
            } else {
              app.DOM.location.style.fontSize = '45px';
            }
          });
      })
      .catch(() => {
        const MSG = 'The location you entered is invalid. Please try again.';
        SHOW_MODAL(app.GET_CURRENT_LOCATION_WEATHER, app, MSG, false);
      });
  });
};

const CHANGE_UNIT = (app = APP) => {
  const { unit } = app.DOM;
  unit.addEventListener('click', (e) => {
    app.currentTemp = app.DOM.temperature.textContent;
    unit.childNodes.forEach((el) => {
      if (el.nodeType === 1) {
        el.classList.remove('active');
      }
    });
    if (e.target.textContent === '°C') {
      app.units = 'si';
      app.DOM.temperature.textContent = app.mainCelsius;
      app.DOM.feelingTemp.textContent = app.apparentCelsius;
      app.DOM.day_ONE_TEMP.textContent = app.day1Celsius;
      app.DOM.day_TWO_TEMP.textContent = app.day2Celsius;
      app.DOM.day_THREE_TEMP.textContent = app.day3Celsius;
    } else {
      app.units = 'us';
      app.DOM.temperature.textContent = app.mainFahrenheit;
      app.DOM.feelingTemp.textContent = app.apparentFahreheit;
      app.DOM.day_ONE_TEMP.textContent = app.day1Fahrenheit;
      app.DOM.day_TWO_TEMP.textContent = app.day2Fahrenheit;
      app.DOM.day_THREE_TEMP.textContent = app.day3Fahrenheit;
    }
    if (e.target.className === 'unit__item') e.target.classList.add('active');
  });
};


const EVENTS = () => {
  APP.DOM.search.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherSearch();
  });
  APP.DOM.searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    weatherSearch();
  });
  APP.DOM.searchInput.addEventListener('focus', () => {
    APP.DOM.searchBtn.style.borderBottom = '1px solid #f2f8fd';
    APP.DOM.searchBtn.style.borderTop = '1px solid #f2f8fd';
    APP.DOM.searchBtn.style.borderRight = '1px solid #f2f8fd';
  });
  APP.DOM.searchInput.addEventListener('blur', () => {
    APP.DOM.searchBtn.style.borderBottom = '1px solid transparent';
    APP.DOM.searchBtn.style.borderTop = '1px solid transparent';
    APP.DOM.searchBtn.style.borderRight = '1px solid transparent';
  });

  APP.DOM.refresh.addEventListener('click', () => {
    APP.updateImage(APP.localTime.season, APP.localTime.isDayTime, APP.condition);
  });
};

export {
  CHANGE_LANG,
  CHANGE_UNIT,
  EVENTS,
};
