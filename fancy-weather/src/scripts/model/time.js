const getTime = (zone, lang) => {
  // let timeCurrent = new Date(localStorage.getItem('time') * 1000);
  const weekdaysBe = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
  const weekdaysBeShort = ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'];
  const monthsBe = ['cтудзеня', 'лютага', 'сакавіка', 'красавіка', 'мая', 'чэрвеня', 'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'];
  const localDate = new Date().toLocaleString('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: zone,
  });
  const localDay = new Date().toLocaleString('en', {
    day: 'numeric',
    timeZone: zone,
  });
  const localDateShort = new Date().toLocaleString('ru', {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: zone,
  });

  const msDay = 86400000;
  let timeFirst = new Date(Date.parse(localDate) + msDay);
  let timeSecond = new Date(Date.parse(localDate) + msDay * 2); //2 days forth
  let timeThird = new Date(Date.parse(localDate) + msDay * 3); //3 days forth

  let timeString = '';
  let timeFirstString = '';
  let timeSecondString = '';
  let timeThirdString = '';

  if (lang === 'be') {
    timeString = `${weekdaysBeShort[new Date(Date.parse(localDate)).getDay()]} ${localDay} ${monthsBe[new Date(Date.parse(localDate)).getMonth()]} ${localDateShort}`;
    timeFirstString = weekdaysBe[timeFirst.getDay()];
    timeSecondString = weekdaysBe[timeSecond.getDay()];
    timeThirdString = weekdaysBe[timeThird.getDay()];
  } else {
    timeString = new Date().toLocaleString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: zone,
    });
    timeFirstString = timeFirst.toLocaleString(lang, {
      weekday: 'long',
    });
    timeSecondString = timeSecond.toLocaleString(lang, {
      weekday: 'long',
    });
    timeThirdString = timeThird.toLocaleString(lang, {
      weekday: 'long',
    });
  }

  if (lang === 'ru') {
    timeString = timeString.charAt(0).toUpperCase() + timeString.slice(1);
    timeFirstString = timeFirstString.charAt(0).toUpperCase() + timeFirstString.slice(1);
    timeSecondString = timeSecondString.charAt(0).toUpperCase() + timeSecondString.slice(1);
    timeThirdString = timeThirdString.charAt(0).toUpperCase() + timeThirdString.slice(1);
  }

  const currentHour = new Date(timeString.replace(/,/g, '')).getHours();

  const time = {
    currentDate: timeString.replace(/,/g, ''),
    hour: currentHour,
    day_ONE: timeFirstString,
    day_TWO: timeSecondString,
    day_THREE: timeThirdString,
  };

  return time;
};

// setInterval(getTime, 60000);
export default getTime;
