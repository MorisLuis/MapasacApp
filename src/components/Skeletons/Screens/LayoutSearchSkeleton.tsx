import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { JSX } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme'
import { useTheme } from '../../../context/ThemeContext'
import { inputStyles } from '../../../theme/Components/inputs'
import { globalStyles } from '../../../theme/appTheme'
import CardSelectSkeleton from '../CardSelectSkeleton'

const ARRAY_LENGTH = 10;

export default function LayoutSearchSkeleton(): JSX.Element {
    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={LayoutBagStyles(theme, typeTheme).InventoryBagScreen}>
                <ShimmerPlaceholder
                    style={[inputStyles(theme).searchBar, extraStyles.searchBar]}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                ></ShimmerPlaceholder>
                <FlatList
                    data={Array(ARRAY_LENGTH).fill({})}
                    renderItem={() => <CardSelectSkeleton />}
                    keyExtractor={(_, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                />
            </View>
        </SafeAreaView>
    )
}

const extraStyles = StyleSheet.create({
    searchBar: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        minHeight: 50,
        width: "100%"
    }
})