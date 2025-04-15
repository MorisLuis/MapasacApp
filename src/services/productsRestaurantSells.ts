import { api } from "../api/api";
import { ProductSellsRestaurantInterface } from "../interface";


const getProductsRestaurantSells = async (
    PageNumber: number
): Promise<{ products: ProductSellsRestaurantInterface[] }> => {

    const { data } = await api.get(`/api/product/sellsRestaurant?page=${PageNumber}&limit=10`);
    return { products: data.products };
};

const getProductDetailsRestaurantSells = async (cvefamilia: number): Promise<{ product?: ProductSellsRestaurantInterface[] }> => {

    const { data } = await api.get<{ product?: ProductSellsRestaurantInterface[] }>(`/api/product/sellsRestaurant/byid?cvefamilia=${cvefamilia}`);
    return { product: data.product };

}


export {
    getProductsRestaurantSells,
    getProductDetailsRestaurantSells
}
