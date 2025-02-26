import { api } from "../api/api";

const postInventory = async () => {

    try {
        const data = await api.post('/api/invearts/inventory');
        return data;
    } catch (error) {
        return { error: error };
    };

}

export interface postSellsInterface {
    clavepago: number; // tipo de pago
    idclientes?: number;
    comments?: string;
    domicilio?: string;
    opcion: 2 | 4;
    idviaenvio?: 0 | 1 | 2 | 3 | 4
}

const postSells = async ({ clavepago, idclientes, comments, opcion, domicilio, idviaenvio } : postSellsInterface ) => {
    try {
        const sellBody = {
            clavepago,
            idclientes,
            comments,
            domicilio,
            idviaenvio
        };

        const data = await api.post(`/api/invearts/sell?opcion=${opcion}`, sellBody);
        return data;
    } catch (error) {
        return { error: error };
    };

};

export {
    postInventory,
    postSells
}