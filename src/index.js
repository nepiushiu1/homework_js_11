import './css/styles.css';

import Notiflix from 'notiflix';
// import { fetchFoto } from './fetch-foto';
// import { fetchImage } from './fetch-foto';
import NewsApiService from './fetch-foto';
import NewsApiService from './fetch-foto';

// import marcupPictures from ' ./templades/markup-pictures.hbs ';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  sendBtn: document.querySelector('[type="submit"]'),
  imageMarkup: document.querySelector('.gallery'),
  procesedBtn: document.querySelector('.load-more'),
};
// refs.sendBtn.disabled = true;
refs.procesedBtn.disabled = true;
const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', dataInput);
refs.procesedBtn.addEventListener('click', onProcesed);

function dataInput(e) {
  e.preventDefault();
  clearMarkup();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchFoto().then(newMarcupPictures);
}

function onProcesed() {
  newsApiService.fetchFoto().then(newMarcupPictures);
}

function newMarcupPictures(data = []) {
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (data.length > 0) {
    Notiflix.Notify.failure(`"Hooray! We found ${data.totalHits} images."`);
  }
  const newPicture = data
    .map(hits => {
      return `
  <div class='photo-card'>
  <a href="${hits.largeImageURL}">
  <img class='photo-img' src='${hits.webformatURL}' alt='${hits.tags}' loading='lazy' />
  </a>
  
  <div class='info'>
    <p class='info-item'>Likes
      <b>${hits.likes}</b>
    </p>
    <p class='info-item'>Views
      <b>${hits.views}</b>
    </p>
    <p class='info-item'>Comments
      <b>${hits.comments}</b>
    </p>
    <p class='info-item'>Downloads
      <b>${hits.downloads}</b>
    </p>
  </div>
</div>
   `;
    })
    .join('');
  refs.imageMarkup.innerHTML += newPicture;
  refs.procesedBtn.disabled = false;
}
function clearMarkup() {
  refs.imageMarkup.innerHTML = '';
}
