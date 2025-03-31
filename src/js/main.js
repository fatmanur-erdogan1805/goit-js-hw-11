import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './fetchImages.js';

const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');

function renderGallery(images) {
  const galleryMarkup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
      </li>
    `
    )
    .join('');

  galleryContainer.innerHTML = galleryMarkup;
  lightbox.refresh();
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();
  if (!query) return;

  galleryContainer.innerHTML = '';
  try {
    const images = await fetchImages(query);
    renderGallery(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.'
    });
  }
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
