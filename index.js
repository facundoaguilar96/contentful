function addWork(params = {}) {
  const template = document.querySelector("#portfolio-card-template");
  const container = document.querySelector(".portfolio-content");

  template.content.querySelector(".portfolio-card-title").textContent =
    params.nombre;
  template.content.querySelector(".porfolio-card-text").textContent =
    params.descripcion;
  template.content.querySelector(".precio").textContent = "$" + params.precio;
  const imgCard = template.content.querySelector(".porfolio-img");
  imgCard.src = "http:" + params.url;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getWork() {
  return fetch(
    "https://cdn.contentful.com/spaces/rhy3jleltni7/environments/master/entries?access_token=TfacPggm74tl4R5llYcG6dbs-HFB-lbyKEWZWjR0LwQ&content_type=producto"
  )
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      //console.log(resp);

      const productArray = resp.items.map((item) => {
        //console.log(item);
        //console.log(item.fields.foto.sys.type);
        const idImagen = item.fields.foto.sys.id;
        const imagen = buscarImagen(idImagen, resp);
        linkImg = imagen.fields.file.url;
        console.log(linkImg);
        return {
          nombre: item.fields.nombre,
          precio: item.fields.precio,
          descripcion: item.fields.descripcion,
          url: linkImg,
        };
      });
      //console.log(productArray[2]);
      return productArray;
    });
}

function buscarImagen(id, datos) {
  // console.log(datos, id);
  const imagen = datos.includes.Asset.find((asset) => {
    return asset.sys.id == id;
  });
  return imagen;
}

function main() {
  getWork().then((res) => {
    for (const w of res) {
      addWork(w);
    }
  });
}
main();
