const API_KEY = '3ec6babd8ab7bb3d860246e52e49cd3a9578091420e232f79e8a55af74b846d6';

// eslint-disable-next-line consistent-return
const GET_IMAGE = async (season, dayTime, weatherCondition) => {
  const PROXY_URL = 'https://stark-anchorage-11922.herokuapp.com/';
  const TIME = dayTime ? 'day' : 'night';
  const BASE_URL = `https://api.unsplash.com/photos/random`;
  const QUERY = `?query=${season} ${TIME} ${weatherCondition}&client_id=${API_KEY}`;
  try {
    const RES = await fetch(`${BASE_URL}${QUERY}`);
    const DATA = await RES.json();
    return DATA.urls.regular;
  } catch (err) {
    const DEFAULT_IMG = 'https://dl.dropbox.com/s/32evziltnzla5xd/default.jpg';
    return DEFAULT_IMG;
  }
};

export default GET_IMAGE;
