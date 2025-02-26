import { api } from "../api/api";


const getProductsSells = async (PageNumber: number) => {

    try {
        const getProduct = await api.get(`/api/product/sells?page=${PageNumber}&limit=10`);
        const products = getProduct.data.products;
        return products
    } catch (error) {
        return { error: error };
    }

};

const getProductsSellsFromFamily = async (cvefamilia: number) => {

    try {
        const getProduct = await api.get(`/api/product/sells/byfamily?cvefamilia=${cvefamilia}`);
        const products = getProduct.data.products;
        return products;
    } catch (error) {
        return { error: error };
    }

};

const getUnits = async () => {

    try {
        const getUnits = await api.get(`/api/product/sells/units`);
        return getUnits.data.units;
    } catch (error) {
        return { error: error };
    }

}

interface getProductByEnlacemobInterface {
    idinvearts: number;
    idinveclas: number;
    capa: string;
}

const getProductByEnlacemob = async ({ idinvearts, idinveclas, capa }: getProductByEnlacemobInterface) => {

    try {
        const getProduct = await api.get(`/api/product/sells/byenlacemob?idinvearts=${idinvearts}&idinveclas=${idinveclas}&capa=${capa}`);
        const product = getProduct.data.product;
        return product;
    } catch (error) {
        return { error: error };
    }

}

const getTotalProductSells = async () => {

    try {
        const getProduct = await api.get(`/api/product/sells/total`);
        const total = getProduct.data.total;
        return total;
    } catch (error) {
        return { error: error };
    }

}

const getTotalClassesSells = async (cvefamilia: number) => {

    try {
        const getProduct = await api.get(`/api/product/sells/totalclasses?cvefamilia=${cvefamilia}`);
        const total = getProduct.data.total;
        return total
    } catch (error) {
        return { error: error };
    }

}

const getIdinveartsProduct = async (cvefamilia: number) => {

    try {
        const getProduct = await api.get(`/api/product/sells/getidinvearts?cvefamilia=${cvefamilia}`);
        const product = getProduct.data.product;
        return product
    } catch (error) {
        return { error: error };
    }

}

export {
    getProductsSells,
    getTotalProductSells,
    getProductsSellsFromFamily,
    getUnits,
    getProductByEnlacemob,
    getTotalClassesSells,
    getIdinveartsProduct
}