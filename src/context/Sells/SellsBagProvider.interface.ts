import { ClientInterface, UnitType } from "../../interface";

/* Sells bag state */
interface SellsBagInterface {
    numberOfItemsSells: number;
    sumPriceOfItemsSells: number;
};

const SELLS_BAG_INITIAL_STATE: SellsBagInterface = {
    numberOfItemsSells: 0,
    sumPriceOfItemsSells: 0
};

/* Sells bag form */
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

/* Sells bag confirmation */
interface SellsBagConfirmationForm {
    comments: string;
    client?: ClientInterface
    methodPayment: number;
};

const SELLS_BAG_CONFIRMATION_FORM_INITIAL_STATE: SellsBagConfirmationForm = {
    comments: '',
    client: undefined,
    methodPayment: 0
}

export type {
    SellsBagInterface,
    SellsBagForm,
    SellsBagConfirmationForm
}

export {
    SELLS_BAG_INITIAL_STATE,
    SELLS_BAG_FORM_INITIAL_STATE,
    SELLS_BAG_CONFIRMATION_FORM_INITIAL_STATE
}