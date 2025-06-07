import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { JSX } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { ProductCardSelectTheme } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../hooks/styles/useTheme';

const CardSelectSkeleton = (): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <TouchableOpacity style={[ProductCardSelectTheme({ theme, typeTheme, size }).CardSelect]}>
            <View style={extraStyles.CardSelect}>
                <View style={extraStyles.CardSelect_content}>
                    <ShimmerPlaceholder
                        style={[ProductCardSelectTheme({ theme, typeTheme, size }).CardSelectMessage, extraStyles.CardSelectMessage]}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        style={[ProductCardSelectTheme({ theme, typeTheme, size }).CardSelectMessage, extraStyles.CardSelectMessage2]}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceholder>
                </View>

                <ShimmerPlaceholder
                    style={[ProductCardSelectTheme({ theme, typeTheme, size }).CardSelectMessage, extraStyles.CardSelectMessage3]}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceholder>

            </View>

        </TouchableOpacity>
    )
}

export default CardSelectSkeleton;

const extraStyles = StyleSheet.create({
    CardSelect: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: 'center'
    },

    CardSelect_content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: "100%",
        overflow: 'hidden',
    },

    CardSelectMessage: {
        width: "100%"
    },

    CardSelectMessage2: {
        width: "80%"
    },

    CardSelectMessage3: {
        width: 25,
        height: 25,
        borderRadius: 100
    }

})