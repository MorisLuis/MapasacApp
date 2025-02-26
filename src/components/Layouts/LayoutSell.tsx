import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { SellsScreenStyles } from '../../theme/Screens/Sells/SellsScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface/productSells';
import { format } from '../../utils/currency';
import { globalStyles } from '../../theme/appTheme';
import { ActivityIndicator } from 'react-native-paper';
import { getTotalPriceBag } from '../../services/bag';
import { getTotalProductSells } from '../../services/productsSells';
import { useFocusEffect } from '@react-navigation/native';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../UI/CustumText';
import LayoutGrandient from './LayoutGrandient';
import { AuthContext } from '../../context/auth/AuthContext';
import LayoutSellSkeleton from '../Skeletons/Screens/LayoutSellSkeleton';
import { opcionBag } from '../../interface/bag';
import useDataShowedInLayoutSell from '../../hooks/useDataShowedInLayoutSell';

export type CombinedSellsInterface = ProductSellsInterface | ProductSellsRestaurantInterface;

interface LayoutSellInterface {
    renderItem: ({ item }: { item: CombinedSellsInterface }) => React.JSX.Element;
    opcion: opcionBag;
    handleGetProducts: (currentPage: number) => void;
    products: CombinedSellsInterface[];
    isLoading: boolean;
    layoutColor?: 'red' | 'purple'
}

export const LayoutSell = ({
    renderItem,
    opcion,
    handleGetProducts,
    products,
    isLoading,
    layoutColor = 'purple'
}: LayoutSellInterface) => {

    const { theme } = useTheme();
    const { status } = useContext(AuthContext);
    const { keyExtractor, handleUpdateSummary, productAdded } = useDataShowedInLayoutSell()
    const { handleError } = useErrorHandler();

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const loadMoreItem = () => {
        if (products.length < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleGetPrice = async () => {
        try {
            const totalprice = await getTotalPriceBag({ opcion: opcion });
            if (totalprice?.error) return handleError(totalprice.error)
            setTotalPrice(parseFloat(totalprice ?? 0));
        } catch (error) {
            handleError(error);
        };
    };

    const renderFooter = useCallback(() => (
        isLoading ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    const getTotalCountOfProducts = async () => {
        const total = await getTotalProductSells();
        if (total?.error) return handleError(total.error);
        setTotalProducts(Number(total));
    };

    useEffect(() => {
        getTotalCountOfProducts()
    }, [])

    useFocusEffect(
        useCallback(() => {
            handleGetProducts(currentPage);
            handleUpdateSummary();
            return () => { };
        }, [currentPage])
    );

    useEffect(() => {
        if (status !== 'authenticated') return;
        handleGetPrice();
    }, [productAdded, handleUpdateSummary]);

    if (products.length < 1) {
        return <LayoutSellSkeleton />
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
                        numColumns={2}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ gap: globalStyles(theme).globalPadding.padding }}
                        columnWrapperStyle={{ gap: globalStyles(theme).globalPadding.padding }}
                        ListFooterComponent={renderFooter}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0}
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
}

