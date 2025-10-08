export interface ClientServicesResponse {
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
    servicios: Servicio[];
}

export interface Servicio {
    IdMovimiento: string;
    IdCliente: string;
    TipMov: string;
    FolioOE: string;
    FolioFP: null | string;
    Estado: Estado;
    Fecha: Date | null;
    FEntrada: Date;
    FSalida: null;
    IdVehiculo: string;
    Kms: null | string;
    Enlace: null | string;
    Ingreso: string;
    DiasPS: null;
    Observación: string;
    Autoriza: null;
    IdUsuario: IDUsuario;
    vehiculo: Vehiculo;
}

export enum Estado {
    Emitida = "Emitida",
}

export enum IDUsuario {
    Chris = "chris",
    Fernando = "Fernando",
    IDUsuarioCHRIS = "CHRIS",
    IDUsuarioFernando = "fernando",
    Jacquelin = "Jacquelin",
}

export interface Vehiculo {
    IdCliente: string;
    IdVehiculo: string;
    Placas: string;
    IdMarca: string;
    Modelo: string;
    Año: string;
    Color: string;
    VIN: null | string;
    Serie: null | string;
    marca: Marca;
}

export interface Marca {
    IdMarca: string;
    Marca: string;
}