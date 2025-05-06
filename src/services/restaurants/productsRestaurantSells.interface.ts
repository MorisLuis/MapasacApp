import { ProductSellsRestaurantInterface } from "../../interface";


interface FetchPostsParams {
    pageParam: number;
    limit?: number;
};


interface ProductsPaginated<T> {
    data: {
        products: T[];
    };
    nextPage?: number;
}


interface ProductsResponse {
    data: {
        products: ProductSellsRestaurantInterface[]
    },
    nextPage?: number
}

export type {
    FetchPostsParams,
    ProductsResponse,
    ProductsPaginated
}