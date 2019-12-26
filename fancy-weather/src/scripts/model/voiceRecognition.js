import { APP } from './components';
import weatherSearch from '../controller/controller';

export default function speechRecognition() {
  const {
    searchForm,
    searchInput,
    spinnerGrow,
    mic,
  } = APP.DOM;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    mic.addEventListener('click', micBtnClick);

    function micBtnClick() {
      if (SpeechRecognition) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }

    recognition.addEventListener('start', startSpeechRecognition);
    function startSpeechRecognition() {
      searchInput.focus();
      spinnerGrow.style.display = 'block';
    }

    recognition.addEventListener('end', endSpeechRecognition);
    function endSpeechRecognition() {
      searchInput.focus();
      spinnerGrow.style.display = 'none';
    }

    recognition.addEventListener('result', resultOfSpeechRecognition);
    function resultOfSpeechRecognition(event) {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;

      if (transcript.toLowerCase()
        .trim() === 'stop recording') {
        recognition.stop();
      } else if (!searchInput.value) {
        searchInput.value = transcript;
      } else {
        if (transcript.toLowerCase()
          .trim() === 'go') {
          searchForm.submit();
        } else if (transcript.toLowerCase()
          .trim() === 'reset input') {
          searchInput.value = '';
        } else {
          searchInput.value = transcript;
        }
      }
      const TIMER = setTimeout(getWeather, 1000);
      function getWeather() {
        weatherSearch();
        clearTimeout(TIMER);
      }
    }
  } else {
    mic.style.visibility = 'hidden';
  }
}
