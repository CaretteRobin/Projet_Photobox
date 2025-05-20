import { API_BASE_URL } from './config.js';

export async function loadPicture(idPicture) {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${idPicture}`, {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement de la photo:', error);
    throw error;
  }
}
