import React, { JSX } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../context/ThemeContext';
import { ProductSellsCardTheme } from '../../theme/UI/cardsStyles';
import CustomText from '../UI/CustumText';
import { useResponsive } from '../../hooks/useResponsive';

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

    const { theme, typeTheme } = useTheme();
    const { isTablet, isLandscape } = useResponsive();
    const iconColor = typeTheme === 'dark' ? "white" : "gray"

    return (
        <TouchableOpacity
            onPress={handleSelectProduct}
            style={ProductSellsCardTheme(theme, typeTheme).ProductSellsCardTheme}
        >
            {
                imagen ? (
                    <View style={ProductSellsCardTheme(theme, typeTheme).item}>
                        <View style={[
                            ProductSellsCardTheme(theme, typeTheme).imageContainer,
                            isTablet && ProductSellsCardTheme(theme, typeTheme).imageContainer_tablet,
                            isLandscape && ProductSellsCardTheme(theme, typeTheme).imageContainer_landscape
                        ]}>
                            <Image
                                source={{ uri: `data:image/png;base64,${imagen}` }}
                                style={ProductSellsCardTheme(theme, typeTheme).image}
                            />
                        </View>
                        <CustomText style={ProductSellsCardTheme(theme, typeTheme).title}>{descripcion}</CustomText>
                    </View>
                )
                    :
                    <View style={ProductSellsCardTheme(theme, typeTheme).item}>
                        <View style={ProductSellsCardTheme(theme).notImage}>
                            <View style={ProductSellsCardTheme(theme).notImageBackground}>
                                <Icon name={'image-outline'} size={24} color={iconColor} />
                            </View>
                        </View>
                        <CustomText style={ProductSellsCardTheme(theme, typeTheme).title}>{descripcion}</CustomText>
                    </View>
            }
        </TouchableOpacity>
    )
}
