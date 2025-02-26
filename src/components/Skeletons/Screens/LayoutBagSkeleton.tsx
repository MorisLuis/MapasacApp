import { View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme'
import { ProductCardSkeleton } from '../ProductCardSkeleton'
import { useTheme } from '../../../context/ThemeContext'
import { inputStyles } from '../../../theme/Components/inputs'
import { globalStyles } from '../../../theme/appTheme'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export default function LayoutBagSkeleton() {
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
                    style={[
                        inputStyles(theme).searchBar,
                        {
                            marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
                            minHeight: 50,
                            width: "100%"
                        },
                    ]}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                ></ShimmerPlaceholder>
                <FlatList
                    data={Array(6).fill({})}
                    renderItem={() => <ProductCardSkeleton />}
                    style={LayoutBagStyles(theme, typeTheme).content}
                    keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />} // Espaciado de 10px
                />
            </View>
        </SafeAreaView>
    )
}