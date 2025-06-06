import { ProductSellsInterface } from "../../interface";
import ClassInterface from "../../interface/class";
import { UnitsInterface } from "../../interface/other";

// Params
interface GetProductsSellsParams {
    pageParam: number;
    limit?: number;
};

interface GetProductByEnlacemobParams {
    idinvearts: number;
    idinveclas: number;
    capa: string;
}

// Response
interface GetProductsSellsResponse {
    data: {
        products: ProductSellsInterface[]
    },
    nextPage?: number,
    error?: unknown
};

interface GetProductsSellsFromFamilyResponse {
    classes: ClassInterface[]
};

interface GetUnitsResponse {
    units: UnitsInterface[]
};

interface GetProductByEnlacemobResponse {
    products?: ProductSellsInterface
}

export type {
    GetProductsSellsParams,
    GetProductByEnlacemobParams,
    GetProductsSellsResponse,
    GetProductsSellsFromFamilyResponse,
    GetUnitsResponse,
    GetProductByEnlacemobResponse
}