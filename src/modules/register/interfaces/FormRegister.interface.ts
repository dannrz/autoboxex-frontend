import type { Servicio } from "./ClientServicesResponse.interface";

export interface FormRegister {
    idCliente: string;
    cliente: string;
    sucursal: string;
    rfc: string;
    credito: string;
    direccion: string;
    placas: string;
    marca: string;
    modelo: string;
    ordenEntrada: string;
    year: string;
    color: string;
    serie: string;
    kilometraje: string;
    tipo: string;
    fechaEntrada: Date;
    estado: string;
    autorizacion: string;
    observaciones: string;
    ingresaPor: string;
    fechaSalida: Date;
    DatosFiscales: string;
    mano: string;
    suma: string;
    CuentasCobrar: string;
    descuento: string;
    iva: string;
    total: string;
    servicios: Array<Servicio>;
    placasList: string[];
}