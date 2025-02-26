import React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductSellsCardTheme } from '../../theme/UI/cardsStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../UI/CustumText';

interface ProductSellsCardInterface {
    imagen?: string;
    descripcion?: string;
    handleSelectProduct: () => void
}

export const ProductSellsSquareCard = ({
    imagen,
    descripcion,
    handleSelectProduct
}: ProductSellsCardInterface) => {

    const { theme, typeTheme } = useTheme();

    const iconColor = typeTheme === 'dark' ? "white" : "gray"
    const platform = Platform.OS;

    return (
        <TouchableOpacity
            onPress={handleSelectProduct}
            style={ProductSellsCardTheme(theme, typeTheme).ProductSellsCardTheme}
        >
            {
                imagen ? (
                    <View style={ProductSellsCardTheme(theme, typeTheme).item}>
                        <View style={ProductSellsCardTheme(theme, typeTheme, platform ).imageContainer}>
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
