import selectOption from '../view/customSelect';
import { GET_CURRENT_LOCATION } from './location';
import GET_WEATHER from './weatherAPI';
import { RENDER, GENERATE_HTML } from '../view/DOM';
import GET_TIME from './time';
import GET_IMAGE from './getImage';
import TEMP_CONVERT from './degreeConverter';
import { createMap } from './map';

const GET_ICONS = (hour) => {
  const ICONS_DAY = {
    'clear-day': 'wi wi-day-sunny',
    'clear-night': 'wi wi-stars',
    'partly-cloudy-day': 'wi wi-day-cloudy',
    'partly-cloudy-night': 'wi wi-night-alt-cloudy',
    rain: 'wi wi-day-rain',
    snow: 'wi wi-day-snow',
    sleet: 'wi wi-day-sleet',
    wind: 'wi wi-day-windy',
    fog: 'wi wi-day-fog',
    cloudy: 'wi wi-cloudy',
    notAvailable: 'wi wi-na',
    dayTime: 'day',
  };

  const ICONS_NIGHT = {
    'clear-day': 'wi wi-stars',
    'clear-night': 'wi wi-stars',
    'partly-cloudy-night': 'wi wi-night-alt-cloudy',
    'partly-cloudy-day': 'wi wi-day-cloudy',
    rain: 'wi wi-night-rain',
    snow: 'wi wi-night-snow',
    sleet: 'wi wi-night-sleet',
    wind: 'wi wi-night-cloudy-gusts',
    fog: 'wi wi-night-fog',
    cloudy: 'wi wi-cloudy',
    notAvailable: 'wi wi-na',
    dayTime: 'night',
  };

  if (hour > 7 && hour < 19) {
    return ICONS_DAY;
  }
  return ICONS_NIGHT;
};

class WEATHER_APP {
  constructor() {
    this.language = 'en';
    this.units = 'si';
    this.celsius = null;
    this.fahrenheit = null;
    this.lat = null;
    this.lng = null;
    this.DOM = null;
    this.timeZone = null;
    this.hour = null;
    this.isDayTime = null;
  }

  init() {
    GENERATE_HTML();
    selectOption();
    this.DOM = {
      map: document.querySelector('.map'),
      langSelect: document.querySelectorAll('.custom-option'),
      refresh: document.querySelector('.icon-refresh'),
      modal: document.getElementById('modal'),
      lang: document.querySelector('.selectLang'),
      unit: document.querySelector('.unit'),
      unit_item: document.querySelectorAll('.unit__item'),
      languageLabel: document.querySelector('.custom-style__trigger span'),
      search: document.querySelector('.searchForm'),
      searchInput: document.querySelector('#searchInput'),
      searchBtn: document.getElementById('search-btn'),
      location: document.querySelector('.weather__location'),
      date: document.querySelector('.weather__date'),
      temperature: document.getElementById('temperature'),
      feelingTemp: document.getElementById('feelingTemp'),
      summary: document.querySelector('.weather__type'),
      humidity: document.getElementById('humidity'),
      windSpeed: document.getElementById('windSpeed'),
      icon: document.querySelector('.weather__icon i'),
      day_ONE: document.getElementById('day_ONE'),
      day_ONE_TEMP: document.getElementById('day_ONE_TEMP'),
      day_ONE_ICON: document.querySelector('#day_ONE_ICON i'),
      day_TWO: document.getElementById('day_TWO'),
      day_TWO_TEMP: document.getElementById('day_TWO_TEMP'),
      day_TWO_ICON: document.querySelector('#day_TWO_ICON i'),
      day_THREE: document.getElementById('day_THREE'),
      day_THREE_TEMP: document.getElementById('day_THREE_TEMP'),
      day_THREE_ICON: document.querySelector('#day_THREE_ICON i'),
      mainBackground: document.querySelector('.wrapper'),
      blurryBackground: document.querySelector('.bg'),
      language: document.querySelector('.custom-style__trigger span'),
      selectedLang: document.querySelector('.custom-options'),
    };
    this.language = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
    this.units = localStorage.getItem('unit') ? localStorage.getItem('unit') : 'si';
    this.DOM.langSelect.forEach((el) => {
      el.classList.remove('selected');
      if (el.dataset.value === this.language) {
        el.classList.add('selected');
        this.DOM.languageLabel.textContent = this.language.toUpperCase();
      }
    });
    this.DOM.unit_item.forEach((el) => {
      if (this.units === el.dataset.type) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  GET_CURRENT_LOCATION_WEATHER(obj = this) {
    const app = obj;
    GET_CURRENT_LOCATION(app.language)
      .then((response) => {
        const { city, country } = response;
        createMap(response.lat, response.lng);
        GET_WEATHER(response.lat, response.lng, app.language, app.units)
          .then((data) => {
            app.condition = data.icon;
            if (app.units === 'si') {
              app.mainCelsius = data.temperature;
              app.apparentCelsius = data.apparentTemp;
              app.mainFahrenheit = TEMP_CONVERT('toF', data.temperature);
              app.apparentFahreheit = TEMP_CONVERT('toF', data.apparentTemp);
              app.day1Celsius = data.daily.day_1.temperature;
              app.day1Fahrenheit = TEMP_CONVERT('toF', data.daily.day_1.temperature);
              app.day2Celsius = data.daily.day_2.temperature;
              app.day2Fahrenheit = TEMP_CONVERT('toF', data.daily.day_2.temperature);
              app.day3Celsius = data.daily.day_3.temperature;
              app.day3Fahrenheit = TEMP_CONVERT('toF', data.daily.day_3.temperature);
            } else if (app.units === 'us') {
              app.mainFahrenheit = data.temperature;
              app.apparentFahreheit = data.apparentTemp;
              app.mainCelsius = TEMP_CONVERT('toC', data.temperature);
              app.apparentCelsius = TEMP_CONVERT('toC', data.apparentTemp);
              app.day1Celsius = TEMP_CONVERT('toC', data.daily.day_1.temperature);
              app.day1Fahrenheit = data.daily.day_1.temperature;
              app.day2Celsius = TEMP_CONVERT('toC', data.daily.day_2.temperature);
              app.day2Fahrenheit = data.daily.day_2.temperature;
              app.day3Celsius = TEMP_CONVERT('toC', data.daily.day_3.temperature);
              app.day3Fahrenheit = data.daily.day_3.temperature;
            }
            app.timeZone = data.timeZone;
            app.localTime = GET_TIME(app.timeZone, app.language);
            app.hour = app.localTime.hour;
            clearInterval(app.TIMER_ID);
            app.TIME_UPDATE(app.timeZone, app.language);
            RENDER(
              [
                app.DOM.location,
                app.DOM.date,
                app.DOM.temperature,
                app.DOM.feelingTemp,
                app.DOM.summary,
                app.DOM.humidity,
                app.DOM.windSpeed,
                app.DOM.day_ONE,
                app.DOM.day_ONE_TEMP,
                app.DOM.day_TWO,
                app.DOM.day_TWO_TEMP,
                app.DOM.day_THREE,
                app.DOM.day_THREE_TEMP,
              ],
              [
                `${city}, ${country}`,
                app.localTime.currentDate,
                data.temperature,
                data.apparentTemp,
                data.summary,
                data.humidity,
                data.windSpeed,
                app.localTime.day_ONE,
                data.daily.day_1.temperature,
                app.localTime.day_TWO,
                data.daily.day_2.temperature,
                app.localTime.day_THREE,
                data.daily.day_3.temperature,
              ],
            );
            document.querySelector('.degSign').style.display = 'inline';
            app.DOM.icon.className = GET_ICONS(app.hour, app)[data.icon];
            app.DOM.day_ONE_ICON.className = GET_ICONS(app.hour, app)[data.daily.day_1.icon];
            app.DOM.day_TWO_ICON.className = GET_ICONS(app.hour, app)[data.daily.day_2.icon];
            app.DOM.day_THREE_ICON.className = GET_ICONS(app.hour, app)[data.daily.day_3.icon];
            app.updateImage(app.localTime.season, app.localTime.isDayTime, app.condition);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  TIME_UPDATE(zone, lang) {
    const ELEMENT = this.DOM.date;
    this.TIMER_ID = setInterval(timer, 30000);
    function timer() {
      ELEMENT.textContent = GET_TIME(zone, lang).currentDate;
    }
  }

  updateImage(season, dayTime, weatherCondition) {
    GET_IMAGE(season, dayTime, weatherCondition)
      .then((res) => {
        this.DOM.mainBackground.style.backgroundImage = `url("${res}"`;
        this.DOM.blurryBackground.style.backgroundImage = `url("${res}"`;
      });
  }
}

const APP = new WEATHER_APP();
APP.init();
APP.GET_CURRENT_LOCATION_WEATHER();

export { APP, GET_ICONS };
