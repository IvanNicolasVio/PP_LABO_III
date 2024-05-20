
export function escribir(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

export function leer(clave) {
    return JSON.parse(localStorage.getItem(clave)) || [];
}
  

export function borrarLista(clave) {
    if(localStorage.getItem(clave)) {
        localStorage.removeItem(clave);
    }
}