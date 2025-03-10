export interface ProductSellsInterface {

    imagen?: string;
    idinvefami: number;
    cvefamilia?: number;
    descripcio?: string;
    producto?: string;

    /* Thhis next to variables comes from fn_invearts_cvefamilia_mob */
    /* Es el id del consecutivo de a tabla de productos llamada invearts. */
    ridinvearts?: number;

    /* Es el consecutivo de la tabla de clases de productos lamada inveclas, ejemplo de un producto, chile serrano, clase joso */
    ridinveclas?: number;

    //clase?: string; 
    capa?: string;

    cantidad?: number;
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