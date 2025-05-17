import { shimpentMethodInterface } from "../../screens/SellsRestaurants/SellsRestaurantsBag/ShimpentScreen";

// PARAMS
interface BaseSaleBody {
    clavepago: number;
    comments?: string;
}

interface postSellsParams extends BaseSaleBody {
    idclientes?: number;
};

interface postSellsRestaurantParams extends BaseSaleBody {
    domicilio?: string;
    idviaenvio?: shimpentMethodInterface['id'];
};

// RESPONSE
interface postInveartReponse {
    message: string, 
    folio: string
}


export type {
    postSellsParams,
    postSellsRestaurantParams,

    postInveartReponse
}