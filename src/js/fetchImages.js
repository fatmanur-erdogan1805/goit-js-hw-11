const API_KEY = 'YOUR_PIXABAY_API_KEY'; // Buraya kendi API anahtarını ekle

export async function fetchImages(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error('Something went wrong while fetching images');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
