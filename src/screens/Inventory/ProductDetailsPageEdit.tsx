import React, { JSX, useCallback, useContext, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';

import { ProductDetailsStyles } from '../../theme/Screens/Inventory/ProductDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { format } from '../../utils/currency';
import { getProductDetails } from '../../services/products';
import { ProductDetailsEditSkeleton } from '../../components/Skeletons/Screens/ProductDetailsEditSkeleton';
import useErrorHandler from '../../hooks/useErrorHandler';
import { InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import { InventoryNavigationProp, ProductInterface } from '../../interface';
import CardButton from '../../components/Cards/CardButton';
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../hooks/styles/useTheme';

type EditProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - productDetailsScreenEdit'>;

type ProductDetailsPageEditInterface = {
    route: EditProductPageRouteProp;
};

export const ProductDetailsPageEdit = ({ route }: ProductDetailsPageEditInterface): JSX.Element => {

    const { product: productParam } = route.params;
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { theme, size } = useTheme();
    const { handleError } = useErrorHandler()
    const navigation = useNavigation<InventoryNavigationProp>();

    const [productDetailsData, setProductDetailsData] = useState<ProductInterface>();

    const handleGoEditDescripcion = (): void => {
        if (!productDetailsData) return;
        navigation.navigate("[ProductDetailsPage] - editDescripcio", { product: productDetailsData })
    }

    const handleGoEditPrice = (): void => {
        if (!productDetailsData) return;
        navigation.navigate('[ProductDetailsPage] - editPrice', { product: productDetailsData });
    };

    const handleGetProductDetails = useCallback(async (): Promise<void> => {
        try {
            const { product } = await getProductDetails(productParam.idinvearts);
            setProductDetailsData(product);
        } catch (error) {
            handleError(error)
        }
    }, [handleError, productParam.idinvearts]);

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();
        }, [handleGetProductDetails, handleCameraAvailable])
    );

    if (!productDetailsData) {
        return (<ProductDetailsEditSkeleton />)
    }

    return (
        <SafeAreaView style={[{ backgroundColor: theme.background_color }, globalStyles().flex]} >
            <ScrollView style={ProductDetailsStyles({theme, size }).ProductDetailsPage}>
                <CardButton
                    onPress={handleGoEditDescripcion}
                    label='Descripcion:'
                    valueDefault='Seleccionar la descripcion'
                    color='blue'
                    icon='reader-outline'
                    specialValue={productDetailsData?.producto ? productDetailsData?.producto.trim() : undefined}
                />

                <CardButton
                    onPress={handleGoEditPrice}
                    label='Precio:'
                    valueDefault='Seleccionar el precio'
                    color='red'
                    icon='pricetag-outline'
                    specialValue={format(productDetailsData.precio) ? format(productDetailsData.precio) : undefined}
                />
            </ScrollView>
        </SafeAreaView>
    )
};