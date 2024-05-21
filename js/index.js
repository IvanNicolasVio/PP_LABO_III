import { Crypto } from "./clases/Crypto.js";
import { obtenerNuevoID,crearSpinner,borrarSpinner } from "./funciones.js";
import { escribir,leer,borrarLista } from "./local_storage.js";
const KEY_STORAGE = "listaCrypto";
const TIEMPO_CARGA = 2500; 
const items = leer(KEY_STORAGE);
const formulario = document.getElementById("tabla_carga");
const btnGuardar = document.getElementById("btn");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const btnBorrar = document.getElementById("btnBorrar");
document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    crearSpinner();
    setTimeout(() => {
        rellenarSelectTipo();
        rellenarSelectAlg();
        crearCrypto();
        crearTabla();
        cancelar();
        modificar();
        eliminar();
        borrarTodo();
        borrarSpinner();
    }, TIEMPO_CARGA);
    
}

function rellenarSelectTipo(){
    const tipoSelect = document.getElementById('tipo');
    const tipos = ["Proof of Work", "Proof of Stake"];
    tipos.forEach(function (tipo) {
      const option = document.createElement('option');
      option.value = tipo.toLowerCase();
      option.textContent = tipo;
      tipoSelect.appendChild(option);
    });
}

function rellenarSelectAlg(){
    const algoritmoSelect = document.getElementById('algoritmo');
    const tipos = ["SHA-256", "Ethash","Scrypt", "X11"];
    tipos.forEach(function (tipo) {
      const option = document.createElement('option');
      option.value = tipo.toLowerCase();
      option.textContent = tipo;
      algoritmoSelect.appendChild(option);
    });
}

function borrarTodo(){
    btnBorrar.addEventListener("click", async (e) => {
        e.preventDefault();
        if(confirm("Desea borrar TODO?")){
            crearSpinner();
            setTimeout(() => {
                borrarLista(KEY_STORAGE);
                formulario.reset();
                crearTabla();
                ocultarBtn(2); 
                borrarSpinner();
            }, TIEMPO_CARGA);  
        }
    })
}

function cancelar(){
    btnCancelar.addEventListener("click", async (e) => {
        e.preventDefault();
        formulario.reset();
        ocultarBtn(2); 
    })
}

function eliminar(){
    btnEliminar.addEventListener("click", async (e) => {
        e.preventDefault();
        const items = leer(KEY_STORAGE);
        const idABorrar = document.getElementById("id").value;
        if(confirm("Confirma la eliminacion?")){
            crearSpinner();
            setTimeout(() => {
                const nuevoArray = items.filter(objeto => objeto.id != idABorrar);
                escribir(KEY_STORAGE,nuevoArray);
                crearTabla();
                formulario.reset();
                ocultarBtn(2);
                borrarSpinner();
            }, TIEMPO_CARGA);  
        }
    })
}

function modificar(){
    btnModificar.addEventListener("click", async (e) => {
        e.preventDefault();
        const items = leer(KEY_STORAGE);
        const idAModificar = document.getElementById("id").value;
        const nombreInput = document.getElementById("nombre");
        const simboloInput = document.getElementById("simbolo");
        const precioInput = document.getElementById("precio");
        const tipoInput = document.getElementById("tipo");
        const cantidadInput = document.getElementById("cantidad");
        const algoritmoInput = document.getElementById("algoritmo");
        const sitioInput = document.getElementById("sitio");
        let nuevasPropiedades = {
            nombre: nombreInput.value,
            simbolo: simboloInput.value,
            consenso: tipoInput.value,
            precioActual: precioInput.value,
            cantCirculacion: cantidadInput.value,
            algoritmo: algoritmoInput.value,
            web: sitioInput.value
        };
        if(confirm("Confirma la modificacion")){
            crearSpinner();
            setTimeout(() => {
                items.forEach(objeto => {
                    if (objeto.id == idAModificar) {
                        Object.assign(objeto, nuevasPropiedades);
                    }
                });
                escribir(KEY_STORAGE,items);
                crearTabla();
                formulario.reset();
                ocultarBtn(2);
                borrarSpinner();
            }, TIEMPO_CARGA);  
        }
    })
}

function darDia(){
    const timeZone = 'America/Argentina/Buenos_Aires';
    const nowInBuenosAires = new Date().toLocaleString('en-US', { timeZone: timeZone });
    const dateInBuenosAires = new Date(nowInBuenosAires);
    const day = String(dateInBuenosAires.getDate()).padStart(2, '0');
    const month = String(dateInBuenosAires.getMonth() + 1).padStart(2, '0'); 
    const year = dateInBuenosAires.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

function crearCrypto(){
    btnGuardar.addEventListener("click", async (e) => {
        e.preventDefault();
        const nombreInput = document.getElementById("nombre");
        const simboloInput = document.getElementById("simbolo");
        const precioInput = document.getElementById("precio");
        const tipoInput = document.getElementById("tipo");
        const cantidadInput = document.getElementById("cantidad");
        const algoritmoInput = document.getElementById("algoritmo");
        const sitioInput = document.getElementById("sitio");

        if (!nombreInput.value || !simboloInput.value || !tipoInput.value || !precioInput.value || !cantidadInput.value || !algoritmoInput.value || !sitioInput.value) {
            alert("Por favor complete todos los campos");
            return;
        }
        crearSpinner();
        setTimeout(() => {
            const crypto = new Crypto(
                obtenerNuevoID(),
                nombreInput.value,
                simboloInput.value,
                darDia(),
                precioInput.value,
                tipoInput.value,
                cantidadInput.value,
                algoritmoInput.value,
                sitioInput.value,
            );
            const respuesta = crypto.verify();
            if(respuesta){
                const items = leer(KEY_STORAGE);
                items.push(crypto);
                try {
                    escribir(KEY_STORAGE,items);
                    crearTabla();
                }
                catch (error) {
                    alert("Error!");
                }
            }
            formulario.reset();
            borrarSpinner();
        }, TIEMPO_CARGA);  
    })
}

function crearTabla(){
    const tablaHeaders = document.getElementById("tabla_headers");
    const tablaBody = document.getElementById("tabla_body");
    tablaBody.innerHTML = "";
    tablaHeaders.innerHTML = "";
    const listaCrypto = leer(KEY_STORAGE);
    if (listaCrypto.length === 0) return;
    const keys = Object.keys(listaCrypto[0]);
    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        tablaHeaders.appendChild(th);
    });
    listaCrypto.forEach(Crypto => {
        const fila = document.createElement("tr");
        keys.forEach(key => {
            const td = document.createElement("td");
            td.textContent = Crypto[key];
            fila.appendChild(td);
        });
        tablaBody.appendChild(fila);

        fila.addEventListener("click", () => {
            cargarFormulario(Crypto);
        });
    });

    
}

function cargarFormulario(crypto) {
    document.getElementById("id").value = crypto.id;
    document.getElementById("nombre").value = crypto.nombre;
    document.getElementById("simbolo").value = crypto.simbolo;
    document.getElementById("precio").value = crypto.precioActual;
    document.getElementById("tipo").value = crypto.consenso || '';
    document.getElementById("cantidad").value = crypto.cantCirculacion || '';
    document.getElementById("algoritmo").value = crypto.algoritmo || '';
    document.getElementById("sitio").value = crypto.web || '';
    ocultarBtn(1);
}


function ocultarBtn(booleano){
    if(booleano == 1){
        btnGuardar.hidden = true;
        btnModificar.hidden = false;
        btnEliminar.hidden = false;
        btnCancelar.hidden = false;
    }if(booleano == 2){
        btnGuardar.hidden = false;
        btnEliminar.hidden = true;
        btnCancelar.hidden = true;
        btnModificar.hidden = true;
    }
}
