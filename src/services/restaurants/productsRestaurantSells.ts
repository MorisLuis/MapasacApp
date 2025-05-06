import { api } from "../../api/api";
import { ProductSellsRestaurantInterface } from "../../interface";
import { FetchPostsParams, ProductsResponse } from "./productsRestaurantSells.interface";

const getProductsRestaurantSells = async ({ pageParam = 1, limit = 10 }: FetchPostsParams): Promise<ProductsResponse> => {

    const { data } = await api.get<ProductsResponse['data']>(`/api/product/sellsRestaurant`, {
        params: { page: pageParam, limit },
    });

    return {
        data,
        nextPage: data.products.length === limit ? pageParam + 1 : undefined,
    };
};


const getProductDetailsRestaurantSells = async (cvefamilia: number): Promise<{ product?: ProductSellsRestaurantInterface[] }> => {

    const { data } = await api.get<{ product?: ProductSellsRestaurantInterface[] }>(`/api/product/sellsRestaurant/byid?cvefamilia=${cvefamilia}`);
    return { product: data.product };

}


export {
    getProductsRestaurantSells,
    getProductDetailsRestaurantSells
}
