export interface Insumo {
    IdEntSal: string;
    Partida: string;
    IdRefaccion: string;
    Cantidad: string;
    Precio: string;
    Importe: string;
    PrecioIva: string;
    IdMovimiento: string;
    refaccion: Refaccion;
}

export interface Refaccion {
    IdRefaccion: string;
    Refacción: string;
    Unidad: string;
    Codigo: null | string;
    Tipo: null | string;
    Cantidad: string;
    Precio: string;
    Fecha: string;
    Marca: string;
    Calidad: string;
    PrecioIva: string;
}