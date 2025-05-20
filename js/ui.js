export function displayPicture(data) {
    const templateSource = document.getElementById("photoTemplate").innerHTML;
    const template = Handlebars.compile(templateSource);
  
    const imageUrl = new URL(data.url.href, "https://webetu.iutnc.univ-lorraine.fr").href;
  
    const html = template({
      imageUrl: imageUrl,
      titre: data.titre,
      descr: data.descr,
      type: data.type,
      width: data.width,
      height: data.height
    });
  
    const container = document.getElementById("la_photo");
    container.innerHTML = html;
  }
  