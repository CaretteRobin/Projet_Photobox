import * as photoloader from "./photoloader.js";
import { loadGallery } from "./gallery.js";
import { displayGallery } from "./gallery_ui.js";
import { displayPicture } from "./ui.js";

let galerieLinks = {};
let currentPhotoId = null;

// Affiche les détails d'une photo dans #la_photo

export async function getPicture(id) {
  try {
    const picture = await photoloader.loadPicture(id);
    const data = picture.photo;

    let categorie = "";
    let commentaires = [];

    const links = picture.links;

    if (links?.categorie?.href) {
      const catUrl = new URL(links.categorie.href, "https://webetu.iutnc.univ-lorraine.fr").href;
      const catData = await photoloader.loadResource(catUrl);
      categorie = catData.categorie?.nom;
    }

    if (links?.comments?.href) {
      const comUrl = new URL(links.comments.href, "https://webetu.iutnc.univ-lorraine.fr").href;
      const comData = await photoloader.loadResource(comUrl);
      commentaires = comData.comments || [];
    }

    displayPicture({ ...data, categorie, commentaires });

    const title = document.getElementById("photo_title");
    if (title) {
      title.textContent = `Photo : ${data.id}`;
    }

    // Clic sur image principale ouvre la lightbox
    document.querySelector("#la_photo img")?.addEventListener("click", () => {
      openLightbox(data.id);
    });

  } catch (error) {
    console.error("Erreur lors du chargement de l’image :", error);
  }
}

// Ouvre la lightbox
export function openLightbox(id) {
  currentPhotoId = parseInt(id);
  document.getElementById("lightbox").classList.remove("hidden");
  loadAndShowInLightbox(currentPhotoId);
}

// Charge l'image originale dans la lightbox
function loadAndShowInLightbox(id) {
  photoloader.loadPicture(id).then(p => {
    let url = null;
    if (p.photo.original && p.photo.original.href) {
      url = new URL(p.photo.original.href, "https://webetu.iutnc.univ-lorraine.fr").href;
    } else if (p.photo.url && p.photo.url.href) {
      url = new URL(p.photo.url.href, "https://webetu.iutnc.univ-lorraine.fr").href;
    } else if (p.photo.file) {
      // fallback vers file — à adapter si nécessaire
      url = `https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/img/large/${p.photo.file}`;
    } else {
      console.error("Aucune URL valide trouvée pour la photo en lightbox", p.photo);
      return;
    }
    document.getElementById("lightbox_img").src = url;
    currentPhotoId = id;
  }).catch(e => {
    console.error("Erreur chargement photo lightbox :", e);
  });
}

// Fermer la lightbox
document.getElementById("close_lightbox").addEventListener("click", () => {
  document.getElementById("lightbox").classList.add("hidden");
});

// Suivant / Précédent dans la lightbox
document.getElementById("prev_lightbox").addEventListener("click", () => {
  if (currentPhotoId > 1) loadAndShowInLightbox(currentPhotoId - 1);
});

document.getElementById("next_lightbox").addEventListener("click", () => {
  loadAndShowInLightbox(currentPhotoId + 1);
});

// Chargement galerie + mémorisation pagination
document.querySelector("#load_gallery").addEventListener("click", async () => {
  try {
    const { photos, links } = await loadGallery();
    galerieLinks = links;
    displayGallery({ photos });
  } catch (e) {
    console.error("Impossible de charger la galerie :", e);
  }
});

// Boutons pagination
function setupPagination() {
  document.getElementById("next_page").addEventListener("click", async () => {
    if (galerieLinks?.next?.href) {
      const { photos, links } = await loadGallery(galerieLinks.next.href);
      galerieLinks = links;
      displayGallery({ photos });
    }
  });

  document.getElementById("prev_page").addEventListener("click", async () => {
    if (galerieLinks?.prev?.href) {
      const { photos, links } = await loadGallery(galerieLinks.prev.href);
      galerieLinks = links;
      displayGallery({ photos });
    }
  });

  document.getElementById("first_page").addEventListener("click", async () => {
    if (galerieLinks?.first?.href) {
      const { photos, links } = await loadGallery(galerieLinks.first.href);
      galerieLinks = links;
      displayGallery({ photos });
    }
  });

  document.getElementById("last_page").addEventListener("click", async () => {
    if (galerieLinks?.last?.href) {
      const { photos, links } = await loadGallery(galerieLinks.last.href);
      galerieLinks = links;
      displayGallery({ photos });
    }
  });
}

setupPagination();

// Chargement initial
const id = window.location.hash ? window.location.hash.substring(1) : 105;
getPicture(id);

// Réagit aux changements de hash
window.addEventListener("hashchange", () => {
  const newId = window.location.hash.substring(1);
  getPicture(newId);
});
