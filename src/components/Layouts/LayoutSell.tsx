import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    FlatListProps,
    SafeAreaView,
    View,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useResponsive } from '../../hooks/UI/useResponsive';
import LayoutGrandient from './LayoutGrandient';
import { SellsScreenStyles } from '../../theme/Screens/Sells/SellsScreenTheme';
import CustomText from '../UI/CustumText';
import { format } from '../../utils/currency';
import { globalStyles } from '../../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface';
import { FetchPostsParams, ProductsPaginated } from '../../services/restaurants/productsRestaurantSells.interface';
import { ErroScreen } from '../../screens/ErrorScreen';
import LayoutSellSkeleton from '../Skeletons/Screens/LayoutSellSkeleton';
import { useTheme } from '../../hooks/styles/useTheme';

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
const SELLS_COLUMNS_LANDSCAPE = 4 
const SELLS_COLUMNS_PORTRAIT = 2;

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
    const { theme, size } = useTheme();
    const insets = useSafeAreaInsets();
    const numSellsCol = isLandscape ? SELLS_COLUMNS_LANDSCAPE : SELLS_COLUMNS_PORTRAIT

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
        initialPageParam: 1,
        retry: false
    });

    if (isLoading) {
        return <LayoutSellSkeleton />;
    }

    const items = data?.pages.flatMap(page => page.data.products) ?? [];

    if (isError) {
        return (
            <LayoutGrandient color={layoutColor}>
                <View>
                    <ErroScreen title={'No pudimos cargar los productos.'} onRetry={refetch} />
                </View>
            </LayoutGrandient>
        )
    };

    return (
        <LayoutGrandient color={layoutColor}>
            <SafeAreaView>
                <View style={SellsScreenStyles(theme, size).SellsScreen}>

                    <View style={SellsScreenStyles(theme, size).header}>
                        <CustomText style={SellsScreenStyles(theme, size).header_title}>Pedidos</CustomText>
                        <CustomText style={SellsScreenStyles(theme, size).header_subtitle}>Total de pedido</CustomText>
                        <CustomText style={[SellsScreenStyles(theme, size).header_total]}>
                            {
                                (isLoading || productAdded) ? 'Calculando...' : format(sumPrice)
                            }
                        </CustomText>
                    </View>

                    <FlatList
                    key={isLandscape ? 'landscape' : 'portrait'}
                        {...flatListProps}
                        data={items}
                        renderItem={renderItem}
                        numColumns={numSellsCol}
                        contentContainerStyle={{
                            gap: globalStyles().globalPadding.padding,
                            paddingBottom: insets.bottom + size(PERCENTAGE_BOTTOM_PADDING),
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
