import React, { JSX, useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../context/ThemeContext';
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

    const { theme, typeTheme } = useTheme();
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
                <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <Icon name='checkmark-circle-sharp' color={theme.color_secondary} size={globalFont.font_normal} />
                    <CustomText style={ConfirmationScreenStyles(theme).subtitleConfirmation_text}>Confirmacion de pedido</CustomText>
                </View>

                <View style={ConfirmationScreenStyles(theme).confirmationSells}>
                    <View style={ConfirmationScreenStyles(theme).confirmationContainer}>
                        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Productos afectados: </CustomText>
                            <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{numberOfItems}</CustomText>
                        </View>

                        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                            <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{getMovementType()}</CustomText>
                        </View>

                        {
                            type === 'Sells' &&
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Total: </CustomText>
                                <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{totalPrice ? format(totalPrice) : "0"}</CustomText>
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
    }, [productAdded])

    if (isLoading) return (<ConfirmationSkeleton />)

    const items = data?.pages.flatMap(page => page.data.bag) ?? [];

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={[
                ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen,
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
                            <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                                <Icon name='pricetags-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText style={ConfirmationScreenStyles(theme).subtitleConfirmation_text}>Productos</CustomText>
                            </View>
                        </>
                    }
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + heightPercentageToDP('5%'),
                    }}
                />

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