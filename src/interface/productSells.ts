export interface ProductSellsInterface {

    imagen?: string;
    idinvefami: number;
    cvefamilia?: number;
    descripcio?: string;

    producto?: string;
    ridinvearts?: number;
    ridinveclas?: number;
    clase?: string;
    cantidad?: number;
    capa?: string;
    precio?: string;
    
    classcount?: string; // to know how many classes has.
    idenlacemob?: number;
    unidad_nombre?: string;
};

// Restaurant
export interface ProductSellsRestaurantFamilyInterface {
    imagen: string;
    idinvefami: number;
    cvefamilia: string;
    descripcio: string;
};

export interface ProductSellsRestaurantInterface {
    imagen: string;
    idinvefami: number;
    cvefamilia: string;
    descripcio: string;
    
    relacion: string;
    noarticulo: number;
    producto: string;
    clave?: string;
    precio: number;
    capa?: string;
    ctipo?: string;
    idinveclas: number;
    unidad: number;

    comentario?: string;
    cantidad?: number;
    idenlacemob?: number;
    unidad_nombre?: string;
    idinvearts?: number;
}