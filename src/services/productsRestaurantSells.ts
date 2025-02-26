import { api } from "../api/api";


const getProductsRestaurantSells = async (PageNumber: number) => {

    try {
        const getProduct = await api.get(`/api/product/sellsRestaurant?page=${PageNumber}&limit=10`);
        const products = getProduct.data.products;
        return products
    } catch (error) {
        return { error: error };
    }

};

const getProductDetailsRestaurantSells = async (cvefamilia: string) => {

    try {
        const getProduct = await api.get(`/api/product/sellsRestaurant/byid?cvefamilia=${cvefamilia}`);
        const product = getProduct.data.product;
        return product
    } catch (error) {
        return { error: error };
    };

}

const getTotalProductRestaurantSells = async () => {

    try {
        const getProduct = await api.get(`/api/product/sellsRestaurant/total`);
        const total = getProduct.data.total;
        return total;
    } catch (error) {
        return { error: error };
    };

}


export {
    getProductsRestaurantSells,
    getProductDetailsRestaurantSells,
    getTotalProductRestaurantSells
}
