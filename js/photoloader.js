import { API_BASE_URL } from './config.js';

/**
 * Charge les données d'une photo à partir de son identifiant.
 * @param {number|string} idPicture - L'ID de la photo à charger.
 * @returns {Promise<Object>} - Une promesse contenant les données de la photo.
 */
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

/**
 * Charge n'importe quelle ressource depuis l'API Photobox, en utilisant une URI complète.
 * @param {string} uri - L'URI complète à charger.
 * @returns {Promise<Object>} - Une promesse contenant les données de la ressource.
 */
export async function loadResource(uri) {
  try {
    const response = await fetch(uri, {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement de la ressource :", error);
    throw error;
  }
}
