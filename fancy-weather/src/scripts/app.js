/* eslint-disable no-console */
import '../styles/styles.scss';
import selectOption from './view/customSelect';
import { GET_COORDS, GET_CURRENT_LOCATION } from './model/location';
import GET_WEATHER from './model/weatherAPI';

selectOption();

/**
 * @param {string} location
 * @param {string} geoCoords
 * @param {string} backgroundURL
 * @param {object} summary
 * @param {object} forecast
 */
class WeatherApp {
  constructor() {
    this.language = 'ru';
    this.unit = '';
    this.lat = '';
    this.lng = '';
    this.backgroundURL = '';
    this.forecast = '';
  }

  init() {
    GET_CURRENT_LOCATION()
      .then((response) => {
        GET_WEATHER(response.latitude, response.longitude, this.language)
          .then((data) => {
            console.log(data);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const test = new WeatherApp();
test.init();


// console.log(GET_WEATHER(lat, lng, 'ru').then(res => {
//   console.log(res);
// })
//   .catch(err => {
//     console.log(err);
//   }));
