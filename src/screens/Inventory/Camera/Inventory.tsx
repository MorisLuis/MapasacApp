import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { getProducts, getTotalProducts } from '../../../services/products';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { InventoryScreenStyles } from '../../../theme/Screens/Inventory/InventoryScreenTheme';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import LayoutGrandient from '../../../components/Layouts/LayoutGrandient';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import Tag from '../../../components/UI/Tag';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';
import InventorySkeleton from '../../../components/Skeletons/Screens/InventorySkeleton';
import { InventoryNavigationProp } from '../../../interface/navigation';
import { ProductInterface } from '../../../interface';

const INITIAL_PAGE = 1;
const INITIAL_PRODUCTS = 0;
const PRODUCTS_INVENTORY_EMPTY = 0;

export const Inventory = (): React.ReactElement => {

    const { handleCodebarScannedProcces } = useContext(SettingsContext);
    const { handleError } = useErrorHandler()

    const { navigate } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [totalProducts, setTotalProducts] = useState(INITIAL_PRODUCTS);

    const handleGetProductsByStock = useCallback(async () : Promise<void> => {

        try {
            setIsLoading(true);
            const { products } = await getProducts(currentPage);
            setProductsInInventory((prevProducts) => {
                const newProducts = products?.filter(
                    (product: ProductInterface) =>
                        !prevProducts.some(
                            (prevProduct) =>
                                prevProduct.idinvearts === product.idinvearts
                        )
                );
                return prevProducts ? [...prevProducts, ...newProducts] : newProducts;
            });

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    }, [handleError, currentPage]);

    const loadMoreItem = () : void => {
        if (productsInInventory.length < totalProducts) {
            setCurrentPage(currentPage + INITIAL_PAGE);
        }
    };

    const handlePressProduct = (selectedProduct: ProductInterface) : void => {
        handleCodebarScannedProcces(false);
        navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: false });
    };

    const getTotalCountOfProducts = useCallback(async (): Promise<void> => {
        const { total } = await getTotalProducts();
        setTotalProducts(total);
    }, [])

    const renderItem = ({ item }: { item: ProductInterface }) : React.ReactElement => {
        return <ProductInventoryCard product={item} onClick={() => handlePressProduct(item)} />;
    };

    const resetInventory = useCallback(() => {
        setCurrentPage(INITIAL_PAGE);
    }, []);


    useFocusEffect(
        useCallback(() => {
            handleGetProductsByStock();
            return () : void => { };
        }, [handleGetProductsByStock])
    );

    useEffect(() => {
        getTotalCountOfProducts()
    }, [getTotalCountOfProducts])

    useFocusEffect(
        useCallback(() => {
            resetInventory();
            handleGetProductsByStock();
        }, [handleGetProductsByStock, resetInventory])
    );

    const renderFinalFooter = useCallback((): React.ReactElement => {
        return (
            <View>
                <CustomText style={InventoryScreenStyles(theme).footerMessage}>Estos son todos los productos que tienes.({totalProducts})</CustomText>
            </View>
        );
    }, [theme, totalProducts]);

    const renderFooter = useCallback(() => (
        isLoading ? <ActivityIndicator size="large" color={theme.color_primary} /> :
            totalProducts === productsInInventory.length ? renderFinalFooter() : null
    ), [totalProducts, isLoading, theme.color_primary, productsInInventory.length, renderFinalFooter]);

    if (productsInInventory.length <= PRODUCTS_INVENTORY_EMPTY) {
        return <InventorySkeleton />
    }


    return (
        <LayoutGrandient color="green">
            <SafeAreaView>
                <View style={InventoryScreenStyles(theme).content}>

                    <View style={InventoryScreenStyles(theme).header}>
                        <View style={InventoryScreenStyles(theme).headerContent}>
                            <CustomText style={InventoryScreenStyles(theme).title}>Inventario</CustomText>
                            <View style={InventoryScreenStyles(theme).subtitle}>
                                <Tag message={`${totalProducts} Productos`} color='green' />
                            </View>
                        </View>

                        <View style={InventoryScreenStyles(theme).actions}>
                            <Icon
                                name="search-outline"
                                size={globalFont.font_big}
                                style={InventoryScreenStyles(theme).iconSearch}
                                onPress={() => navigate('searchProductScreen', { modal: false })}
                                color={iconColor}
                            />
                        </View>
                    </View>

                    <FlatList
                        data={productsInInventory}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.idinvearts}`}
                        ListFooterComponent={renderFooter}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0}
                        ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                    />

                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
}

