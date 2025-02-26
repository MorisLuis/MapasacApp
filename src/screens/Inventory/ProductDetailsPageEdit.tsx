import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import ProductInterface from '../../interface/product';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ProductDetailsStyles } from '../../theme/Screens/Inventory/ProductDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { getProductDetails } from '../../services/products';
import { ProductDetailsEditSkeleton } from '../../components/Skeletons/Screens/ProductDetailsEditSkeleton';
import useErrorHandler from '../../hooks/useErrorHandler';
import {InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import { InventoryNavigationProp } from '../../interface';
import CardButton from '../../components/Cards/CardButton';

type EditProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - productDetailsScreenEdit'>;

type ProductDetailsPageEditInterface = {
    route: EditProductPageRouteProp;
};

export const ProductDetailsPageEdit = ({ route }: ProductDetailsPageEditInterface) => {
    const { product } = route.params;
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { theme } = useTheme();
    const { handleError } = useErrorHandler()
    const navigation = useNavigation<InventoryNavigationProp>();

    const [productDetailsData, setProductDetailsData] = useState<ProductInterface>();

    const handleGoEditDescripcion = () => {
        if (!productDetailsData) return;
        navigation.navigate("[ProductDetailsPage] - editDescripcio", { product: productDetailsData })
    }

    const handleGoEditPrice = () => {
        if (!productDetailsData) return;
        navigation.navigate('[ProductDetailsPage] - editPrice', { product: productDetailsData });
    };

    const handleGetProductDetails = async () => {

        try {
            const productData = await getProductDetails(product.idinvearts);
            if (productData?.error) return handleError(productData.error);
            setProductDetailsData(productData);
        } catch (error) {
            handleError(error)
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();
        }, [product.idinvearts])
    );

    if (!productDetailsData) {
        return (<ProductDetailsEditSkeleton />)
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
            <ScrollView style={ProductDetailsStyles(theme).ProductDetailsPage}>
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
                    specialValue={format(productDetailsData.precio1) ? format(productDetailsData.precio1) : undefined}
                />
            </ScrollView>
        </SafeAreaView>
    )
};