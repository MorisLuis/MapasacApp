import React, { JSX } from 'react'
import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

import { ProductDetailsSkeletonStyles } from '../../../theme/UI/skeletons';
import { useTheme } from '../../../hooks/styles/useTheme';
import { globalStyles } from '../../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ProductDetailsSkeleton = () : JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary, 
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a", 
        theme.background_color_tertiary
    ]

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }}>
            <View style={ProductDetailsSkeletonStyles(theme, size).ProductDetailsPage}>
                <ShimmerPlaceHolder
                    style={ProductDetailsSkeletonStyles(theme, size).imageContainer}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceHolder>

                <View style={ProductDetailsSkeletonStyles(theme, size).header}>
                    <ShimmerPlaceHolder
                        style={ProductDetailsSkeletonStyles(theme, size).description}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceHolder>
                    <View>
                        <ShimmerPlaceHolder
                            style={ProductDetailsSkeletonStyles(theme, size).price}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        >
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                            style={ProductDetailsSkeletonStyles(theme, size).priceSecond}
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                        >
                        </ShimmerPlaceHolder>
                    </View>
                </View>

                <ShimmerPlaceHolder
                    style={ProductDetailsSkeletonStyles(theme, size).information}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceHolder>
            </View>
        </SafeAreaView>
    )

}
