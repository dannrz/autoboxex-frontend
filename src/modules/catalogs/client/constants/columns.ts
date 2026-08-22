import type { Columns } from "@/utils/tables/interfaces/Colums.interface";

export const columns: Array<Columns> = [
    { field: 'IdCliente', header: 'ID' },
    { field: 'Nombre', header: 'Nombre' },
    { field: 'RFC', header: 'RFC' },
    { field: 'Sucursal', header: 'Sucursal' },
    { field: 'Direccion', header: 'Calle y Núm.' },
    { field: 'Colonia', header: 'Colonia' },
    { field: 'Poblacion', header: 'Alcaldía/Municipio' },
    { field: 'Estado', header: 'Estado' },
    { field: 'CP', header: 'Código Postal' },
    { field: 'Telefono', header: 'Telefono' },
    { field: 'eMail', header: 'Correo Electrónico' },
    { field: 'Credito', header: 'Crédito' },
    { field: 'Contacto', header: 'Contacto' },
    { field: 'ManoObra', header: 'Mano de Obra' },
    { field: 'Descuento', header: 'Descuento' },
];