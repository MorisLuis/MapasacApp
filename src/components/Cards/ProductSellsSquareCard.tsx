import React, { JSX } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ProductSellsCardTheme } from '../../theme/UI/cardsStyles';
import CustomText from '../UI/CustumText';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/styles/useTheme';

interface ProductSellsCardInterface {
    imagen?: string;
    descripcion?: string;
    handleSelectProduct: () => void
}

export const ProductSellsSquareCard = ({
    imagen,
    descripcion,
    handleSelectProduct
}: ProductSellsCardInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const { isTablet, isLandscape } = useResponsive();
    const iconColor = typeTheme === 'dark' ? "white" : "gray"

    return (
        <TouchableOpacity
            onPress={handleSelectProduct}
            style={ProductSellsCardTheme({ theme, typeTheme, size }).ProductSellsCardTheme}
        >
            {
                imagen ? (
                    <View style={ProductSellsCardTheme({ theme, typeTheme, size }).item}>
                        <View style={[
                            ProductSellsCardTheme({ theme, typeTheme, size }).imageContainer,
                            isTablet && ProductSellsCardTheme({ theme, typeTheme, size }).imageContainer_tablet,
                            isLandscape && ProductSellsCardTheme({ theme, typeTheme, size }).imageContainer_landscape
                        ]}>
                            <Image
                                source={{ uri: `data:image/png;base64,${imagen}` }}
                                style={ProductSellsCardTheme({ theme, typeTheme, size }).image}
                            />
                        </View>
                        <CustomText style={ProductSellsCardTheme({ theme, typeTheme, size }).title}>{descripcion?.trim()}</CustomText>
                    </View>
                )
                    :
                    <View style={ProductSellsCardTheme({ theme, typeTheme, size }).item}>
                        <View style={ProductSellsCardTheme({ theme, size }).notImage}>
                            <View style={ProductSellsCardTheme({ theme, size }).notImageBackground}>
                                <Icon name={'image-outline'} size={24} color={iconColor} />
                            </View>
                        </View>
                        <CustomText style={ProductSellsCardTheme({ theme, typeTheme, size }).title}>{descripcion?.trim()}</CustomText>
                    </View>
            }
        </TouchableOpacity>
    )
}
