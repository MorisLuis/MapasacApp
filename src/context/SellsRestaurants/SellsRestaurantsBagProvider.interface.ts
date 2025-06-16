import { UnitType } from "../../interface";
import { LocationValue } from "../../screens/SellsRestaurants/SellsRestaurantsBag/LocationScreen";
import { shimpentMethodInterface } from "../../screens/SellsRestaurants/SellsRestaurantsBag/ShimpentScreen";

/* Sells bag state */
interface SellsRestaurantBagInterface {
    numberOfItemsSellsRestaurant: number;
    sumPriceOfItemsSellsRestaurant: number;
};

const SELLS_BAG_RESTAURANT_INITIAL_STATE: SellsRestaurantBagInterface = {
    numberOfItemsSellsRestaurant: 0,
    sumPriceOfItemsSellsRestaurant: 0
};

/* Sells bag form */
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

/* Sells bag confirmation */
interface SellsBagRestaurantConfirmationForm {
    methodPayment: number;
    locationValue?: LocationValue;
    methodEnvio?: shimpentMethodInterface['id']
};



const SELLS_BAG_RESTAURANT_CONFIRMATION_FORM_INITIAL_STATE: SellsBagRestaurantConfirmationForm = {
    locationValue: undefined,
    methodPayment: 1,
    methodEnvio: 1
}


export {
    SELLS_BAG_RESTAURANT_INITIAL_STATE,
    SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE,
    SELLS_BAG_RESTAURANT_CONFIRMATION_FORM_INITIAL_STATE
}

export type {
    SellsRestaurantBagInterface,
    SellsRestaurantBagForm,
    SellsBagRestaurantConfirmationForm
}