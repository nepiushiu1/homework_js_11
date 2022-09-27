import './css/styles.css';

import Notiflix from 'notiflix';

import NewsApiService from './fetch-foto';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  sendBtn: document.querySelector('[type="submit"]'),
  imageMarkup: document.querySelector('.gallery'),
  procesedBtn: document.querySelector('[type="button"]'),
};
// refs.sendBtn.disabled = true;
// refs.procesedBtn.disabled = true;
const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', dataInput);
refs.procesedBtn.addEventListener('click', onProcesed);

function dataInput(e) {
  e.preventDefault();
  clearMarkup();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  refs.procesedBtn.classList.add('is-hidden');
  if (newsApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.procesedBtn.classList.add('is-hidden');
    return;
  }
  if (newsApiService.query !== '') {
    newsApiService.fetchFoto().then(newMarcupPictures);
  }
}

function onProcesed() {
  newsApiService.fetchFoto().then(newMarcupPictures);
}

function newMarcupPictures(data = []) {
  console.log(data);
  refs.procesedBtn.classList.add('is-hidden');
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    // refs.procesedBtn.classList.add('is-hidden');
    return;
  } else if (data.length < 40) {
    refs.procesedBtn.classList.add('is-hidden');
    Notiflix.Notify.warning(
      `We're sorry, but you've reached the end of search results`
    );
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

  //   refs.imageMarkup.innerHTML += newPicture;
  refs.imageMarkup.insertAdjacentHTML('beforeend', newPicture);
  galleryLightbox.refresh();
  if (data.length === 40) {
    refs.procesedBtn.classList.remove('is-hidden');
  }
}

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function clearMarkup() {
  refs.imageMarkup.innerHTML = '';
}
