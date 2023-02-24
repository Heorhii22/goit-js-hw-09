function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const dataStart = document.querySelector('[data-start]');
const dataStop = document.querySelector('[data-stop]');

dataStop.setAttribute('disabled', '');

dataStart.addEventListener('click', onStartBtnClick);
dataStop.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(generateBgColor, 1000);
  dataStart.toggleAttribute('disabled');
  dataStop.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(timerId);
  dataStop.toggleAttribute('disabled');
  dataStart.removeAttribute('disabled');
}

function generateBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
