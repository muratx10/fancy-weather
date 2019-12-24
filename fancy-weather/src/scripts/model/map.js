import ymaps from 'ymaps';
import { APP } from './components';

const CONVERT_COORDS = (coords) => `${Math.trunc(coords)}&deg;${Math.trunc((coords % 1) * 60)}'`;

function createMap(lat, lng, app = APP) {
  const MAP_LANG = app.language === 'en' ? 'en-US' : 'ru-RU';
  const API_KEY = '4dcb72b9-3a08-438b-9ebe-9844ac8379f4';
  const mapContainer = document.querySelector('.mapContainer');
  ymaps
    .load(`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=${MAP_LANG}`)
    .then(maps => {
      app.map = new maps.Map(mapContainer, {
        center: [lat, lng],
        zoom: 11,
        controls: ['zoomControl'],
      });
      app.map.behaviors.disable('scrollZoom');
      const coordsContainer = document.createElement('p');
      coordsContainer.className = 'coordsContainer';
      coordsContainer.innerHTML = `${CONVERT_COORDS(lat)}&nbsp; &nbsp;${CONVERT_COORDS(lng)}`;
      app.DOM.map.appendChild(coordsContainer);
      app.DOM.decimalCoords = coordsContainer;
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));
}

function changeMap(lat, lng, app = APP) {
  app.map.setCenter([lat, lng], 11);
  app.DOM.decimalCoords.innerHTML = `${CONVERT_COORDS(lat)}&nbsp; &nbsp;${CONVERT_COORDS(lng)}`;
}

export { createMap, changeMap };
