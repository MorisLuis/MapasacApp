import React, { useCallback } from 'react';
import { getSearchProductInStock } from '../../services/searchs';
import useErrorHandler from '../../hooks/useErrorHandler';
import CardSelect from '../../components/Cards/CardSelect';
import { LayoutSearch } from '../../components/Layouts/LayoutSearch';
import { getProducts } from '../../services/products';
import ProductInterface from '../../interface/product';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import { InventoryNavigationProp } from '../../interface/navigation';

type SearchProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, 'searchProductScreen'>;
type ModalSearchProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - searchProductModal'>;

type SearchProductScreenInterface = {
    route: SearchProductPageRouteProp | ModalSearchProductPageRouteProp
};

export const SearchProductScreen = ({ route }: SearchProductScreenInterface) => {

    const { handleError } = useErrorHandler()
    const { modal, isModal } = route.params;
    const { navigate, goBack } = useNavigation<InventoryNavigationProp>();

    const handleGetClient = async (page: number) => {
        let newClients
        try {
            newClients = await getProducts(page);
            if (newClients.error) return handleError(newClients.error);
            return newClients;
        } catch (error) {
            handleError(error)
        }
        return newClients;
    }

    const handleSearchClient = async (text: string) => {
        let clientsSearch
        try {
            clientsSearch = await getSearchProductInStock({ searchTerm: text });
            if (clientsSearch.error) return handleError(clientsSearch.error);
            return clientsSearch;
        } catch (error) {
            handleError(error)
        }
        return clientsSearch;
    }

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => (
        <CardSelect
            onPress={() => navigateToProduct(item)}
            message={item.producto.trim()}
            subMessage={`Clave: ${item.clave}`}
            showSelect={false}
        />
    ), []);

    const navigateToProduct = (selectedProduct: ProductInterface) => {
        if (modal) {
            if (isModal) {
                goBack();
                navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: true });
            } else {
                navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: true });
            }
        } else {
            navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: false });
        }
    };

    return (
        <LayoutSearch
            handleGetItem={handleGetClient}
            handleSearchItem={handleSearchClient}
            renderItem={renderItem}
            title='producto'
            footerVisible={false}
        />
    );
};
