import Toast from "react-native-toast-message";
import { api } from "../api/api";

const getProducts = async (PageNumber: number) => {

    try {
        const getProduct = await api.get(`/api/product?page=${PageNumber}&limit=10`);
        const products = getProduct.data.products;
        return products
    } catch (error) {
        return { error: error };
    };

}


const getProductDetails = async (idinvearts: number) => {

    try {
        const getProduct = await api.get(`/api/product/byid?idinvearts=${idinvearts}`);
        const product = getProduct.data.product;
        return product
    } catch (error) {
        return { error: error };
    }

}


const getProductByCodeBar = async ({ codeBar }: { codeBar: string }) => {

    try {
        const getProduct = await api.get(`/api/product/bycodebar?codbarras=${codeBar}`);
        const product = getProduct.data.product;
        return product
    } catch (error) {
        return { error: error };
    }

};

const getProductByClave = async ({ clave }: { clave: string }) => {

    try {
        const getProduct = await api.get(`/api/product/byclave?clave=${clave}`);
        const product = getProduct.data.product;
        return product;
    } catch (error) {
        return { error: error };
    }

};

const getProductByNoArticulo = async ({ noarticulo }: { noarticulo: string }) => {

    try {
        const getProduct = await api.get(`/api/product/bynoarticulo?noarticulo=${noarticulo}`);
        const product = getProduct.data.product;
        return product
    } catch (error) {
        return { error: error };
    }

};



const getTotalProducts = async () => {

    try {
        const getProduct = await api.get(`/api/product/total`);
        const total = getProduct.data.total;
        return total;
    } catch (error) {
        return { error: error };
    }

}

interface updateProductInterface {
    idinvearts: number;
    data: string | number;
    dataValue: string;
    onFinish?: () => void
}

const updateProduct = async ({
    idinvearts,
    data,
    dataValue,
    onFinish
}: updateProductInterface) => {

    const payload = {
        [dataValue]: data
    };

    try {
        const product = await api.put(`/api/product/${idinvearts}`, payload);
        Toast.show({
            type: 'tomatoToast',
            text1: `Se actualizó ${dataValue}!`
        });

        return product;
    } catch (error) {
        return { error: error };
    } finally {
        onFinish?.()
    }

}



export {
    getProducts,
    getProductByCodeBar,
    getProductByClave,
    getProductByNoArticulo,
    getTotalProducts,
    getProductDetails,
    updateProduct
}