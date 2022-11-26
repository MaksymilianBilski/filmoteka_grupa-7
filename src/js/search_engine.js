// import { async } from 'regenerator-runtime';
// import {
//   fetchMovies,
//   start,
//   fetchDetails,
//   getMovie,
//   API_KEY,
//   totalPages,
//   timeDifference,
// } from './fetch-to-main';
// import { Spinner } from 'spin.js';
// import { opts } from './asynchronic-loader-opts';

// const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
// const input = document.getElementById('form-input');
// const searchForm = document.getElementById('search-form');

// let SEACRH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
// let totalSearchedPages

// searchForm.addEventListener('submit', event => {
//   const spinner = new Spinner(opts).spin(getMovie);
//   if (getMovie.children.length > 0) {
//     getMovie.innerHTML = '';
//   }
//   event.preventDefault();
//   let searchValue = input.value.toLowerCase();
//   if (searchValue === '') {
//     fetchMovies(API_KEY);
//   }
//   if (searchValue && searchValue !== '') {
//     fetch(SEACRH_URL + searchValue)
//       .then(data => {
//         return data.json();
//       })
//       .then(movies => {
//         start(movies);
//       });
//     searchValue = '';
//     spinner.stop();
//   }
// });

import { async } from 'regenerator-runtime';
import {
  fetchMovies,
  start,
  fetchDetails,
  getMovie,
  API_KEY,
  totalPages,
  timeDifference,
} from './fetch-to-main';
import { engine } from './pagination';
import { Spinner } from 'spin.js';
import { opts } from './asynchronic-loader-opts';

const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
let totalSearchedPages;
let search;

const searchForm = document.getElementById('search-form');

function searcher(page) {
  search = true;
  engine();
  const input = document.getElementById('form-input');
  const spinner = new Spinner(opts).spin(getMovie);
  if (getMovie.children.length > 0) {
    getMovie.innerHTML = '';
  }
  // event.preventDefault();
  let searchValue = input.value.toLowerCase();
  if (searchValue === '') {
    fetchMovies(API_KEY);
    search = false;
  }
  if (searchValue && searchValue !== '') {
    fetch(SEARCH_URL + searchValue + page)
      .then(data => {
        return data.json();
      })
      .then(movies => {
        start(movies);
        totalSearchedPages = movies.total_pages;
      });
    searchValue = '';
    spinner.stop();
  }
}
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searcher('');
});

export { totalSearchedPages, search, searcher };
