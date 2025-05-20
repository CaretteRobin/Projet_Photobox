import * as photoloader from "/js/photoloader.js";
import { loadGallery } from "/js/gallery.js";
import { displayGallery } from "/js/gallery_ui.js";
import { displayPicture } from "/js/ui.js";

let galerieLinks = {};

async function getPicture(id) {
  try {
    const picture = await photoloader.loadPicture(id);
    const data = picture.photo;

    let categorie = "";
    let commentaires = [];

    const links = picture.links;

    if (links?.categorie?.href) {
      const catUrl = new URL(links.categorie.href, "https://webetu.iutnc.univ-lorraine.fr").href;
      const catData = await photoloader.loadResource(catUrl);
      categorie = catData.categorie?.nom; // 
    }

    if (links?.comments?.href) { // 
      const comUrl = new URL(links.comments.href, "https://webetu.iutnc.univ-lorraine.fr").href;
      const comData = await photoloader.loadResource(comUrl);
      commentaires = comData.comments || [];
    }

    displayPicture({ ...data, categorie, commentaires });

    const title = document.getElementById("photo_title");
    if (title) {
      title.textContent = `Photo : ${data.id}`;
    }

  } catch (error) {
    console.error("Erreur lors du chargement de l’image :", error);
  }
}

document.querySelector("#load_gallery").addEventListener("click", async () => {
  try {
    const { photos, links } = await loadGallery();
    galerieLinks = links;
    displayGallery({ photos });
  } catch (e) {
    console.error("Impossible de charger la galerie :", e);
  }
});

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

const id = window.location.hash ? window.location.hash.substring(1) : 105;
getPicture(id);

window.addEventListener("hashchange", () => {
  const newId = window.location.hash.substring(1);
  getPicture(newId);
});
