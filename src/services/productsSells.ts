import { api } from "../api/api";
import { ProductSellsInterface } from "../interface";
import ClassInterface from "../interface/class";
import { UnitsInterface } from "../interface/other";


const getProductsSells = async (
    PageNumber: number
): Promise<{ products: ProductSellsInterface[] }> => {

    const { data } = await api.get<{ products: ProductSellsInterface[] }>(`/api/product/sells?page=${PageNumber}&limit=10`);
    return { products: data.products };

};

const getProductsSellsFromFamily = async (
    cvefamilia: number
): Promise<{ classes: ClassInterface[] }> => {

    const { data } = await api.get<{ classes: ClassInterface[] }>(`/api/product/sells/byfamily?cvefamilia=${cvefamilia}`);
    return { classes: data.classes };
};

const getUnits = async (): Promise<{ units: UnitsInterface[] }> => {

    const { data } = await api.get<{ units: UnitsInterface[] }>(`/api/product/sells/units`);
    return { units: data.units };

}

interface getProductByEnlacemobInterface {
    idinvearts: number;
    idinveclas: number;
    capa: string;
}

const getProductByEnlacemob = async ({
    idinvearts,
    idinveclas,
    capa
}: getProductByEnlacemobInterface): Promise<{ product?: ProductSellsInterface }> => {

    const { data } = await api.get<{ products?: ProductSellsInterface }>(`/api/product/sells/byenlacemob?idinvearts=${idinvearts}&idinveclas=${idinveclas}&capa=${capa}`);
    return { product: data.products };

}

const getTotalProductSells = async (): Promise<{ total: number }> => {

    const { data } = await api.get<{ total: number }>(`/api/product/sells/total`);
    return { total: data.total };

}

const getTotalClassesSells = async (cvefamilia: number): Promise<{ total: number }> => {

    const { data } = await api.get<{ total: number }>(`/api/product/sells/totalclasses?cvefamilia=${cvefamilia}`);
    return { total: data.total };
}

const getIdinveartsProduct = async (cvefamilia: number): Promise<{ idinvearts: number }> => {

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