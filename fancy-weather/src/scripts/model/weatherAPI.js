const GET_WEATHER = async (lat, lng, lang) => {
  const PROXY_URL = 'https://stark-anchorage-11922.herokuapp.com/';
  const API_KEY = 'a60d9b3e45920652290285265c18f647';
  const BASE_URL = 'https://api.darksky.net/forecast/';
  const REQUEST_URL = `${PROXY_URL}${BASE_URL}${API_KEY}/${lat},${lng}?lang=${lang}`;
  console.log(REQUEST_URL);
  try {
    const RESPONSE = await fetch(REQUEST_URL);
    const DATA = await RESPONSE.json();
    console.log(DATA);

  } catch (error) {
    console.error(error);
  }
};

export default GET_WEATHER;
