import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { JSX } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { ProductCardSkeleton } from '../ProductCardSkeleton'
import { useTheme } from '../../../context/ThemeContext'
import { globalFont, globalStyles } from '../../../theme/appTheme'
import LayoutGrandient from '../../Layouts/LayoutGrandient'
import { InventoryScreenStyles } from '../../../theme/Screens/Inventory/InventoryScreenTheme'

const ARRAY_LENGTH = 6;

export default function InventorySkeleton(): JSX.Element {
    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <LayoutGrandient color="green">
            <SafeAreaView>
                <View style={InventoryScreenStyles(theme).content}>
                    <View style={extraStyles.content}>
                        <ShimmerPlaceholder style={[InventoryScreenStyles(theme).header, extraStyles.header]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        >
                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={[InventoryScreenStyles(theme).header, extraStyles.header2]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        >
                        </ShimmerPlaceholder>
                    </View>

                    <ShimmerPlaceholder style={[InventoryScreenStyles(theme).header, extraStyles.header3]}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceholder>
                    <FlatList
                        data={Array(ARRAY_LENGTH).fill({})}
                        renderItem={() => <ProductCardSkeleton />}
                        keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                        ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
}

const MARGIN_DIVISOR = 2;

const extraStyles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header: {
        height: globalFont.font_big,
        width: "50%",
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / MARGIN_DIVISOR,
        borderRadius: globalStyles().borderRadius.borderRadius
    },
    header2: {
        height: globalFont.font_big,
        width: "10%",
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / MARGIN_DIVISOR,
        borderRadius: globalStyles().borderRadius.borderRadius
    },
    header3: {
        height: globalFont.font_normal,
        width: "30%",
        marginTop: 0,
        borderRadius: globalStyles().borderRadius.borderRadius
    }
})