// import axios from 'axios';

import axios from 'axios';

const API_KEY = '30059105-5751f6208e36fd3b4a2d189ae';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
  contructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchFoto() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );
      console.log(data);
      this.nextPage();
      return data.hits;
    } catch (error) {
      console.error(error);
    }
  }
  nextPage() {
    this.page += 1;
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
