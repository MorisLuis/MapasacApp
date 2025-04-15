import React, { JSX } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '../../context/ThemeContext';
import { globalFont, globalStyles } from '../../theme/appTheme';

// Obtener las dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get('window');

const DIVIDE_IN_HALF = 2;

export const ProductSellsSquareCardSkeleton = (): JSX.Element => {

    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    const calculatedWidth = (screenWidth / DIVIDE_IN_HALF) - globalStyles().globalPadding.padding - (globalStyles().globalPadding.padding / DIVIDE_IN_HALF);

    return (
        <View style={extraStyles(calculatedWidth).ProductSellsSquareCardSkeleton}>
            <ShimmerPlaceholder
                style={extraStyles().productSell_shimmer}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            />
            <ShimmerPlaceholder
                style={extraStyles().productSell_shimmer2}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceholder>
        </View>
    );
};

/* eslint-disable react-native/no-unused-styles */
const extraStyles = (calculatedWidth?: number): ReturnType<typeof StyleSheet.create> => StyleSheet.create({
    ProductSellsSquareCardSkeleton: {
        width: calculatedWidth,
        display: 'flex',
        alignItems: 'center'
    },

    productSell_shimmer: {
        height: 120,
        borderRadius: globalStyles().borderRadius.borderRadius,
        width: '100%',
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / DIVIDE_IN_HALF
    },

    productSell_shimmer2: {
        height: globalFont.font_normal,
        borderRadius: globalStyles().borderRadius.borderRadius,
        width: '50%'
    }
})