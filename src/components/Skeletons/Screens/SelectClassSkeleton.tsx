import React, { JSX } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '../../../context/ThemeContext'
import { globalFont, globalStyles } from '../../../theme/appTheme'
import { SelectScreenTheme } from '../../../theme/Screens/Sells/SelectScreenTheme'
import CardButtonSkeleton from '../CardButtonSkeleton'

const ARRAY_LENGTH = 6;

export default function SelectClassSkeleton(): JSX.Element {
    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <View style={[SelectScreenTheme(theme).SelectScreen, extraStyles.SelectScreen]}>
            <ShimmerPlaceholder
                style={[SelectScreenTheme(theme).header, extraStyles.header]}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceholder>
            <FlatList
                data={Array(ARRAY_LENGTH).fill({})}
                renderItem={() => <CardButtonSkeleton />}
                keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                onEndReachedThreshold={0}
                ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
            />
        </View>
    )
};

const extraStyles = StyleSheet.create({
    SelectScreen: {
        display: 'flex',
        alignItems: 'center'
    },
    header: {
        height: globalFont.font_med + 5, // eslint-disable-line no-magic-numbers
        borderRadius: globalStyles().borderRadius.borderRadius
    }
})