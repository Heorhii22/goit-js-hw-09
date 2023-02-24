import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountValueInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSumbit);

function onFormSumbit(e) {
  e.preventDefault();

  let delay = Number(refs.form.delay.value);

  for (let i = 1; i <= refs.form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(refs.form.step.value);
  }
}

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}
