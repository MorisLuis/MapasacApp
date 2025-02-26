import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme'
import { ProductCardSkeleton } from '../ProductCardSkeleton'
import { useTheme } from '../../../context/ThemeContext'
import { inputStyles } from '../../../theme/Components/inputs'
import { globalFont, globalStyles } from '../../../theme/appTheme'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import LayoutGrandient from '../../Layouts/LayoutGrandient'
import { InventoryScreenStyles } from '../../../theme/Screens/Inventory/InventoryScreenTheme'

export default function InventorySkeleton() {
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
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ShimmerPlaceholder style={[
                            InventoryScreenStyles(theme).header,
                            {
                                height: globalFont.font_big,
                                width: "50%",
                                marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2,
                                borderRadius: globalStyles().borderRadius.borderRadius
                            }
                        ]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        >
                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={[
                            InventoryScreenStyles(theme).header,
                            {
                                height: globalFont.font_big,
                                width: "10%",
                                marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2,
                                borderRadius: globalStyles().borderRadius.borderRadius
                            }
                        ]}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        >
                        </ShimmerPlaceholder>
                    </View>

                    <ShimmerPlaceholder style={[
                        InventoryScreenStyles(theme).header,
                        {
                            height: globalFont.font_normal,
                            width: "30%",
                            marginTop: 0,
                            borderRadius: globalStyles().borderRadius.borderRadius
                        }
                    ]}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceholder>
                    <FlatList
                        data={Array(6).fill({})}
                        renderItem={() => <ProductCardSkeleton />}
                        keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                    />
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
}