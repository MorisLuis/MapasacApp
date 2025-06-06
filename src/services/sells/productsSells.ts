import { api } from "../../api/api";
import { ProductSellsInterface } from "../../interface";
import { LIMIT_SIZE, NUMBER_0, NUMBER_1 } from "../../utils/globalConstants";
import { GetProductByEnlacemobParams, GetProductByEnlacemobResponse, GetProductsSellsFromFamilyResponse, GetProductsSellsParams, GetProductsSellsResponse, GetUnitsResponse } from "./productsSells.interface";


const getProductsSells = async ({ pageParam = NUMBER_1, limit = LIMIT_SIZE }: GetProductsSellsParams): Promise<GetProductsSellsResponse> => {

    const { data } = await api.get<{ products: ProductSellsInterface[] }>(`/api/product/sells`, {
        params: { page: pageParam, limit },
        timeout: 7000
    });

    return {
        data,
        nextPage: data.products.length === limit ? pageParam + NUMBER_1 : undefined,
    };

};

const getProductsSellsFromFamily = async (cvefamilia: number): Promise<GetProductsSellsFromFamilyResponse> => {

    const { data } = await api.get<GetProductsSellsFromFamilyResponse>(`/api/product/sells/byfamily?cvefamilia=${cvefamilia}`);
    return { classes: data.classes };

};

const getUnits = async (): Promise<GetUnitsResponse> => {

    const { data } = await api.get<GetUnitsResponse>(`/api/product/sells/units`);
    return { units: data.units };

}

const getProductByEnlacemob = async ({ idinvearts, idinveclas, capa }: GetProductByEnlacemobParams): Promise<GetProductByEnlacemobResponse> => {
    const { data: { products } } = await api.get<GetProductByEnlacemobResponse>(`/api/product/sells/byenlacemob`, {
        params: { idinvearts, idinveclas, capa }
    });
    return { products };
}

const getTotalProductSells = async (): Promise<{ total: number }> => {

    const { data: { total } } = await api.get<{ total: number }>(`/api/product/sells/total`);
    return { total };

}

const getTotalClassesSells = async (cvefamilia: number): Promise<{ total: number }> => {

    const { data } = await api.get<{ total: number }>(`/api/product/sells/totalclasses?cvefamilia=${cvefamilia}`);
    return { total: data.total };
}

const getIdinveartsProduct = async (cvefamilia: number): Promise<{ idinvearts: number }> => {

    if (cvefamilia === NUMBER_0) return { idinvearts: 0 }
    const { data: { idinvearts } } = await api.get<{ idinvearts: number }>(`/api/product/sells/getidinvearts?cvefamilia=${cvefamilia}`);
    return { idinvearts };

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