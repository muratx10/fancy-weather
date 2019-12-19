/* eslint-disable no-console */
import '../styles/styles.scss';
import selectOption from './view/customSelect';
import { GET_COORDS, GET_CURRENT_LOCATION } from './model/location';
import GET_WEATHER from './model/weatherAPI';
import { render, generateHTML } from './view/DOM';
import getTime from './model/time';
import GET_ICONS from './model/components';

class WeatherApp {
  constructor() {
    this.language = 'en';
    this.units = 'si';
    this.lat = null;
    this.lng = null;
    this.backgroundURL = null;
    this.forecast = null;
    this.DOM = null;
    this.timeZone = null;
    this.hour = null;
  }

  init() {
    generateHTML();
    selectOption();
    this.DOM = {
      lang: document.querySelector('.selectLang'),
      unit: document.querySelector('.unit'),
      searchInput: document.getElementById('searchInput'),
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
    };
    GET_CURRENT_LOCATION(this.language)
      .then((response) => {
        const { city, country } = response;
        GET_WEATHER(response.latitude, response.longitude, this.language, this.units)
          .then((data) => {
            console.log(data);
            this.timeZone = data.timeZone;
            this.localTime = getTime(this.timeZone, this.language);
            this.hour = getTime(this.timeZone, this.language).hour;
            this.timeUpdate(this.timeZone, this.language);
            render(
              [
                this.DOM.location,
                this.DOM.date,
                this.DOM.temperature,
                this.DOM.feelingTemp,
                this.DOM.summary,
                this.DOM.humidity,
                this.DOM.windSpeed,
                this.DOM.day_ONE,
                this.DOM.day_ONE_TEMP,
                this.DOM.day_TWO,
                this.DOM.day_TWO_TEMP,
                this.DOM.day_THREE,
                this.DOM.day_THREE_TEMP,
              ],
              [
                `${city}, ${country}`,
                this.localTime.currentDate,
                data.temperature,
                data.apparentTemp,
                data.summary,
                data.humidity,
                data.windSpeed,
                this.localTime.day_ONE,
                data.daily.day_1.temperature,
                this.localTime.day_TWO,
                data.daily.day_2.temperature,
                this.localTime.day_THREE,
                data.daily.day_3.temperature,
              ],
            );
            document.querySelector('.degSign').style.display = 'inline';
            this.DOM.icon.className = GET_ICONS(this.hour)[data.icon];
            this.DOM.day_ONE_ICON.className = GET_ICONS(this.hour)[data.daily.day_1.icon];
            this.DOM.day_TWO_ICON.className = GET_ICONS(this.hour)[data.daily.day_2.icon];
            this.DOM.day_THREE_ICON.className = GET_ICONS(this.hour)[data.daily.day_3.icon];
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  timeUpdate(zone, lang) {
    const timeZone = zone;
    const language = lang;
    const element = this.DOM.date;
    const timerID = setInterval(() => {
      element.textContent = getTime(timeZone, language).currentDate;
    }, 30000);
  }
}

const weather = new WeatherApp();
weather.init();
