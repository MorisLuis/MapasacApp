import { UnitType } from "../../interface";


interface SellsBagInterface {
    numberOfItemsSells: number;
};

const SELLS_BAG_INITIAL_STATE: SellsBagInterface = {
    numberOfItemsSells: 0
};

type SellsBagForm = {
    pieces: string;
    price: string;
    units: UnitType;
    capa: string;
    idinveclas: number;
    idinvearts: number;
};


const SELLS_BAG_FORM_INITIAL_STATE: SellsBagForm = {
    pieces: '',
    price: '',
    units: {
        value: '',
        id: 0
    },
    capa: '',
    idinvearts: 0,
    idinveclas: 0
}

export type {
    SellsBagInterface,
    SellsBagForm
}

export {
    SELLS_BAG_INITIAL_STATE,
    SELLS_BAG_FORM_INITIAL_STATE

}