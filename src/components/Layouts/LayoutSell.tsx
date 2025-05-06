import React, { JSX, useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import { SellsScreenStyles } from '../../theme/Screens/Sells/SellsScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { globalStyles } from '../../theme/appTheme';
import { getTotalPriceBag } from '../../services/bag';
import { getTotalProductSells } from '../../services/productsSells';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../UI/CustumText';
import LayoutGrandient from './LayoutGrandient';
import { AuthContext } from '../../context/auth/AuthContext';
import LayoutSellSkeleton from '../Skeletons/Screens/LayoutSellSkeleton';
import { opcionBag } from '../../interface/bag';
import useDataShowedInLayoutSell from '../../hooks/useDataShowedInLayoutSell';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface';
import { useResponsive } from '../../hooks/useResponsive';
import { MODULES_COLUMNS_LANDSCAPE, MODULES_COLUMNS_PORTRAIT } from '../../utils/globalConstants';

export type CombinedSellsInterface = ProductSellsInterface | ProductSellsRestaurantInterface;

interface LayoutSellInterface {
    renderItem: (_info: { item: CombinedSellsInterface }) => React.JSX.Element;
    opcion: opcionBag;
    handleGetProducts: (_currentPage: number) => void;
    products: CombinedSellsInterface[];
    isLoading: boolean;
    layoutColor?: 'red' | 'purple'
}

// Constantes para evitar magic numbers
const INITIAL_PAGE = 1;
const END_REACHED_THRESHOLD = 0;
const PERCENTAGE_BOTTOM_PADDING = '5%';
const TOTAL_PRICE_DEFAULT = 0;
const TOTAL_PRODUCTS_DEFAULT = 0;

export const LayoutSell = ({
    renderItem,
    opcion,
    handleGetProducts,
    products,
    isLoading,
    layoutColor = 'purple'
}: LayoutSellInterface): JSX.Element => {

    const { theme } = useTheme();
    const { status } = useContext(AuthContext);
    const { keyExtractor, handleUpdateSummary, productAdded } = useDataShowedInLayoutSell();
    const { handleError } = useErrorHandler();
    const { isLandscape } = useResponsive();

    const [totalPrice, setTotalPrice] = useState<number>(TOTAL_PRICE_DEFAULT);
    const [totalProducts, setTotalProducts] = useState(TOTAL_PRODUCTS_DEFAULT);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const insets = useSafeAreaInsets();

    const loadMoreItem = (): void => {
        if (products.length < totalProducts) {
            setCurrentPage(currentPage + INITIAL_PAGE);
        }
    };

    const handleGetPrice = useCallback(async (): Promise<void> => {
        try {
            const { total } = await getTotalPriceBag({ opcion: opcion });
            setTotalPrice(total ?? TOTAL_PRICE_DEFAULT);
        } catch (error) {
            handleError(error);
        };
    }, [opcion, handleError]);

    const renderFooter = useCallback(() => (
        isLoading ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    const getTotalCountOfProducts = useCallback(async (): Promise<void> => {
        const {total} = await getTotalProductSells();
        setTotalProducts(Number(total));
    }, []);

    useEffect(() => {
        getTotalCountOfProducts();
    }, [getTotalCountOfProducts]);

    useFocusEffect(
        useCallback(() => {
            handleGetProducts(currentPage);
            handleUpdateSummary();
            return (): void => { };
        }, [currentPage, handleUpdateSummary, handleGetProducts])
    );

    useEffect(() => {
        if (status !== 'authenticated') return;
        handleGetPrice();
    }, [productAdded, handleUpdateSummary, handleGetPrice, status]);

    if (products.length <= TOTAL_PRODUCTS_DEFAULT) {
        return <LayoutSellSkeleton />;
    }

    return (
        <LayoutGrandient color={layoutColor}>
            <SafeAreaView>
                <View style={SellsScreenStyles(theme).SellsScreen}>
                    <View style={SellsScreenStyles(theme).header}>
                        <CustomText style={SellsScreenStyles(theme).header_title}>Pedidos</CustomText>
                        <CustomText style={SellsScreenStyles(theme).header_subtitle}>Total de pedido</CustomText>
                        <CustomText style={[SellsScreenStyles(theme).header_total]}>
                            {
                                productAdded ? 'Calculando...' : format(totalPrice)
                            }
                        </CustomText>
                    </View>

                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        numColumns={isLandscape ? MODULES_COLUMNS_LANDSCAPE : MODULES_COLUMNS_PORTRAIT}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{
                            gap: globalStyles().globalPadding.padding,
                            paddingBottom: insets.bottom + heightPercentageToDP(PERCENTAGE_BOTTOM_PADDING),
                        }}
                        ListFooterComponent={renderFooter}
                        columnWrapperStyle={{ gap: globalStyles().globalPadding.padding }}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={END_REACHED_THRESHOLD}
                        ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    );
}
