export interface ClientForm {
    Nombre: string;
    RFC?: string | null;
    CP?: string | null;
    eMail?: string | null;
    Direccion?: string | null;
    Colonia?: string | null;
    Poblacion?: string | null;
    Estado?: string | null;
    Contacto?: string | null;
    Sucursal?: string | null;
    Credito?: number | null;
    Telefono?: string | null;
    Telefono2?: string | null;
    Telefono3?: string | null;
    Descuento?: number | null;
    ManoObra?: number | null;
}

export interface Client {
    IdCliente: number;
    Nombre: string;
    RFC: null | string;
    Sucursal: null | string;
    Direccion: null | string;
    Colonia: null | string;
    Poblacion: null | string;
    Estado: null | string;
    CP: null | string;
    Telefono: null | string;
    Telefono2: null | string;
    Telefono3: null | string;
    eMail: null | string;
    Credito: null | string;
    Contacto: null | string;
    ManoObra: null | string;
    Descuento: Descuento | null;
    vehiculos: Vehiculo[];
}

export enum Descuento {
    The00 = ".00",
}

export interface Vehiculo {
    IdCliente: string;
    IdVehiculo: number;
    Placas: null | string;
    IdMarca: null | string;
    Modelo: null | string;
    Año: null | string;
    Color: null | string;
    VIN: null | string;
    Serie: null | string;
    marca: Marca | null;
}

export interface Marca {
    IdMarca: number;
    Marca: string;
}
