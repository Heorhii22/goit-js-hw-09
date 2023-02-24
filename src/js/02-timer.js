import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDaysEl: document.querySelector('[data-days]'),
  dataHoursEl: document.querySelector('[data-hours]'),
  dataMinutesEl: document.querySelector('[data-minutes]'),
  dataSecondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates[0] < currentDate) {
      Notify.failure('Please choose a date in the future!');
      refs.startBtn.setAttribute('disabled', '');
      return;
    }

    refs.startBtn.toggleAttribute('disabled');
  },
};

flatpickr(refs.datePicker, options);

refs.startBtn.addEventListener('click', onTimerStart);

function generateDate() {
  const selectedDate = new Date(refs.datePicker.value).getTime();
  const currentDate = new Date().getTime();
  const timerDate = selectedDate - currentDate;

  return timerDate;
}

function onTimerStart() {
  refs.startBtn.toggleAttribute('disabled');

  setInterval(() => {
    const timerDate = generateDate();

    if (timerDate < 0) {
      return;
    }
    refs.startBtn.setAttribute('disabled', '');

    const timerComponents = convertMs(timerDate);
    return clockTimerUpdate(timerComponents);
  }, 1000);
}

function pad(argument) {
  return String(argument).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function clockTimerUpdate({ days, hours, minutes, seconds }) {
  refs.dataDaysEl.textContent = days;
  refs.dataHoursEl.textContent = hours;
  refs.dataMinutesEl.textContent = minutes;
  refs.dataSecondsEl.textContent = seconds;
}
