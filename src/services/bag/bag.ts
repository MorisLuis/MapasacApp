import { api } from "../../api/api";
import { CombinedProductInterface } from "../../interface";
import { addProductInBagInventoryInterface, bagInterface, deleteProductInBagInventoryInterface, updateProductInBagInterface } from "../../interface/bag";
import { LIMIT_SIZE, NUMBER_1 } from "../../utils/globalConstants";
import { GetBagParams, GetBagResponse } from "./bag.interface";


const getBagInventory = async ({ pageParam, limit = LIMIT_SIZE, option }: GetBagParams): Promise<GetBagResponse> => {
    const { data } = await api.get<{ bag: CombinedProductInterface[]; }>(`/api/bag?limit=${limit}&page=${pageParam}&option=${option}`);
    return {
        data,
        nextPage: data.bag.length === limit ? pageParam + NUMBER_1 : undefined,
    };
};

const getTotalProductsInBag = async ({ opcion }: bagInterface): Promise<{ total?: number }> => {
    const { data } = await api.get<{ total: number }>(`/api/bag/total?opcion=${opcion}`);
    return { total: data.total }
};

const getTotalPriceBag = async ({ opcion }: bagInterface): Promise<{ total?: number }> => {
    const { data } = await api.get<{ total: number }>(`/api/bag/price?opcion=${opcion}`);
    return { total: data.total }
};

const addProductInBag = async ({
    product,
    opcion
}: addProductInBagInventoryInterface): Promise<{ message?: string }> => {
    const { data } = await api.post<{ message: string }>("/api/bag", { ...product, opcion: opcion });
    return { message: data.message };
}

const updateProductInBag = async (
    body: updateProductInBagInterface
): Promise<{ message?: string }> => {
    const { data } = await api.put<{ message: string }>(`/api/bag`, body);
    return { message: data.message };
}

const deleteProductInBag = async ({
    idenlacemob
}: deleteProductInBagInventoryInterface): Promise<{ message?: string }> => {

    const { data } = await api.delete<{ message: string }>(`/api/bag/${idenlacemob}`);
    return { message: data.message };

}

const deleteAllProductsInBag = async ({
    opcion
}: bagInterface): Promise<{ message?: string }> => {

    const { data } = await api.delete<{ message: string }>(`/api/bag/all?opcion=${opcion}`);
    return { message: data.message };

}

export {
    getBagInventory,
    getTotalProductsInBag,
    getTotalPriceBag,
    addProductInBag,
    updateProductInBag,
    deleteProductInBag,
    deleteAllProductsInBag
}