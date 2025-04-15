import { api } from "../api/api";
import { TypeEnvio } from "../interface";

const postInventory = async (): Promise<{ message?: string, folio?: string }> => {
    const { data: { message, folio } } = await api.post<{ message: string, folio: string }>('/api/invearts/inventory');
    return { message, folio };

}

export interface postSellsInterface {
    clavepago: number;
    idclientes?: number;
    comments?: string;
    domicilio?: string;
    opcion: 2 | 4;
    idviaenvio?: TypeEnvio
}

const postSells = async ({
    clavepago,
    idclientes,
    comments,
    opcion,
    domicilio,
    idviaenvio
}: postSellsInterface): Promise<{ message?: string, folio?: string }> => {
    const sellBody = {
        clavepago,
        idclientes,
        comments,
        domicilio,
        idviaenvio
    };

    const { data: { message, folio } } = await api.post<{ message: string, folio: string }>(`/api/invearts/sell?opcion=${opcion}`, sellBody);
    return { message, folio };

};

export {
    postInventory,
    postSells
}