/**
 * @param {string} location
 * @param {string} geoCoords
 * @param {string} backgroundURL
 * @param {object} summary
 * @param {object} forecast
 */

export default class weatherApp {
  constructor(location, geoCoords, backgroundURL, summary, forecast) {
    this.language = 'EN';
    this.unit = 'metric';
    this.location = location;
    this.geoCoords = geoCoords;
    this.backgroundURL = backgroundURL;
    this.summary = summary;
    this.forecast = forecast;
  }
}
