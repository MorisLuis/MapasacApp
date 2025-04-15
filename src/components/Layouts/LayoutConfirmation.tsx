import React, { JSX } from 'react';
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
import { ProductInterface, ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface';

export type CombinedProductInterface = ProductInterface | ProductSellsInterface | ProductSellsRestaurantInterface;

interface LayoutConfirmationInterface {
    data: CombinedProductInterface[];
    renderItem: (_info: { item: CombinedProductInterface }) => React.JSX.Element;
    loadBags: () => Promise<void>;
    ListHeaderComponent?: () => React.JSX.Element;
    Type: ModuleInterface['module'];
    onPost: () => Promise<void>;
    loadData: boolean;
    availableToPost: boolean;
    buttonPostDisabled: boolean;
    numberOfItems: number;
    totalPrice?: number
}


const LayoutConfirmation = ({
    data,
    renderItem,
    loadBags,
    ListHeaderComponent,
    Type,
    onPost,
    loadData,
    availableToPost,
    buttonPostDisabled,
    numberOfItems,
    totalPrice
}: LayoutConfirmationInterface) : JSX.Element => {

    const { theme, typeTheme } = useTheme();
    const insets = useSafeAreaInsets();

    const movementType = () : string => {
        if (Type === 'Inventory') {
            return 'Inventario'
        } else {
            return 'Pedido'
        }
    }

    const renderListHeaderComponent = () : JSX.Element => {
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
                            <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{movementType()}</CustomText>
                        </View>

                        {
                            Type === 'Sells' &&
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Total: </CustomText>
                                <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{totalPrice ? format(totalPrice) : "0"}</CustomText>
                            </View>
                        }
                    </View>
                </View>
            </>
        )
    }

    if (!loadData) {
        return (
            <ConfirmationSkeleton />
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={[
                ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen,
                availableToPost ? extraStyles.ConfirmationScreen : {}
            ]}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.idenlacemob}`}
                    onEndReached={loadBags}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />} // Espaciado de 10px
                    ListHeaderComponent={
                        <>
                            {renderListHeaderComponent()}
                            {ListHeaderComponent?.()}
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