import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { globalFont, globalStyles } from '../../../theme/appTheme'
import { SellsScreenStyles } from '../../../theme/Screens/Sells/SellsScreenTheme'
import { ProductSellsSquareCardSkeleton } from '../ProductSquareCardSkeleton'
import LayoutGrandient from '../../Layouts/LayoutGrandient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export default function LayoutSellSkeleton() {
    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];


    return (
        <LayoutGrandient color="purple">
            <SafeAreaView >
                <View style={SellsScreenStyles(theme).SellsScreen}>
                    <View style={SellsScreenStyles(theme).header}>
                        <ShimmerPlaceholder
                            style={[
                                SellsScreenStyles(theme).header_title,
                                {
                                    marginBottom: 10,
                                    height: globalFont.font_med,
                                    width: "30%",
                                    borderRadius: globalStyles().borderRadius.borderRadius / 2
                                }
                            ]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        ></ShimmerPlaceholder>

                        <ShimmerPlaceholder
                            style={[
                                SellsScreenStyles(theme).header_title,
                                {
                                    marginBottom: 10,
                                    height: globalFont.font_sm,
                                    width: "32%",
                                    borderRadius: globalStyles().borderRadius.borderRadius / 2
                                }
                            ]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        ></ShimmerPlaceholder>

                        <ShimmerPlaceholder
                            style={[
                                SellsScreenStyles(theme).header_title,
                                {
                                    height: globalFont.font_med,
                                    width: "60%",
                                    borderRadius: globalStyles().borderRadius.borderRadius / 2
                                }
                            ]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        ></ShimmerPlaceholder>
                    </View>

                    <FlatList
                        data={Array(6).fill({})}
                        numColumns={2}
                        renderItem={() => <ProductSellsSquareCardSkeleton />}
                        keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                        contentContainerStyle={{ gap: globalStyles(theme).globalPadding.padding }}
                        columnWrapperStyle={{ gap: globalStyles(theme).globalPadding.padding }}
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>

    )
}