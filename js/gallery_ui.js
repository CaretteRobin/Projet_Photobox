export function displayGallery(galerie) {
    const container = document.getElementById("galerie");
    container.innerHTML = "";
  
    const photos = galerie.photos || galerie.collection || [];
  
    let erreurCount = 0;
  
    photos.forEach((wrapper, index) => {
      const photo = wrapper.photo;
  
      if (!photo || !photo.url || !photo.url.href) {
        if (erreurCount < 5) {
          console.warn(`Photo mal formée à l’index ${index} :`, wrapper);
        }
        erreurCount++;
        return;
      }
  
      const imageUrl = new URL(photo.url.href, "https://webetu.iutnc.univ-lorraine.fr").href;
  
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = photo.titre || `photo ${photo.id}`;
      img.title = photo.titre || `photo ${photo.id}`;
      img.classList.add("vignette");
  
      container.appendChild(img);
    });
  
    if (erreurCount > 0) {
      console.warn(`${erreurCount} photo(s) ignorée(s) car incomplètes.`);
    }
  }
  