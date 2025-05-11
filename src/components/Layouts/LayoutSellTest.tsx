import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    FlatListProps,
    SafeAreaView,
    View,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MODULES_COLUMNS_LANDSCAPE, MODULES_COLUMNS_PORTRAIT } from '../../utils/globalConstants';
import { useResponsive } from '../../hooks/useResponsive';
import LayoutGrandient from './LayoutGrandient';
import { SellsScreenStyles } from '../../theme/Screens/Sells/SellsScreenTheme';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { globalStyles } from '../../theme/appTheme';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { opcionBag } from '../../interface';
import { FetchPostsParams, ProductsPaginated } from '../../services/restaurants/productsRestaurantSells.interface';
import { getTotalPriceBag } from '../../services';
import { ErroScreen } from '../../screens/ErrorScreen';
import LayoutSellSkeleton from '../Skeletons/Screens/LayoutSellSkeleton';

export interface LayoutSellInterface<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem' | 'onEndReached' | 'ListFooterComponent'> {
    layoutColor: 'red' | 'purple';
    opcion: opcionBag;

    /** Se usa para disparar el efecto que recalcula el precio cuando cambia */
    productAdded: boolean;

    queryKey: readonly unknown[];
    queryFn: ({ pageParam, limit }: FetchPostsParams) => Promise<ProductsPaginated<T>>;
    renderItem: ({ item }: { item: T }) => React.ReactElement;
};

const TOTAL_PRICE_DEFAULT = 0;
const PERCENTAGE_BOTTOM_PADDING = '5%';

export const LayoutSellTest = <T,>({
    queryKey,
    queryFn,
    renderItem,
    ListEmptyComponent,
    ListHeaderComponent,
    layoutColor,
    opcion,
    productAdded,
    ...flatListProps
}: LayoutSellInterface<T>): React.ReactElement => {

    const { isLandscape } = useResponsive();
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const [totalPrice, setTotalPrice] = useState<number>(TOTAL_PRICE_DEFAULT);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isError
    } = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => queryFn({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1
    });

    const handleGetPrice = useCallback(async (): Promise<void> => {
        const { total } = await getTotalPriceBag({ opcion: opcion }); // ⚠️ Segun valor de 'opcion' obtiene la suma actual.
        setTotalPrice(total ?? TOTAL_PRICE_DEFAULT);
    }, [opcion, productAdded]); // ⚠️ Dependencia `productAdded` forza el cálculo cuando cambia un producto

    useEffect(() => {
        handleGetPrice();
    }, [handleGetPrice])

    if (isLoading) {
        return <LayoutSellSkeleton />;
    }

    const items = data?.pages.flatMap(page => page.data.products) ?? [];

    if (isError) {
        return (
            <LayoutGrandient color={layoutColor}>
                <View style={SellsScreenStyles(theme).SellsScreen}>
                    <ErroScreen title={'No pudimos cargar los productos.'} onRetry={refetch} />
                </View>
            </LayoutGrandient>
        )
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
                                isLoading ? 'Calculando...' : format(totalPrice)
                            }
                        </CustomText>
                    </View>

                    <FlatList
                        {...flatListProps}
                        data={items}
                        renderItem={renderItem}
                        numColumns={isLandscape ? MODULES_COLUMNS_LANDSCAPE : MODULES_COLUMNS_PORTRAIT}
                        contentContainerStyle={{
                            gap: globalStyles().globalPadding.padding,
                            paddingBottom: insets.bottom + heightPercentageToDP(PERCENTAGE_BOTTOM_PADDING),
                        }}
                        ListEmptyComponent={ListEmptyComponent}
                        ListHeaderComponent={ListHeaderComponent}
                        onEndReached={() => {
                            if (!hasNextPage || isFetchingNextPage) return;
                            fetchNextPage();
                        }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            isFetchingNextPage ? (
                                <ActivityIndicator style={{ margin: globalStyles().globalMarginBottom.marginBottom }} />
                            ) : null
                        }
                        columnWrapperStyle={{ gap: globalStyles().globalPadding.padding }}
                        ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    );
};
