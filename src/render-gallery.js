const gallery = document.querySelector(".gallery");
export function renderGallery(images) {
    const markup = images.map(({ id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads, }) =>
        `<a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`
    ).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    // Цей код дозволяє автоматично прокручувати сторінку на висоту 2 карток галереї, коли вона завантажується
    const { height: cardHeight } = document.querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    })
}
