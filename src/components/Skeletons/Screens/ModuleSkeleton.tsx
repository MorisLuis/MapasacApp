import React, { JSX } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../theme/appTheme';
import { useTheme } from '../../../hooks/styles/useTheme';

export default function ModuleSkeleton(): JSX.Element {
    const { theme, typeTheme, size } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <ShimmerPlaceholder
            shimmerColors={shimmerColors}
            LinearGradient={LinearGradient}
            style={[styles(size).moduleOption]}
        >
        </ShimmerPlaceholder>
    )
}

/* eslint-disable react-native/no-unused-styles */
const MULTIPLE_BY_TRHEE = 3;

const styles = (size: (_value: string) => number): ReturnType<typeof StyleSheet.create> => ({
    moduleOption: {
        flex: 1,
        borderRadius: globalStyles().borderRadius.borderRadius * MULTIPLE_BY_TRHEE,
        minHeight: size("12%")
    },
})