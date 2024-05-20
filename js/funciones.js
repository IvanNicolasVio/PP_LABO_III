export function obtenerNuevoID() {
    var listaanuncios = JSON.parse(localStorage.getItem('listaCrypto')) || [];
    if (listaanuncios.length === 0) {
      return 0;
    } else {
      var maxId = Math.max(...listaanuncios.map(anuncio => anuncio.id));
      return maxId + 1;
    }
}

export function crearSpinner() {
  const spinner = document.createElement("img");
  const contenedor = document.getElementById("spinner");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");
  spinner.setAttribute("height", "64px");
  spinner.setAttribute("width", "64px");
  contenedor.appendChild(spinner);
  document.getElementById('spinner-container').classList.remove('hidden');
}

export function borrarSpinner() {
  const contenedor = document.getElementById("spinner");
  if (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
  }
  document.getElementById('spinner-container').classList.add('hidden');
}

