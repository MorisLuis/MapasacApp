import React from "react";
import { CustomHeader } from "../components/UI/CustomHeader";
import { RouteProp } from "@react-navigation/native";
import { InventoryNavigationStackParamList } from "./InventoryNavigation";
import { NativeStackHeaderProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductInterface } from "../interface";
import { DELAY_ACTION } from "../utils/globalConstants";


interface HeaderProps {
    navigation: NavigationProp;
    props: RouteProp<InventoryNavigationStackParamList, "[ProductDetailsPage] - productDetailsScreen"> | NativeStackHeaderProps;
    updateBarCode?: (_value: string) => void;
    route?: { params: { selectedProduct: ProductInterface } };
};

type NavigationProp = NativeStackNavigationProp<InventoryNavigationStackParamList, "confirmationScreen" | 'bagInventoryScreen' | 'searchProductScreen' | '[ProductDetailsPage] - inventoryDetailsScreen' | '[ProductDetailsPage] - productDetailsScreen' | '[ProductDetailsPage] - productDetailsScreenEdit', undefined>


const HeaderInventario = React.memo(({
    navigation,
    props
}: HeaderProps): React.ReactElement => (
    <CustomHeader
        {...props}
        title="Inventario"
        navigation={navigation}
        back={() => navigation.goBack()}
    />
));
HeaderInventario.displayName = 'HeaderInventario';

const HeaderConfirmacion = React.memo(({
    navigation,
    props
}: HeaderProps): React.ReactElement => (
    <CustomHeader
        {...props}
        title="Confirmación"
        navigation={navigation}
        back={() => navigation.goBack()}
    />
));
HeaderConfirmacion.displayName = 'HeaderConfirmacion';

const HeaderProductScreen = React.memo(({
    navigation,
    props,
    updateBarCode
}: HeaderProps): React.ReactElement => (
    <CustomHeader
        {...props}
        title="Buscar producto"
        navigation={navigation}
        back={() => {
            navigation.goBack();
            updateBarCode?.('');
        }}
    />
));
HeaderProductScreen.displayName = 'HeaderProductScreen';

const HeaderInventoryDetails = React.memo(({
    navigation,
    props,
    updateBarCode
}: HeaderProps): React.ReactElement => (
    <CustomHeader
        {...props}
        title="Detalles de Producto"
        navigation={navigation}
        back={() => {
            navigation.goBack();
            updateBarCode?.('');
        }}
    />
));
HeaderInventoryDetails.displayName = 'HeaderInventoryDetails';

const HeaderProductDetails = React.memo(({
    navigation,
    props,
    updateBarCode,
    route
}: HeaderProps): React.ReactElement => (
    <CustomHeader
        {...props}
        title="Detalles de Producto"
        navigation={navigation}
        back={() => {
            setTimeout(() => {
                navigation.goBack();
                updateBarCode?.('');
                if (route?.params?.selectedProduct) {
                    navigation.navigate('[Modal] - scannerResultScreen', {
                        product: route?.params?.selectedProduct,
                        fromProductDetails: false
                    });
                }
            }, DELAY_ACTION);
        }}
    />
));
HeaderProductDetails.displayName = 'HeaderProductDetails';

const HeaderProductDetailsEdit = React.memo(({
    navigation,
    props
}: HeaderProps): React.ReactElement => (
    <CustomHeader
        {...props}
        title="Editando Producto"
        navigation={navigation}
        back={() => navigation.goBack()}
    />
));
HeaderProductDetailsEdit.displayName = 'HeaderProductDetailsEdit';


export {
    HeaderInventario,
    HeaderConfirmacion,
    HeaderProductScreen,
    HeaderInventoryDetails,
    HeaderProductDetails,
    HeaderProductDetailsEdit
}