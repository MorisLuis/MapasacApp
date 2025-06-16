import { View, FlatList, SafeAreaView } from 'react-native'
import React, { JSX } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { globalFont, globalStyles } from '../../../theme/appTheme'
import { SellsScreenStyles } from '../../../theme/Screens/Sells/SellsScreenTheme'
import { ProductSellsSquareCardSkeleton } from '../ProductSquareCardSkeleton'
import LayoutGrandient from '../../Layouts/LayoutGrandient'
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/styles/useTheme';
import { useResponsive } from '../../../hooks/UI/useResponsive';

const ARRAY_LENGTH = 8;
const COLUMNS_FLATLIST = 2;
const COLUMNS_FLATLIST_LANDSCAPE = 4;

export default function LayoutSellSkeleton(): JSX.Element {
    const { theme, typeTheme, size } = useTheme();
    const { isLandscape } = useResponsive()
    const numSellsCol = isLandscape ? COLUMNS_FLATLIST_LANDSCAPE : COLUMNS_FLATLIST;

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];


    return (
        <LayoutGrandient color="purple">
            <SafeAreaView>
                <View style={SellsScreenStyles(theme, size).SellsScreen}>
                    <View style={SellsScreenStyles(theme, size).header}>
                        <ShimmerPlaceholder
                            style={[SellsScreenStyles(theme, size).header_title, extraStyles.header_title]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        ></ShimmerPlaceholder>

                        <ShimmerPlaceholder
                            style={[SellsScreenStyles(theme, size).header_title, extraStyles.header_title2]}

                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        ></ShimmerPlaceholder>

                        <ShimmerPlaceholder
                            style={[SellsScreenStyles(theme, size).header_title, extraStyles.header_title3]}

                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        ></ShimmerPlaceholder>
                    </View>

                    <FlatList
                        data={Array(ARRAY_LENGTH).fill({})}
                        numColumns={numSellsCol}
                        renderItem={() => <ProductSellsSquareCardSkeleton />}
                        keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                        contentContainerStyle={{ gap: globalStyles().globalPadding.padding }}
                        columnWrapperStyle={{ gap: globalStyles().globalPadding.padding }}
                        ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
};

const BORDER_RADIUS_DIVISOR = 2;
const MARGIN_BOTTOM = 10;

const extraStyles = StyleSheet.create({
    header_title: {
        marginBottom: MARGIN_BOTTOM,
        height: globalFont().font_med,
        width: "30%",
        borderRadius: globalStyles().borderRadius.borderRadius / BORDER_RADIUS_DIVISOR
    },
    header_title2: {
        marginBottom: MARGIN_BOTTOM,
        height: globalFont().font_med,
        width: "32%",
        borderRadius: globalStyles().borderRadius.borderRadius / BORDER_RADIUS_DIVISOR
    },
    header_title3: {
        height: globalFont().font_med,
        width: "60%",
        borderRadius: globalStyles().borderRadius.borderRadius / BORDER_RADIUS_DIVISOR
    },
})