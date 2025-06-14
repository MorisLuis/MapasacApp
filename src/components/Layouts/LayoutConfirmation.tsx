import React, { JSX, useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from '../UI/CustumText';
import { ConfirmationScreenStyles } from '../../theme/Layout/ConfirmationScreenTheme';
import { ConfirmationSkeleton } from '../Skeletons/Screens/ConfirmationSkeleton';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { format } from '../../utils/currency';
import FooterScreen from '../Navigation/FooterScreen';
import { ModuleInterface } from '../../interface/utils';
import { CombinedProductInterface, opcionBag } from '../../interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTotalPriceBag } from '../../services';
import { useTheme } from '../../hooks/styles/useTheme';

interface FetchPostsParams {
    pageParam: number;
    limit?: number;
    option: number;
};

interface ProductsPaginated {
    data: {
        bag: CombinedProductInterface[];
    };
    nextPage?: number;
};

interface LayoutConfirmationInterface {
    option: opcionBag
    queryFn: (_postParams: FetchPostsParams) => Promise<ProductsPaginated>;
    queryKey: readonly unknown[];

    renderItem: (_info: { item: CombinedProductInterface }) => React.JSX.Element;
    type: ModuleInterface['module'];

    renderHeaderExtra?: () => React.JSX.Element;
    onPost: () => Promise<void>;
    availableToPost: boolean;
    buttonPostDisabled: boolean;
    numberOfItems: number;
    productAdded: boolean
};

const LayoutConfirmation = ({
    queryFn,
    queryKey,
    option,

    renderItem,
    renderHeaderExtra,
    type,
    onPost,
    availableToPost,
    buttonPostDisabled,
    numberOfItems,
    productAdded

}: LayoutConfirmationInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const insets = useSafeAreaInsets();
    const [totalPrice, setTotalPrice] = useState<number>();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => queryFn({ pageParam, option: option }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1
    });


    const getPriceSellsBag = useCallback(async (): Promise<void> => {
        const { total } = await getTotalPriceBag({ opcion: option });
        setTotalPrice(total)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [option, productAdded]);

    const getMovementType = (): string => {
        if (type === 'Inventory') {
            return 'Inventario'
        } else {
            return 'Pedido'
        }
    }

    const renderHeader = (): JSX.Element => {
        return (
            <>
                <View style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation}>
                    <Icon name='checkmark-circle-sharp' color={theme.color_secondary} size={globalFont(size).font_normal} />
                    <CustomText style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation_text}>Confirmacion de pedido</CustomText>
                </View>

                <View style={ConfirmationScreenStyles({ theme, size }).confirmationSells}>
                    <View style={ConfirmationScreenStyles({ theme, size }).confirmationContainer}>
                        <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                            <CustomText style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Productos afectados: </CustomText>
                            <CustomText style={[ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationText]}>{numberOfItems}</CustomText>
                        </View>

                        <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                            <CustomText style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                            <CustomText style={[ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationText]}>{getMovementType()}</CustomText>
                        </View>

                        {
                            type === 'Sells' &&
                            <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                                <CustomText style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Total: </CustomText>
                                <CustomText style={[ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationText]}>{totalPrice ? format(totalPrice) : "0"}</CustomText>
                            </View>
                        }
                    </View>
                </View>
            </>
        )
    };

    useEffect(() => {
        getPriceSellsBag()
    }, [getPriceSellsBag])

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productAdded])

    if (isLoading) return (<ConfirmationSkeleton />)

    const items = data?.pages.flatMap(page => page.data.bag) ?? [];

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }}>
            <View style={[
                ConfirmationScreenStyles({ theme, typeTheme, size }).ConfirmationScreen,
                availableToPost ? extraStyles.ConfirmationScreen : {}
            ]}>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.idenlacemob}`}
                    onEndReached={() => {
                        if (!hasNextPage || isFetchingNextPage) return;
                        fetchNextPage();
                    }}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                    ListHeaderComponent={
                        <>
                            {renderHeader()}
                            {renderHeaderExtra?.()}
                            <View style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation}>
                                <Icon name='pricetags-sharp' color={theme.text_color} size={globalFont(size).font_normal} />
                                <CustomText style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation_text}>Productos</CustomText>
                            </View>
                        </>
                    }
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + size('20%'),
                    }}
                />

                {/* FOOTER */}
                <FooterScreen
                    buttonOnPress={onPost}
                    buttonDisabled={buttonPostDisabled}
                    buttonLoading={buttonPostDisabled}
                    buttonTitle='Confirmar'
                    visible={availableToPost}
                />
            </View>
        </SafeAreaView>
    )

};

export default LayoutConfirmation;


const extraStyles = StyleSheet.create({
    ConfirmationScreen: {
        paddingBottom: 100
    }
})