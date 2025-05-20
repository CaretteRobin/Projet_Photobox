import { API_BASE_URL } from './config.js';
import { loadResource } from './photoloader.js';

export async function loadGallery(uri) {
  const fullUri = uri
    ? new URL(uri, "https://webetu.iutnc.univ-lorraine.fr").href
    : `${API_BASE_URL}/photos`;

  const data = await loadResource(fullUri);
  return {
    photos: data.photos,
    links: data.links
  };
}
