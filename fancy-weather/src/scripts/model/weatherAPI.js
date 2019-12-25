/* eslint-disable no-console */
import CONVERT from './degreeConverter';

const GET_WEATHER = async (lat, lng, lang) => {
  const PROXY_URL = 'https://stark-anchorage-11922.herokuapp.com/';
  const API_KEY = 'a60d9b3e45920652290285265c18f647';
  const BASE_URL = 'https://api.darksky.net/forecast/';
  const REQUEST_URL = `${PROXY_URL}${BASE_URL}${API_KEY}/${lat},${lng}?lang=${lang}&units=si`;
  try {
    const RESPONSE = await fetch(REQUEST_URL);
    const DATA = await RESPONSE.json();
    const CURRENT = DATA.currently;
    const FORECAST = DATA.daily.data;
    const INFO = {
      temp: {
        C: {
          current: Math.trunc(CURRENT.temperature),
          apparent: Math.trunc(CURRENT.apparentTemperature),
          day_1: Math.trunc(FORECAST[1].temperatureHigh),
          day_2: Math.trunc(FORECAST[2].temperatureHigh),
          day_3: Math.trunc(FORECAST[3].temperatureHigh),
        },
        F: {
          current: CONVERT('toF', Math.trunc(CURRENT.temperature)),
          apparent: CONVERT('toF', Math.trunc(CURRENT.apparentTemperature)),
          day_1: CONVERT('toF', Math.trunc(FORECAST[1].temperatureHigh)),
          day_2: CONVERT('toF', Math.trunc(FORECAST[2].temperatureHigh)),
          day_3: CONVERT('toF', Math.trunc(FORECAST[3].temperatureHigh)),
        },
      },
      icons: {
        current: CURRENT.icon,
        day_1: FORECAST[1].icon,
        day_2: FORECAST[2].icon,
        day_3: FORECAST[3].icon,
      },
      currState: {
        summary: CURRENT.summary,
        humidity: `${((CURRENT.humidity).toFixed(2) * 100).toFixed(0)}%`,
        windSpeed: Math.trunc(CURRENT.windSpeed),
        timeZone: DATA.timezone,
      },
    };
    return INFO;
  } catch (error) {
    console.error(error);
  }
};

export default GET_WEATHER;
