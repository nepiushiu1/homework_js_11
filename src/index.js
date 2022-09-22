import './css/styles.css';

import Notiflix from 'notiflix';
// import { fetchFoto } from './fetch-foto';
// import { fetchImage } from './fetch-foto';
import NewsApiService from './fetch-foto';
import NewsApiService from './fetch-foto';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  sendBtn: document.querySelector('[type="submit"]'),
  imageMarkup: document.querySelector('.gallery'),
  procesedBtn: document.querySelector('.load-more'),
};

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', dataInput);
refs.procesedBtn.addEventListener('click', onProcesed);

function dataInput(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchFoto().then(console.log);
}

function onProcesed() {
  newsApiService.fetchFoto().then(console.log);
}
// ------------------------------------------------------------------------
// console.log(refs.imageMarkup);
// fetchFoto('red dog');

// let name = '';

// refs.form.addEventListener('submit', dataInput);
// function dataInput(e) {
//   e.preventDefault;
//   name = e.currentTarget.elements.query.value;
//   console.log(name);
//   if (name.trim()) {
//     fetchFoto(name).then();
//   }
// }
