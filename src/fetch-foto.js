export default class NewsApiService {
  contructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchFoto() {
    return fetch(
      `https://pixabay.com/api/?key=30059105-5751f6208e36fd3b4a2d189ae&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// -------------------------------------------------------------------------------------------

// import axios from 'axios';

// const API_KEY = '30059105-5751f6208e36fd3b4a2d189ae';
// const url = 'https://pixabay.com/api/';
// const choiceOfValues =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1';

// function fetchImage(value) {
// const url = `https://pixabay.com/api/?q=${value}`;
//   const options = {
//     key: API_KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   };
//   return axios
//     .get(url, options)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(value => {
//       console.log(value);
//       return value;
//     });
// }
// export { fetchImage };

// function fetchFoto(name) {
//   return fetch(`${url}?key=${API_KEY}&q=${name}&${choiceOfValues}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(foto => {
//       console.log(foto);
//       return foto;
//     });
// }
// export { fetchFoto };
