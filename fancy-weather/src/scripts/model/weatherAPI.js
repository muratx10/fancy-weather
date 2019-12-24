/* eslint-disable no-console */
const GET_WEATHER = async (lat, lng, lang, units) => {
  const PROXY_URL = 'https://stark-anchorage-11922.herokuapp.com/';
  const API_KEY = 'a60d9b3e45920652290285265c18f647';
  const BASE_URL = 'https://api.darksky.net/forecast/';
  const REQUEST_URL = `${PROXY_URL}${BASE_URL}${API_KEY}/${lat},${lng}?lang=${lang}&units=${units}`;
  try {
    const RESPONSE = await fetch(REQUEST_URL);
    const DATA = await RESPONSE.json();
    const CURRENT = DATA.currently;
    const FORECAST = DATA.daily.data;
    const INFO = {
      humidity: `${((CURRENT.humidity).toFixed(2) * 100).toFixed(0)}%`,
      icon: CURRENT.icon,
      summary: CURRENT.summary,
      temperature: Math.trunc(CURRENT.temperature),
      time: CURRENT.time,
      windSpeed: Math.trunc(CURRENT.windSpeed),
      timeZone: DATA.timezone,
      apparentTemp: Math.trunc(CURRENT.apparentTemperature),
      daily: {
        day_1: {
          time: FORECAST[1].time,
          icon: FORECAST[1].icon,
          temperature: Math.trunc(FORECAST[1].temperatureHigh),
        },
        day_2: {
          time: FORECAST[2].time,
          icon: FORECAST[2].icon,
          temperature: Math.trunc(FORECAST[2].temperatureHigh),
        },
        day_3: {
          time: FORECAST[3].time,
          icon: FORECAST[3].icon,
          temperature: Math.trunc(FORECAST[3].temperatureHigh),
        },
      },
    };
    return INFO;
  } catch (error) {
    console.error(error);
  }
};

export default GET_WEATHER;
