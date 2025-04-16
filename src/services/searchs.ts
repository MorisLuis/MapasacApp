import { api } from "../api/api";
import { ClientInterface, ProductInterface } from "../interface";

interface SearchInterface {
    searchTerm: string;
    opcion: number;
}


const getSearchProductInBag = async ({ searchTerm, opcion }: SearchInterface): Promise<{ products: ProductInterface[] }> => {

    const { data } = await api.get<{ products: ProductInterface[] }>(`/api/search/productInBag?term=${searchTerm}&opcion=${opcion}`);
    return { products: data.products };

}

const getSearchProduct = async ({ searchTerm }: { searchTerm: string }): Promise<{ products: ProductInterface[] }> => {
    const { data } = await api.get<{ products: ProductInterface[] }>(`/api/search/product?term=${searchTerm}`);
    return { products: data.products };
};

const getSearchProductWithoutCodBarras = async ({ searchTerm }: { searchTerm: string }): Promise<{ products: ProductInterface[] }> => {
    const { data } = await api.get<{ products: ProductInterface[] }>(`/api/search/product?term=${searchTerm}&codebarEmpty=${true}`);
    return { products: data.products };
}


const getSearchClients = async ({ searchTerm }: { searchTerm: string }): Promise<{ clients: ClientInterface[] }> => {
    const { data } = await api.get<{ clients: ClientInterface[] }>(`/api/search/clients?term=${searchTerm}`);
    return { clients: data.clients };

}


export {
    getSearchProduct,
    getSearchProductWithoutCodBarras,
    getSearchProductInBag,
    getSearchClients
}