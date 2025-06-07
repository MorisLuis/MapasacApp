import React, { JSX } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import { ProductFindByCodebarInputStyles } from '../../../theme/Screens/Inventory/ProductFindByCodebarInputTheme';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { ProductInterface } from '../../../interface';
import { useTheme } from '../../../hooks/styles/useTheme';

type ProductsFindByCodeBarRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - productsFindByCodeBarModal'>;

interface ProductFindByCodeBarInterface {
    route: ProductsFindByCodeBarRouteProp
}

export const ProductsFindByCodeBar = ({ route }: ProductFindByCodeBarInterface) : JSX.Element | null => {

    const { products } = route.params
    const navigation = useNavigation<InventoryNavigationProp>();
    const { theme } = useTheme();

    const onSelectProduct = (product: ProductInterface) : void => {
        navigation.goBack()
        navigation.navigate('[Modal] - scannerResultScreen', { product: product, fromProductDetails: false })
    }

    if (!products) return null;

    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >
            <View style={ProductFindByCodebarInputStyles(theme).ProductFindByCodeBar}>
                <CustomText style={ProductFindByCodebarInputStyles(theme).title}>Productos</CustomText>
                {
                    products.map((product) =>
                        <ProductInventoryCard
                            key={`${product.idinvearts}`}
                            product={product}
                            onClick={() => onSelectProduct(product)}
                        />
                    )
                }
            </View>
        </ModalBottom>
    )
}
