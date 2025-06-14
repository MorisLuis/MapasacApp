import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { JSX } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme'
import { ProductCardSkeleton, cardSkeletonType } from '../ProductCardSkeleton'
import { inputStyles } from '../../../theme/Components/inputs'
import { globalStyles } from '../../../theme/appTheme'
import { useTheme } from '../../../hooks/styles/useTheme';

interface LayoutBagSkeletonInterface {
    type?: cardSkeletonType
}

const ARRAY_LENGTH = 6;

export default function LayoutBagSkeleton({
    type
}: LayoutBagSkeletonInterface): JSX.Element {
    const { theme, typeTheme, size } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }} >
            <View style={LayoutBagStyles({ theme, typeTheme, size }).LayoutBagScreen}>
                <ShimmerPlaceholder
                    style={[inputStyles({ theme, size }).searchBar, extraStyles.searchBar]}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                ></ShimmerPlaceholder>

                <FlatList
                    data={Array(ARRAY_LENGTH).fill({})}
                    renderItem={() => <ProductCardSkeleton type={type} />}
                    style={LayoutBagStyles({ theme, typeTheme, size }).content}
                    keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
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