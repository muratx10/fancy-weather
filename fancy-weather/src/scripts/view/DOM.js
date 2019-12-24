/* eslint-disable no-plusplus */

/**
 * RENDER value to DOM
 * @param {array} elem
 * @param {array} value
 */
const RENDER = (elem, value) => {
  if (elem && value) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].textContent = `${value[i]}`;
    }
  }
};

const NODES = {
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
  mapContainer: document.createElement('div'),
  modalElem: document.createElement('div'),
  loading: `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...`,
  spinner: '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>',
  modal: `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalLabel">Invalid location</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="closeBtn">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        The location you entered is invalid. Please try again.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary closeBtn" 
                data-dismiss="modal" 
                id="closeBtn"
        >Close</button>
        <button type="button" class="btn btn-primary" 
                id="getCurrent">Get 
          weather for 
          current location</button>
      </div>
    </div>
  </div>`,
};

const GENERATE_HTML = () => {
  NODES.mainBG.classList.add('bg');
  NODES.modalElem.classList.add('modal', 'fade');
  NODES.modalElem.id = 'modal';
  NODES.modalElem.setAttribute('tabindex', '-1');
  NODES.modalElem.setAttribute('role', 'dialog');
  NODES.modalElem.setAttribute('aria-labelledby', 'ModalLabel');
  NODES.modalElem.setAttribute('aria-hidden', 'true');
  NODES.modalElem.innerHTML = NODES.modal;
  NODES.body.appendChild(NODES.modalElem);
  NODES.root.classList.add('root');
  NODES.wrapper.classList.add('wrapper');
  NODES.darkLayer.classList.add('darkLayer');
  NODES.header.classList.add('header');
  NODES.control.classList.add('control');
  NODES.selectLang.classList.add('selectLang');
  NODES.unit.classList.add('unit');
  NODES.search.classList.add('search');
  NODES.weather.classList.add('weather');
  NODES.map.classList.add('map');
  NODES.refresh.classList.add('control__item');
  NODES.body.appendChild(NODES.mainBG);
  NODES.body.appendChild(NODES.root);
  NODES.root.appendChild(NODES.wrapper);
  NODES.wrapper.appendChild(NODES.darkLayer);
  NODES.wrapper.appendChild(NODES.header);
  NODES.header.appendChild(NODES.control);
  NODES.control.appendChild(NODES.refresh);
  NODES.control.appendChild(NODES.selectLang);
  NODES.control.appendChild(NODES.unit);
  NODES.header.appendChild(NODES.search);
  NODES.wrapper.appendChild(NODES.weather);
  NODES.wrapper.appendChild(NODES.map);
  NODES.mapContainer.className = 'mapContainer';
  NODES.map.appendChild(NODES.mapContainer);
  NODES.refresh.innerHTML = '<span class="icon-refresh"></span>';
  NODES.selectLang.innerHTML = `<div class="custom-select-wrapper">
              <div class="custom-style">
                <div class="custom-style__trigger"><span>EN</span>
                  <div class="arrow"></div>
                </div>
                <div class="custom-options">
                  <span class="custom-option selected" data-value="en">EN</span>
                  <span class="custom-option" data-value="ru">RU</span>
                  <span class="custom-option" data-value="be">BE</span>
                </div>
              </div>
            </div>`;
  NODES.unit.innerHTML = `
  <span class="unit__item active" data-type="si">&deg;C</span>
  <span class="unit__item" data-type="us">&deg;F</span>`;
  NODES.search.innerHTML = `
        <form class="searchForm" autocomplete="off">        
          <div class="input-group">
            <div class="input-group-append voice">
              <button class="btn btn-outline-dark" id="voice-btn" type="button">
                <span class="icon-mic"></span></button>
            </div>
            <input pattern=".{3,}" required class="form-control"
              id="searchInput" placeholder="Search..." type="text">
            <div class="input-group-append">
              <button class="btn btn-dark" id="search-btn" type="button">
                Search
              </button>
            </div>
          </div>
        </form>`;
  NODES.weather.innerHTML = `
  <div class="weather__location">
          ${NODES.loading}
        </div>
        <div class="weather__date">--</div>
        <div class="weather__condition">
          <div class="weather__temperature"><span id="temperature">${NODES.spinner}</span><span class="degSign">&#176;</span>
          </div>
          <div class="weather__description">
            <div class="weather__icon"><i class="wi wi-na"></i></div>
            <span class="weather__type">--</span>
            <span class="weather__feels"> <span id="feelsLikeLabel">FEELS LIKE: </span><span><span id="feelingTemp">--</span>&deg;</span></span>
            <span class="weather__wind"><span id="windLabel">WIND: </span><span id="windSpeed">--</span> <span id="ms" style="text-transform: lowercase;">m/s</span></span>
            <span class="weather__humidity"><span id="humidityLabel">Humidity: </span><span id="humidity">--</span></span>
          </div>
        </div>
        <div class="weather__forecast forecast">
          <div class="forecast__item">
            <span class="day" id="day_ONE">--</span>
            <span class="temperature"><span id="day_ONE_TEMP">--</span>&deg;<span class="weather__icon" id="day_ONE_ICON"><i></i></span></span>
            
          </div>
          <div class="forecast__item">
            <span class="day" id="day_TWO">--</span>
            <span class="temperature"><span id="day_TWO_TEMP">--</span>&deg;<span class="weather__icon" id="day_TWO_ICON"><i></i></span></span>
          </div>
          <div class="forecast__item">
            <span class="day" id="day_THREE">--</span>
            <span class="temperature"><span id="day_THREE_TEMP">--</span>&deg;<span class="weather__icon" id="day_THREE_ICON"><i></i></span></span>
          </div>
        </div>
  `;
};

const SHOW_MODAL = (callback, arg, message, inactiveBTN) => {
  const body = document.querySelector('body');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelectorAll('.closeBtn');
  const backDrop = document.createElement('div');
  const messageText = document.querySelector('.modal-body');
  if (message) messageText.textContent = message;
  if (inactiveBTN) {
    closeBtn.forEach((i) => {
      i.classList.add('disabled');
      i.style.cursor = 'not-allowed';
    });
  } else {
    closeBtn.forEach((i) => {
      i.classList.remove('disabled');
      i.style.cursor = 'pointer';
    });
  }
  backDrop.className = 'modal-backdrop fade show';
  body.appendChild(backDrop);
  body.classList.add('modal-open');
  modal.classList.add('show');
  modal.style.display = 'block';
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('closeBtn') && !e.target.classList.contains('disabled')) {
      body.classList.remove('modal-open');
      modal.classList.remove('show');
      modal.style.display = 'none';
      backDrop.remove();
    } else if (e.target.id === 'getCurrent') {
      callback(arg);
      body.classList.remove('modal-open');
      modal.classList.remove('show');
      modal.style.display = 'none';
      backDrop.remove();
    }
  });
};

export { RENDER, GENERATE_HTML, SHOW_MODAL };
