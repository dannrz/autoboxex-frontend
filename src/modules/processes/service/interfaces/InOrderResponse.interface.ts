import type { Servicio } from "./ClientServicesResponse.interface";

export interface InOrderResponse {
    IdCliente: string;
    Nombre: string;
    RFC: string;
    Sucursal: string;
    Direccion: string;
    Colonia: string;
    Poblacion: string;
    Estado: string;
    CP: string;
    Telefono: string;
    Telefono2: string;
    Telefono3: string;
    eMail: string;
    Credito: string;
    Contacto: null;
    ManoObra: null;
    Descuento: null;
    direccionFull: string;
    servicios: Servicio[];
}