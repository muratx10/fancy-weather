const GET_TIME = (zone, lang) => {
  const WEEKDAY_BEL = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
  const WEEKDAY_BEL_SHORT = ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'];
  const MONTHS_BEL = ['cтудзеня', 'лютага', 'сакавіка', 'красавіка', 'мая', 'чэрвеня', 'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'];
  const LOCAL_DATE = new Date().toLocaleString('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: zone,
  });
  const LOCAL_DAY = new Date().toLocaleString('en', {
    day: 'numeric',
    timeZone: zone,
  });
  const LOCAL_DATE_SHORT = new Date().toLocaleString('ru', {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: zone,
  });

  const DAY_MS = 86400000;
  const DAY_ONE = new Date(Date.parse(LOCAL_DATE) + DAY_MS);
  const DAY_TWO = new Date(Date.parse(LOCAL_DATE) + DAY_MS * 2);
  const DAY_THREE = new Date(Date.parse(LOCAL_DATE) + DAY_MS * 3);

  let MAIN_DATE = '';
  let DAY_ONE_DATE = '';
  let DAY_TWO_DATE = '';
  let DAY_THREE_DATE = '';

  if (lang === 'be') {
    MAIN_DATE = `${WEEKDAY_BEL_SHORT[new Date(Date.parse(LOCAL_DATE)).getDay()]} ${LOCAL_DAY} ${MONTHS_BEL[new Date(Date.parse(LOCAL_DATE)).getMonth()]} ${LOCAL_DATE_SHORT}`;
    DAY_ONE_DATE = WEEKDAY_BEL[DAY_ONE.getDay()];
    DAY_TWO_DATE = WEEKDAY_BEL[DAY_TWO.getDay()];
    DAY_THREE_DATE = WEEKDAY_BEL[DAY_THREE.getDay()];
  } else {
    MAIN_DATE = new Date().toLocaleString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: zone,
    });
    DAY_ONE_DATE = DAY_ONE.toLocaleString(lang, {
      weekday: 'long',
    });
    DAY_TWO_DATE = DAY_TWO.toLocaleString(lang, {
      weekday: 'long',
    });
    DAY_THREE_DATE = DAY_THREE.toLocaleString(lang, {
      weekday: 'long',
    });
  }

  if (lang === 'ru') {
    MAIN_DATE = MAIN_DATE.charAt(0).toUpperCase() + MAIN_DATE.slice(1);
    DAY_ONE_DATE = DAY_ONE_DATE.charAt(0).toUpperCase() + DAY_ONE_DATE.slice(1);
    DAY_TWO_DATE = DAY_TWO_DATE.charAt(0).toUpperCase() + DAY_TWO_DATE.slice(1);
    DAY_THREE_DATE = DAY_THREE_DATE.charAt(0).toUpperCase() + DAY_THREE_DATE.slice(1);
  }

  const CURRENT_DATE = new Date(new Date().toLocaleString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: zone,
  }));
  const isDayTime = CURRENT_DATE.getHours() > 7 && CURRENT_DATE.getHours() < 19;
  const SEASONS = {
    winter: [11, 0, 1],
    spring: [2, 3, 4],
    summer: [5, 6, 7],
    autumn: [8, 9, 10],
  };

  let SEASON_NAME = null;
  Object.keys(SEASONS).forEach((item) => {
    if (SEASONS[item].includes(CURRENT_DATE.getMonth())) {
      SEASON_NAME = item;
    }
  });

  const TIME = {
    currentDate: MAIN_DATE.replace(/,/g, ''),
    hour: CURRENT_DATE,
    season: SEASON_NAME,
    isDayTime: isDayTime,
    day_ONE: DAY_ONE_DATE,
    day_TWO: DAY_TWO_DATE,
    day_THREE: DAY_THREE_DATE,
  };

  return TIME;
};

export default GET_TIME;
