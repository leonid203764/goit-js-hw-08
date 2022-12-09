const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onSubmitForm);
window.addEventListener('load', updateOutputOnload);
let formData = {};
function onInputForm(e) {
  e.preventDefault();
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function updateOutputOnload(e) {
  e.preventDefault();
  const outputTextContent = localStorage.getItem(LOCAL_STORAGE_KEY);
  formData = JSON.parse(outputTextContent) || {
    email: '',
    message: '',
  };
  const keys = Object.keys(formData);
  for (const key of keys) {
    refs.form.elements[key].value = formData[key];
  }
}

function onSubmitForm(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  localStorage.clear();
  refs.form.reset();
}
