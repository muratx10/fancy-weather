import { APP } from './components';

const MSG = (lang = APP.language) => {
  const TEXT = {
    title: {
      en: 'Invalid location',
      ru: 'Неверное местоположение',
      be: 'Несапраўднае месцазнаходжанне',
    },
    err: {
      en: 'The location you entered is invalid. Please try again.',
      ru: 'Введенное Вами местоположение неверно. Пожалуйста, попробуйте еще раз.',
      be: 'Месца, якое вы ўвялі, несапраўднае. Калі ласка, паспрабуйце яшчэ раз.',
    },
    close: {
      en: 'Close',
      ru: 'Закрыть',
      be: 'Зачыніць',
    },
    action: {
      en: 'Get weather for current location',
      ru: 'Получить погоду для текущего местоположения',
      be: 'Атрымаць надвор\'е для бягучага месцазнаходжання',
    }
  };
  const RESULT = {
    title: null,
    err: null,
    close: null,
    action: null,
  };
  switch (lang) {
    case 'en':
      RESULT.title = TEXT.title.en;
      RESULT.err = TEXT.err.en;
      RESULT.close = TEXT.close.en;
      RESULT.action = TEXT.action.en;
      break;
    case 'ru':
      RESULT.title = TEXT.title.ru;
      RESULT.err = TEXT.err.ru;
      RESULT.close = TEXT.close.ru;
      RESULT.action = TEXT.action.ru;
      break;
    case 'be':
      RESULT.title = TEXT.title.be;
      RESULT.err = TEXT.err.be;
      RESULT.close = TEXT.close.be;
      RESULT.action = TEXT.action.be;
      break;
    default:
      RESULT.title = TEXT.title.en;
      RESULT.err = TEXT.err.en;
      RESULT.close = TEXT.close.en;
      RESULT.action = TEXT.action.en;
  }
  return RESULT;
};

const SHOW_MODAL = (callback, arg, inactiveBTN) => {
  const LABEL = MSG();
  const body = document.querySelector('body');
  const modal = document.getElementById('modal');
  const backDrop = document.createElement('div');
  const messageText = document.querySelector('.modal-body');
  const title = document.getElementById('ModalLabel');
  const closeBtn = document.querySelectorAll('.closeBtn');
  const actionBtn = document.getElementById('getCurrent');
  if (LABEL) {
    messageText.textContent = LABEL.err;
    title.textContent = LABEL.title;
    closeBtn.textContent = LABEL.close;
    actionBtn.textContent = LABEL.action;
  }
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

export default SHOW_MODAL;
