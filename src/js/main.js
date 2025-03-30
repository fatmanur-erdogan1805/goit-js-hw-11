import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './fetchImages';

document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();
  if (!query) return;

  try {
    const data = await fetchImages(query);
    console.log(data); // Sonuçları kontrol etmek için
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});



const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');

const API_KEY = 'YOUR_PIXABAY_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query) {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
    const data = await response.json();

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
      return [];
    }
    return data.hits;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.'
    });
    return [];
  }
}

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
  const images = await fetchImages(query);
  renderGallery(images);
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
