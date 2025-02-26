import { api } from "../api/api";

interface sendErrorInterface {
    From: string;
    Message: string;
    Id_Usuario: number;
    Metodo: string;
    code: string;
}


export const sendError = async ({
    From,
    Message,
    Id_Usuario,
    Metodo,
    code,
}: sendErrorInterface) => {

    const errorBody = {
        From,
        Message,
        Id_Usuario,
        Metodo,
        code
    }

    try {
        const error = await api.post(`/api/errors/front`, errorBody);
        return error;
    } catch (error) {
        return { error: error };
    }

}
