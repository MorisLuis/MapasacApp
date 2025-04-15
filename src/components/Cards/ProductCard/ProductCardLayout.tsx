import React, { JSX } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { productCardstyles } from '../../../theme/UI/cardsStyles';
import { useTheme } from '../../../context/ThemeContext';
import CustomText from '../../UI/CustumText';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { ProductCardSkeleton } from '../../Skeletons/ProductCardSkeleton';
import { ProductInterface, ProductSellsInterface, ProductSellsRestaurantInterface } from '../../../interface';

export interface ProductCardInterface<T extends ProductSellsInterface | ProductInterface | ProductSellsRestaurantInterface> {
    product: T;
    showDelete?: boolean;
    onDelete?: (_product: T) => void;
    onClick?: () => void;
    deletingProduct?: boolean;
    children?: React.ReactNode;
    renderRight?: () => React.ReactNode;
    renderRightProp?: () => React.ReactNode;
}

// Subcomponente reutilizable para la sección de datos
export const ProductInfo = ({ label, value }: { label: string; value: string | number }) : JSX.Element => {
    const { theme } = useTheme();
    return (
        <View style={productCardstyles(theme).ProductInfo}>
            <CustomText style={productCardstyles(theme).ProductInfo__label}>{label}:</CustomText>
            <CustomText
                style={productCardstyles(theme).ProductInfo__text}
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
}: ProductCardInterface<T>) : JSX.Element => {

    const { theme, typeTheme } = useTheme();

    if (deletingProduct) {
        return (
            <View style={globalStyles().flex}>
                <ProductCardSkeleton />
            </View>
        );
    }


    return (
        <TouchableOpacity
            style={productCardstyles(theme, typeTheme).productCard}
            onPress={onClick}
        >
            <View style={productCardstyles(theme).productCard__data}>
                <View style={productCardstyles(theme).information}>
                    <CustomText style={productCardstyles(theme).information__description}>{product.producto}</CustomText>

                    {children}

                    {showDelete && (
                        <View style={productCardstyles(theme).information__deleteContainer}>
                            <Icon name={'close-circle'} size={globalFont.font_normal} color={theme.color_red} />
                            <CustomText style={productCardstyles(theme, typeTheme).delete} onPress={() => onDelete?.(product)}>Eliminar</CustomText>
                        </View>
                    )}
                </View>

                <View style={productCardstyles(theme).quantity}>
                    {renderRight?.()}
                </View>
            </View>
        </TouchableOpacity>
    );
};