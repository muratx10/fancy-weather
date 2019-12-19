const GET_ICONS = (hour) => {
  const ICONS_DAY = {
    'clear-day': 'wi wi-day-sunny',
    'partly-cloudy-day': 'wi wi-day-cloudy',
    rain: 'wi wi-day-rain',
    snow: 'wi wi-day-snow',
    sleet: 'wi wi-day-sleet',
    wind: 'wi wi-day-windy',
    fog: 'wi wi-day-fog',
    cloudy: 'wi wi-cloudy',
    notAvailable: 'wi wi-na',
  };

  const ICONS_NIGHT = {
    'clear-day': 'wi wi-stars',
    'clear-night': 'wi wi-stars',
    'partly-cloudy-night': 'wi wi-night-alt-cloudy',
    rain: 'wi wi-night-rain',
    snow: 'wi wi-night-snow',
    sleet: 'wi wi-night-sleet',
    wind: 'wi wi-night-cloudy-gusts',
    fog: 'wi wi-night-fog',
    cloudy: 'wi wi-cloudy',
    notAvailable: 'wi wi-na',
  };

  if (hour > 7 && hour < 19) return ICONS_DAY;
  return ICONS_NIGHT;
};

export default GET_ICONS;
