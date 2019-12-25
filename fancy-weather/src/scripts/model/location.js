/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-console */


const GET_COORDS = async (address, language = 'en') => {
  const API_KEY = '81d6df3ae65b430aaa589e095c541a4e';
  const TRIMMED_ADDRESS = address.trim();
  const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';
  const QUERY = `?key=${API_KEY}&q=${TRIMMED_ADDRESS}&language=${language}&pretty=1&no_annotations=1`;
  try {
    const RESPONSE = await fetch(`${BASE_URL}${QUERY}`);
    const DATA = await RESPONSE.json();
    const LOCATION = DATA.results[0];
    const RESULT = {
      city: (LOCATION.components.city || LOCATION.components.county || LOCATION.components.state),
      country: LOCATION.components.country,
      lat: LOCATION.geometry.lat,
      lng: LOCATION.geometry.lng,
    };
    return RESULT;
  } catch {
    console.log('Invalid address');
  }
};

const GET_CURRENT_LOCATION = async (language = 'en') => {
  const API_KEY = '8487622489067e';
  const BASE_URL = `https://ipinfo.io?token=${API_KEY}`;
  try {
    const RESPONSE = await fetch(BASE_URL);
    const DATA = await RESPONSE.json();
    const CITY = await DATA.city;
    const COUNTRY = await DATA.country;
    const RESULT = await GET_COORDS(`${CITY}, ${COUNTRY}`, language);
    return RESULT;
  } catch {
    console.log('Incorrect parameter');
  }
};

export { GET_COORDS, GET_CURRENT_LOCATION };
