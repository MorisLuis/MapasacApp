import { CombinedProductInterface } from "../../interface";

interface GetBagParams {
    pageParam: number;
    limit?: number;
    option: number;
};

interface GetBagResponse {
    data: {
        bag: CombinedProductInterface[]
    },
    nextPage?: number 
};


export type {
    GetBagParams,

    GetBagResponse
}