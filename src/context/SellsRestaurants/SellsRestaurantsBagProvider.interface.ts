import { UnitType } from "../../interface";


interface SellsRestaurantBagInterface {
    numberOfItemsSells: number;
};

const SELLS_BAG_RESTAURANT_INITIAL_STATE: SellsRestaurantBagInterface = {
    numberOfItemsSells: 0
};


type SellsRestaurantBagForm = {
    cvefamilia?: number;
    pieces?: string;
    price?: number;
    typeClass?: UnitType;
    comments?: string;
    units?: number;
    capa?: string;
    idinvearts?: number;

    descripcio?: string;
    image?: string;
    totalClasses?: number;
};

const SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE: SellsRestaurantBagForm = {
    cvefamilia: undefined,
    pieces: '',
    price: undefined,
    typeClass: {
        value: '',
        id: 0
    },
    comments: '',
    units: undefined,
    capa: '',
    idinvearts: undefined,

    descripcio: '',
    image: '',
    totalClasses: 0,
}

export {
    SELLS_BAG_RESTAURANT_INITIAL_STATE,
    SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE
}

export type {
    SellsRestaurantBagInterface,
    SellsRestaurantBagForm
}