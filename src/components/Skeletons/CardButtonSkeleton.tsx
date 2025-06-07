import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { Theme, globalFont, globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../hooks/styles/useTheme';

const CardButtonSkeleton = (): JSX.Element => {

    const { typeTheme, theme, size } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <View
            style={[SellsDataScreenTheme({theme, typeTheme, size }).inputContainer, extraStyles(theme, size).inputContainer]}
        >
            {/* LABEL */}
            <ShimmerPlaceholder
                style={extraStyles(theme, size).first_shimmer}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            ></ShimmerPlaceholder>

            {/* VALUE */}
            <ShimmerPlaceholder
                style={extraStyles(theme, size).second_shimmer}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            ></ShimmerPlaceholder>
        </View>
    );
};

export default CardButtonSkeleton;

const DIVIDER_TWO = 2;
const MULTIPLE_TWO = 2;

/* eslint-disable react-native/no-unused-styles */
const extraStyles = (theme: Theme, size: (_value: string) => number): ReturnType<typeof StyleSheet.create> => StyleSheet.create({
    inputContainer: {
        minHeight: globalFont(size).font_normal + globalStyles().globalPadding.padding * MULTIPLE_TWO,
        backgroundColor: theme?.background_color,
        display: 'flex',
        flexDirection: 'row'
    },

    first_shimmer: {
        width: '70%',
        height: "100%",
        borderRadius: globalStyles().borderRadius.borderRadius / DIVIDER_TWO
    },

    second_shimmer: {
        width: "10%",
        height: "100%",
        borderRadius: 100
    }
})