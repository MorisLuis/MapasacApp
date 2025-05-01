
import Toast from "react-native-toast-message";

import { api } from "../api/api";
import { ProductInterface } from "../interface";

const getProducts = async (PageNumber: number): Promise<{ products: ProductInterface[] }> => {

    const { data } = await api.get<{ products: ProductInterface[] }>(`/api/product?page=${PageNumber}&limit=10`);
    return { products: data.products };

};

const getProductsWithoutCodBarras = async (PageNumber: number): Promise<{ products: ProductInterface[] }> => {
    const { data } = await api.get<{ products: ProductInterface[] }>(`/api/product?page=${PageNumber}&limit=10&codebarEmpty=${true}`);
    return { products: data.products };
}


const getProductDetails = async (
    idinvearts: number
): Promise<{ product?: ProductInterface }> => {

    const { data } = await api.get<{ product: ProductInterface }>(`/api/product/byid?idinvearts=${idinvearts}`);
    return { product: data.product };


}


const getProductByCodeBar = async (
    { codeBar }: { codeBar: string }
): Promise<{ product: ProductInterface[] }> => {

    const { data } = await api.get<{ product: ProductInterface[] }>(`/api/product/bycodebar?codbarras=${codeBar}`);
    return { product: data.product };

};

const getProductByClave = async ({ clave }: { clave: string }): Promise<{ product: ProductInterface[] }> => {

    const { data } = await api.get<{ product: ProductInterface[] }>(`/api/product/byclave?clave=${clave}`);
    return { product: data.product };

};

const getProductByNoArticulo = async ({ noarticulo }: { noarticulo: string }): Promise<{ product: ProductInterface[] }> => {

    const { data } = await api.get<{ product: ProductInterface[] }>(`/api/product/bynoarticulo?noarticulo=${noarticulo}`);
    return { product: data.product };

};



const getTotalProducts = async (): Promise<{ total: number }> => {

    const { data } = await api.get<{ total: number }>(`/api/product/total`);
    return { total: data.total };

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
}: updateProductInterface): Promise<{ message: string }> => {

    const payload = {
        [dataValue]: data
    };

    const { data: dataResponse } = await api.put<{ message: string }>(`/api/product/${idinvearts}`, payload);
    Toast.show({
        type: 'tomatoToast',
        text1: `Se actualizó ${dataValue}!`
    });
    onFinish?.()
    return { message: dataResponse.message };

}



export {
    getProducts,
    getProductsWithoutCodBarras,
    getProductByCodeBar,
    getProductByClave,
    getProductByNoArticulo,
    getTotalProducts,
    getProductDetails,
    updateProduct
}