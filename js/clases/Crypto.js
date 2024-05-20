import { CryptoBase } from './cryptoBase.js';

class Crypto extends CryptoBase {
    constructor(id,nombre,simbolo,fechaCreacion,precioActual,consenso,cantCirculacion,algoritmo,web) {
        super(id,nombre,simbolo,fechaCreacion,precioActual);
        this.consenso = consenso;
        this.cantCirculacion = cantCirculacion;
        this.algoritmo = algoritmo;
        this.web = web;
    }

    verify() {
        return this.checkTitulo();
    }

    checkTitulo() {
    return { success: true, rta: null };
    }
}

export { Crypto };