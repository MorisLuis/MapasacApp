import React, { JSX, useCallback } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { getSearchProduct, getSearchProductWithoutCodBarras } from '../../services/searchs';
import useErrorHandler from '../../hooks/useErrorHandler';
import CardSelect from '../../components/Cards/CardSelect';
import { LayoutSearch } from '../../components/Layouts/LayoutSearch';
import { getProducts, getProductsWithoutCodBarras } from '../../services/products';
import { InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import { InventoryNavigationProp } from '../../interface/navigation';
import { ProductInterface } from '../../interface';

type SearchProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, 'searchProductScreen'>;
type ModalSearchProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - searchProductModal'>;

type SearchProductScreenInterface = {
    route: SearchProductPageRouteProp | ModalSearchProductPageRouteProp
};

export const SearchProductScreen = ({ route }: SearchProductScreenInterface): JSX.Element => {

    const { handleError } = useErrorHandler()
    const { modal } = route.params;
    const { navigate, goBack } = useNavigation<InventoryNavigationProp>();

    const handleSearchProduct = useCallback(async (text: string): Promise<ProductInterface[] | void> => {
        try {
            if (modal) {
                const { products } = await getSearchProductWithoutCodBarras({ searchTerm: text });
                return products;
            } else {
                const { products } = await getSearchProduct({ searchTerm: text });
                return products;
            }
        } catch (error) {
            handleError(error)
        }
        return [];
    }, [handleError])

    const handleGetProducts = useCallback(async (page: number): Promise<ProductInterface[] | void> => {
        try {

            if (modal) {
                const { products } = await getProductsWithoutCodBarras(page);
                return products;
            } else {
                const { products } = await getProducts(page);
                return products;
            }

        } catch (error) {
            handleError(error)
        }
        return []
    }, [handleError])

    const navigateToProduct = useCallback((selectedProduct: ProductInterface): void => {
        if (modal) {
            goBack();
            navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: false });
        } else {
            console.log({ selectedProduct })
            navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: false });
        }
    }, [goBack, navigate, modal]);

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => (
        <CardSelect
            onPress={() => navigateToProduct(item)}
            message={item.producto.trim()}
            subMessage={`Clave: ${item.clave.trim()} / ${item.codbarras.trim() === '' ? "SIN CODIGO" : item.codbarras.trim()}`}
            showSelect={false}
        />
    ), [navigateToProduct]);

    return (
        <LayoutSearch
            handleGetItem={handleGetProducts}
            handleSearchItem={handleSearchProduct}
            renderItem={renderItem}
            title='producto'
            footerVisible={false}
        />
    );
};
