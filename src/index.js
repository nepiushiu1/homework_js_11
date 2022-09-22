import './css/styles.css';

import Notiflix from 'notiflix';
import { fetchFoto } from './fetch-foto';
import { fetchImage } from './fetch-foto';

const refs = {
  form: document.querySelector('#search-form'),
  sendBtn: document.querySelector('[type="submit"]'),
  imageMarkup: document.querySelector('.gallery'),
};
// console.log(refs.imageMarkup);
// fetchFoto('red dog');
refs.form.addEventListener('submit', dataInput);
function dataInput(e) {
  e.preventDefault;
  const newData = e.carrentTarget.elements.guery.value;
  console.log(newData);
  if (newData.trim()) {
    fetchFoto(newData);
  }
}
console.log(dataInput);
