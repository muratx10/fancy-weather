import { APP } from '../model/components';
import { GET_COORDS } from '../model/location';
import GET_WEATHER from '../model/weatherAPI';
import GET_TIME from '../model/time';
import { RENDER } from '../view/DOM';
import weatherSearch from './controller';
import SHOW_MODAL from '../model/modalWindow';

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
            app.weatherData = data;
            app.localTime = GET_TIME(app.weatherData.currState.timeZone, app.language);
            clearInterval(app.TIMER_ID);
            app.TIME_UPDATE(app.weatherData.currState.timeZone, app.language);
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
                app.weatherData.currState.summary,
                app.localTime.day_ONE,
                app.localTime.day_TWO,
                app.localTime.day_THREE,
              ],
            );
            if (app.DOM.location.textContent.length > 30) {
              app.DOM.location.style.fontSize = '2.375rem';
            } else {
              app.DOM.location.style.fontSize = '2.8125rem';
            }
          });
      })
      .catch(() => {
        SHOW_MODAL(app.GET_CURRENT_LOCATION_WEATHER, app, false);
      });
  });
};

const CHANGE_UNIT = (app = APP) => {
  const { unit } = app.DOM;
  unit.addEventListener('click', (e) => {
    unit.childNodes.forEach((el) => {
      if (el.nodeType === 1) {
        el.classList.remove('active');
      }
    });
    if (e.target.dataset.type === 'si') {
      app.units = 'si';
      app.DOM.temperature.textContent = app.weatherData.temp.C.current;
      app.DOM.feelingTemp.textContent = app.weatherData.temp.C.apparent;
      app.DOM.day_ONE_TEMP.textContent = app.weatherData.temp.C.day_1;
      app.DOM.day_TWO_TEMP.textContent = app.weatherData.temp.C.day_2;
      app.DOM.day_THREE_TEMP.textContent = app.weatherData.temp.C.day_3;
    } else {
      app.units = 'us';
      app.DOM.temperature.textContent = app.weatherData.temp.F.current;
      app.DOM.feelingTemp.textContent = app.weatherData.temp.F.apparent;
      app.DOM.day_ONE_TEMP.textContent = app.weatherData.temp.F.day_1;
      app.DOM.day_TWO_TEMP.textContent = app.weatherData.temp.F.day_2;
      app.DOM.day_THREE_TEMP.textContent = app.weatherData.temp.F.day_3;
    }
    if (e.target.className === 'unit__item') e.target.classList.add('active');
  });
};


const EVENTS = () => {
  APP.DOM.searchForm.addEventListener('submit', (e) => {
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
    APP.updateImage(APP.localTime.season, APP.localTime.isDayTime, APP.weatherData.icons.current);
  });

  const UID = {
    _current: 0,
    getNew() {
      this._current++;
      return this._current;
    },
  };

  HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
    const _this = this;
    const _sheetId = 'pseudoStyles';
    const _head = document.head || document.getElementsByTagName('head')[0];
    const _sheet = document.getElementById(_sheetId) || document.createElement('style');
    _sheet.id = _sheetId;
    const className = `pseudoStyle${UID.getNew()}`;
    _this.className += ` ${className}`;
    _sheet.innerHTML += ` .${className}:${element}{${prop}:${value}}`;
    _head.appendChild(_sheet);
    return this;
  };

  APP.DOM.refresh.addEventListener('click', () => {
    APP.DOM.refresh.pseudoStyle('before', 'animation', 'rotateIcon 1s ease');
    // eslint-disable-next-line no-use-before-define
    const TIMER = setTimeout(removeAnimation, 2000);
    function removeAnimation() {
      APP.DOM.refresh.pseudoStyle('before', 'animation', 'unset');
      clearTimeout(TIMER);
    }
  });

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lang', APP.language);
    localStorage.setItem('unit', APP.units);
  });
};

export {
  CHANGE_LANG,
  CHANGE_UNIT,
  EVENTS,
};
