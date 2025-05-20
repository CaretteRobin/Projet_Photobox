import { API_BASE_URL } from "./config.js";
import { loadResource } from "./photoloader.js";

let galerieData = null;

export async function loadGallery() {
  const uri = `${API_BASE_URL}/photos`;
  galerieData = await loadResource(uri);
  return galerieData;
}
