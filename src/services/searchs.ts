import { api } from "../api/api";

interface SearchInterface {
    searchTerm: string;
    opcion: number;
}


const getSearchProductInBack = async ({ searchTerm, opcion }: SearchInterface) => {

    try {
        const getProduct = await api.get(`/api/search/productInBag?term=${searchTerm}&opcion=${opcion}`);
        const products = getProduct.data.products;
        return products
    } catch (error) {
        return { error: error };
    }

}

const getSearchProductInStock = async ({ searchTerm }: { searchTerm : string }) => {

    try {
        const getProduct = await api.get(`/api/search/product?term=${searchTerm}`);
        const products = getProduct.data.products;
        return products
    } catch (error) {
        return { error: error };
    }

}

const getSearchClients = async ({ searchTerm }: { searchTerm : string }) => {

    try {
        const getProduct = await api.get(`/api/search/clients?term=${searchTerm}`);
        const products = getProduct.data.clients;
        return products;
    } catch (error) {
        return { error: error };
    }

}


export {
    getSearchProductInStock,
    getSearchProductInBack,
    getSearchClients
}