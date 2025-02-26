import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';
import { ConfirmationScreenStyles } from '../../theme/Layout/ConfirmationScreenTheme';
import { ConfirmationSkeleton } from '../Skeletons/Screens/ConfirmationSkeleton';
import { globalFont } from '../../theme/appTheme';
import { useProtectPage } from '../../hooks/useProtectPage';
import { format } from '../../utils/currency';
import FooterScreen from '../Navigation/FooterScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModuleInterface } from '../../interface/utils';
import { LoadingScreen } from '../../screens/LoadingScreen';
import ProductInterface from '../../interface/product';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface/productSells';

export type CombinedProductInterface = ProductInterface | ProductSellsInterface | ProductSellsRestaurantInterface;

interface LayoutConfirmationInterface<T extends CombinedProductInterface> {
    data: T[];
    renderItem: ({ item }: { item: T }) => React.JSX.Element;
    loadBags: () => Promise<void>;
    ListHeaderComponent?: () => React.JSX.Element;
    Type: ModuleInterface['module'];
    onPost: () => Promise<void>;
    loadData: boolean;
    availableToPost: boolean;
    buttonPostDisabled: boolean;
    numberOfItems: string;
    totalPrice?: number
}


const LayoutConfirmation = <T extends CombinedProductInterface>({
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
}: LayoutConfirmationInterface<T>) => {

    const { theme, typeTheme } = useTheme();

    const movementType = () => {
        if (Type === 'Inventory') {
            return 'Inventario'
        } else {
            return 'Pedido'
        }
    }

    const navigateProtectPage = () => {
        if (Type === 'Inventory') {
            return 'ScannerNavigation'
        } else {
            return 'SellsScreen'
        }
    }

    const renderListHeaderComponent = () => {
        return (
            <>
                <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <Icon name='checkmark-circle-sharp' color={theme.color_secondary} size={globalFont.font_normal} />
                    <CustomText style={{ fontFamily: 'Rubik-Bold', color: theme.color_secondary }}>Confirmacion de pedido</CustomText>
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
                                <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{format(totalPrice ?? 0)}</CustomText>
                            </View>
                        }
                    </View>
                </View>
            </>
        )
    }

    const { protectThisPage } = useProtectPage({
        numberOfItems: numberOfItems,
        loading: buttonPostDisabled,
        navigatePage: navigateProtectPage()
    });

    if (protectThisPage) {
        return (
            <LoadingScreen message='Redireccionando...' />
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
                availableToPost ? { paddingBottom: 100 } : {}
            ]}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.idenlacemob}`}
                    onEndReached={loadBags}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Espaciado de 10px
                    ListHeaderComponent={
                        <>
                            {renderListHeaderComponent()}
                            {ListHeaderComponent?.()}
                            <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                                <Icon name='pricetags-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText style={{ fontFamily: 'Rubik-Bold' }}>Productos</CustomText>
                            </View>
                        </>
                    }
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
