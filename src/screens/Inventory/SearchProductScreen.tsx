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
    const { modal } = route.params;
    const { navigate, goBack } = useNavigation<InventoryNavigationProp>();

    const handleSearchClient = async (text: string) => {
        let clientsSearch;
        try {
            clientsSearch = await getSearchProductInStock({ searchTerm: text });
            if (clientsSearch.error) return handleError(clientsSearch.error);
            return clientsSearch;
        } catch (error) {
            handleError(error)
        }
        return clientsSearch;
    }

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

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => (
        <CardSelect
            onPress={() => {
                if (item.codbarras.trim() !== '') return;
                navigateToProduct(item)
            }}
            message={item.producto.trim()}
            subMessage={`Clave: ${item.clave.trim()} / ${item.codbarras.trim() === '' ? "SIN CODIGO" : item.codbarras.trim()}`}
            showSelect={false}
        />
    ), []);

    const navigateToProduct = (selectedProduct: ProductInterface) => {
        if (modal) {
            goBack();
            navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: false });
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
