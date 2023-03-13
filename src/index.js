import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchImages } from './api';
import { renderGallery } from './render-gallery';

let page = 1;
let perPage = 40;
let searchQuery = '';
let currentHits = 0;

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
    searchForm:document.querySelector("#search-form"),
    gallery:document.querySelector(".gallery"),
    loadMore:document.querySelector(".load-more"),
};

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMore.addEventListener("click", onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  if (searchQuery === '') {
    clearAll();
    buttonHidden();
    return;
  }
    
  const response = await fetchImages(searchQuery, page, perPage);
  currentHits = response.hits.length
  try {
    if (response.totalHits === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      renderGallery(response.hits);
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);

      if (response.totalHits > perPage) {
        buttonUnHidden();
      }
    } 
  } catch (error) {
      console.log(error);
    }
}

async function onLoadMore() {
  page += 1;
  const response = await fetchImages(searchQuery, page, perPage);
  renderGallery(response.hits);
      lightbox.refresh();

}


function clearAll() {
  refs.gallery.innerHTML = '';
}

function buttonHidden() {
    refs.loadMore.classList.add("hidden");
};

function buttonUnHidden() {
    refs.loadMore.classList.remove("hidden");
};