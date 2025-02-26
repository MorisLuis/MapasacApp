import React from 'react';
import { Dimensions, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { globalFont, globalStyles } from '../../theme/appTheme';

// Obtener las dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get('window');

export const ProductSellsSquareCardSkeleton = () => {
    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    const calculatedWidth = (screenWidth / 2) - globalStyles(theme).globalPadding.padding - (globalStyles(theme).globalPadding.padding / 2);

    return (
        <View style={{ width: calculatedWidth, display: 'flex', alignItems: 'center' }}>
            <ShimmerPlaceholder
                style={[
                    {
                        height: 120,
                        borderRadius: globalStyles(theme).borderRadius.borderRadius,
                        width: '100%',
                        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
                    }
                ]}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            />
            <ShimmerPlaceholder
                style={[{
                    height: globalFont.font_normal,
                    borderRadius: globalStyles(theme).borderRadius.borderRadius,
                    width: '50%'
                }]}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceholder>
        </View>
    );
};
