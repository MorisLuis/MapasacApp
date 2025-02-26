import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../../../theme/UI/cardsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../../interface/productSells';
import CustomText from '../../UI/CustumText';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../../theme/appTheme';
import ProductInterface from '../../../interface/product';
import { ProductCardSkeleton } from '../../Skeletons/ProductCardSkeleton';

export interface ProductCardInterface<T extends ProductSellsInterface | ProductInterface | ProductSellsRestaurantInterface> {
    product: T;
    showDelete?: boolean;
    onDelete?: (product: T) => void;
    onClick?: () => void;
    deletingProduct?: boolean;
    children?: React.ReactNode;
    renderRight?: () => React.ReactNode;
    renderRightProp?: () => React.ReactNode;
}

// Subcomponente reutilizable para la sección de datos
export const ProductInfo = ({ label, value }: { label: string; value: string | number }) => {
    const { theme } = useTheme();
    return (
        <View style={styles(theme).dataItem}>
            <CustomText style={styles(theme).label}>{label}:</CustomText>
            <CustomText
                style={styles(theme).dataItemText}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
                {value}
            </CustomText>
        </View>
    );
};


export const LayoutProductCard = <T extends ProductSellsInterface | ProductInterface | ProductSellsRestaurantInterface>({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct,
    children,
    renderRight
}: ProductCardInterface<T>) => {

    const { theme, typeTheme } = useTheme();

    if (deletingProduct) {
        return (
            <View style={{ flex: 1 }}>
                <ProductCardSkeleton />
            </View>
        );
    }


    return (
        <TouchableOpacity
            style={styles(theme, typeTheme).productInventoryCard}
            onPress={onClick}
        >
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <CustomText style={styles(theme).description}>{product.producto}</CustomText>

                    {children}

                    {showDelete && (
                        <View style={styles(theme).deleteContainer}>
                            <Icon name={'close-circle'} size={globalFont.font_normal} color={theme.color_red} />
                            <CustomText style={styles(theme, typeTheme).delete} onPress={() => onDelete?.(product)}>Eliminar</CustomText>
                        </View>
                    )}
                </View>

                <View style={styles(theme).quantity}>
                    {renderRight?.()}
                </View>
            </View>
        </TouchableOpacity>
    );
};