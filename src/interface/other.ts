export interface UnitsInterface {
    idinveunid: number;
    unidad: number;
    descripcio: string;
    abrevia: string;
}

export interface ClientInterface {
    idclientes: string;
    nombres: string;
    ncomercial: string;
}

export interface TypePaymentsInterface {
    idtipopago: string;
    clavepago: string;
    descrip: string;
};

export interface AddressInterface {
    telefono: string;
    direccion: string;
    numero: string;
    colonia: string;
    estado: string;
};

export interface ModuleInterface {
    idappmob: number;
    permisos: number;
    appmob: string;
    activo: string;
}

export type UnitData = {
    unidad: number;
    descripcio: string;
}