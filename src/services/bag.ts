import { AxiosError } from "axios";
import { api } from "../api/api";
import { addProductInBagInventoryInterface, bagInterface, deleteProductInBagInventoryInterface, getBagInterface, updateProductInBagInterface } from "../interface/bag";


const getBagInventory = async ({ page, limit, option }: getBagInterface) => {
    try {
        const { data } = await api.get(`/api/bag?limit=${limit}&page=${page}&option=${option}`);
        return data.bag
    } catch (error) {
        return { error: error };

    }
};

const getTotalProductsInBag = async ({ opcion }: bagInterface) => {

    try {
        const { data } = await api.get(`/api/bag/total?opcion=${opcion}`);
        return data.total
    } catch (error) {
        return { error: error };
    }

};

const getTotalPriceBag = async ({ opcion }: bagInterface) => {
    try {
        const { data } = await api.get(`/api/bag/price?opcion=${opcion}`);
        return data.total
    } catch (error) {
        return { error: error };

    }
};

const addProductInBag = async ({ product, opcion }: addProductInBagInventoryInterface) => {
    try {
        const data = await api.post(`/api/bag`, { ...product, opcion: opcion });
        return data;
    } catch (error) {
        return { error: error };

    }
}


const updateProductInBag = async (body: updateProductInBagInterface) => {

    try {
        const data = await api.put(`/api/bag`, body);
        return data
    } catch (error) {
        return { error: error };
    }
}

const deleteProductInBag = async ({ idenlacemob }: deleteProductInBagInventoryInterface) => {

    try {
        const { data } = await api.delete(`/api/bag/${idenlacemob}`);
        return data
    } catch (error) {
        return { error: error };

    }

}

const deleteAllProductsInBag = async ({ opcion }: bagInterface) => {

    try {
        const { data } = await api.delete(`/api/bag/all?opcion=${opcion}`);
        return data
    } catch (error) {
        return { error: error };

    };

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