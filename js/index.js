import * as photoloader from "/js/photoloader.js";

async function getPicture(id) {
  try {
    const picture = await photoloader.loadPicture(id);
    console.log("Objet brut :", picture);

    const data = picture.photo;
    console.log("Contenu de data :", data);
    console.log("data.url :", data.url);

    console.log("Titre :", data.titre);
    console.log("Type :", data.type);
    console.log("Image :", data.url.href);
  } catch (error) {
    console.error("Erreur lors du chargement de l’image :", error);
  }
}

// Récupération de l'ID depuis le hash ou fallback sur 105
const id = window.location.hash ? window.location.hash.substring(1) : 105;
getPicture(id);

