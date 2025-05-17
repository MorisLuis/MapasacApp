import { api } from "../../api/api";
import { postInveartReponse, postSellsParams, postSellsRestaurantParams } from "./inveart.interface";

const postInventory = async (): Promise<postInveartReponse> => {
    const { data: { message, folio } } = await api.post<postInveartReponse>('/api/invearts/inventory');
    return { message, folio };

}
const postSells = async ({
    clavepago,
    idclientes,
    comments
}: postSellsParams ): Promise<postInveartReponse> => {

    const sellBody = {
        clavepago,
        idclientes,
        comments
    };

    const { data: { message, folio } } = await api.post<postInveartReponse>(`/api/invearts/sell`, sellBody);
    return { message, folio };

};

const postSellsRestaurant = async ({
    clavepago,
    comments,
    domicilio,
    idviaenvio
}: postSellsRestaurantParams): Promise<postInveartReponse> => {

    const sellRestaurantBody = {
        clavepago,
        comments,
        domicilio,
        idviaenvio
    };

    const { data: { message, folio } } = await api.post<postInveartReponse>(`/api/invearts/sellRestaurant`, sellRestaurantBody);
    return { message, folio };

};


export {
    postInventory,
    postSells,
    postSellsRestaurant
}