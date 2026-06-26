export interface ServicioConsulta {
    IdMovimiento: number;
    FolioOE:      number | null;
    IdCliente:    number;
    IdVehiculo:   number;
    TipMov:       number | null;
    Estado:       string | null;
    FEntrada:     string | null;
    FSalida:      string | null;
    Kms:          number | null;
    Autoriza:     string | null;
    Ingreso:      string | null;
    'Observación': string | null;
    cliente: {
        Nombre: string;
        RFC:    string | null;
    } | null;
    vehiculo: {
        Placas: string;
        Modelo: string | null;
        Año:    number | null;
        Color:  string | null;
        marca:  { Marca: string } | null;
    } | null;
}
