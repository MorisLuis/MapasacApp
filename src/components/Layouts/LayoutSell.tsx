import React from 'react';
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
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface';
import { FetchPostsParams, ProductsPaginated } from '../../services/restaurants/productsRestaurantSells.interface';
import { ErroScreen } from '../../screens/ErrorScreen';
import LayoutSellSkeleton from '../Skeletons/Screens/LayoutSellSkeleton';

export type CombinedSellsInterface = ProductSellsInterface | ProductSellsRestaurantInterface;

export interface LayoutSellInterface<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem' | 'onEndReached' | 'ListFooterComponent'> {
    layoutColor: 'red' | 'purple';

    queryKey: readonly unknown[];
    queryFn: (_postParams: FetchPostsParams) => Promise<ProductsPaginated<T>>;
    renderItem: ( _item : { item: T }) => React.ReactElement;
    sumPrice: number;
    productAdded: boolean
};

const PERCENTAGE_BOTTOM_PADDING = '5%';

export const LayoutSell = <T,>({
    queryKey,
    queryFn,
    renderItem,
    ListEmptyComponent,
    ListHeaderComponent,
    layoutColor,
    sumPrice,
    productAdded,
    ...flatListProps
}: LayoutSellInterface<T>): React.ReactElement => {

    const { isLandscape } = useResponsive();
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

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
    };

    return (
        <LayoutGrandient color={layoutColor}>
            <SafeAreaView>
                <View style={SellsScreenStyles(theme).SellsScreen}>

                    <View style={SellsScreenStyles(theme).header}>
                        <CustomText style={SellsScreenStyles(theme).header_title}>Pedidos</CustomText>
                        <CustomText style={SellsScreenStyles(theme).header_subtitle}>Total de pedido</CustomText>
                        <CustomText style={[SellsScreenStyles(theme).header_total]}>
                            {
                                (isLoading || productAdded) ? 'Calculando...' : format(sumPrice)
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
