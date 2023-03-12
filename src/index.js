import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchImages } from './api'

const refs = {
    searchForm:document.querySelector("#search-form"),
    gallery:document.querySelector(".gallery"),
    loadMore:document.querySelector(".load-more"),
};

refs.searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

};

function renderGallery(images) {
  // Перевірка чи існує галерея перед вставкою даних
  if (!gallery) {
    return;
  }

  const markup = images
    .map(image => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  // Цей код дозволяє автоматично прокручувати сторінку на висоту 2 карток галереї, коли вона завантажується
  const { height: cardHeight } = document.querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
