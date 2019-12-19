/* eslint-disable no-plusplus */
/**
 * RENDER value to DOM
 * @param {array} elem
 * @param {array} value
 */
const render = (elem, value) => {
  if (elem && value) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].textContent = `${value[i]}`;
    }
  }
};

const elems = {
  body: document.querySelector('body'),
  mainBG: document.createElement('div'),
  root: document.createElement('div'),
  wrapper: document.createElement('div'),
  darkLayer: document.createElement('div'),
  header: document.createElement('div'),
  control: document.createElement('div'),
  selectLang: document.createElement('div'),
  unit: document.createElement('div'),
  search: document.createElement('div'),
  weather: document.createElement('div'),
  map: document.createElement('div'),
  refresh: document.createElement('a'),
  loading: `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...`,
  spinner: '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>',
};

const fragment = document.createDocumentFragment();

const generateHTML = () => {
  elems.mainBG.classList.add('bg');
  elems.root.classList.add('root');
  elems.wrapper.classList.add('wrapper');
  elems.darkLayer.classList.add('darkLayer');
  elems.header.classList.add('header');
  elems.control.classList.add('control');
  elems.selectLang.classList.add('selectLang');
  elems.unit.classList.add('unit');
  elems.search.classList.add('search');
  elems.weather.classList.add('weather');
  elems.map.classList.add('map');
  elems.refresh.classList.add('control__item');
  elems.body.appendChild(elems.mainBG);
  elems.body.appendChild(elems.root);
  elems.root.appendChild(elems.wrapper);
  elems.wrapper.appendChild(elems.darkLayer);
  elems.wrapper.appendChild(elems.header);
  elems.header.appendChild(elems.control);
  elems.control.appendChild(elems.refresh);
  elems.control.appendChild(elems.selectLang);
  elems.control.appendChild(elems.unit);
  elems.header.appendChild(elems.search);
  elems.wrapper.appendChild(elems.weather);
  elems.wrapper.appendChild(elems.map);
  elems.refresh.innerHTML = '<span class="icon-refresh"></span>';
  elems.selectLang.innerHTML = `<div class="custom-select-wrapper">
              <div class="custom-style">
                <div class="custom-style__trigger"><span>EN</span>
                  <div class="arrow"></div>
                </div>
                <div class="custom-options">
                  <span class="custom-option selected" data-value="tesla">EN
                  </span>
                  <span class="custom-option" data-value="volvo">RU</span>
                  <span class="custom-option" data-value="mercedes">BE</span>
                </div>
              </div>
            </div>`;
  elems.unit.innerHTML = `
  <span class="unit__item active">&deg;C</span>
  <span class="unit__item">&deg;F</span>`;
  elems.search.innerHTML = `
          <div class="input-group">
            <div class="input-group-append voice">
              <button class="btn btn-outline-dark" id="voice-btn" type="button">
                <span class="icon-mic"></span></button>
            </div>
            <input aria-describedby="button-addon2" aria-label="Recipient's username" class="form-control"
              id="searchInput" placeholder="Search city or enter ZIP" type="text">
            <div class="input-group-append">
              <button class="btn btn-dark" id="search-btn" type="button">
                Search
              </button>
            </div>
          </div>`;
  elems.weather.innerHTML = `
  <div class="weather__location">
          ${elems.loading}
        </div>
        <div class="weather__date">--</div>
        <div class="weather__condition">
          <div class="weather__temperature"><span id="temperature">${elems.spinner}</span><span class="degSign">&#176;</span>
          </div>
          <div class="weather__description">
            <div class="weather__icon"><i class="wi wi-na"></i></div>
            <span class="weather__type">--</span>
            <span class="weather__feels">FEELS LIKE: <span><span id="feelingTemp">--</span>&deg;</span></span>
            <span class="weather__wind">WIND: <span id="windSpeed">--</span> <span style="text-transform: lowercase;">m/s</span></span>
            <span class="weather__humidity">Humidity: <span id="humidity">--</span></span>
          </div>
        </div>
        <div class="weather__forecast forecast">
          <div class="forecast__item">
            <span class="day" id="day_ONE">Tuesday</span>
            <span class="temperature"><span id="day_ONE_TEMP">--</span>&deg;<span class="weather__icon" id="day_ONE_ICON"><i></i></span></span>
            
          </div>
          <div class="forecast__item">
            <span class="day" id="day_TWO">Tuesday</span>
            <span class="temperature"><span id="day_TWO_TEMP">--</span>&deg;<span class="weather__icon" id="day_TWO_ICON"><i></i></span></span>
          </div>
          <div class="forecast__item">
            <span class="day" id="day_THREE">Tuesday</span>
            <span class="temperature"><span id="day_THREE_TEMP">--</span>&deg;<span class="weather__icon" id="day_THREE_ICON"><i></i></span></span>
          </div>
        </div>
  `;
};

export { render, generateHTML };
