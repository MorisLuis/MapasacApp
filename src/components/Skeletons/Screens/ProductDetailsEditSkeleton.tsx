import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { ProductDetailsSkeletonStyles } from '../../../theme/UI/skeletons';
import { useTheme } from '../../../context/ThemeContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ProductDetailsEditSkeleton = () => {
    const { theme, typeTheme } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <View style={ProductDetailsSkeletonStyles(theme).ProductDetailsPage}>
            <ShimmerPlaceHolder
                style={ProductDetailsSkeletonStyles(theme).ProductDetailsEditSkeleton}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                style={ProductDetailsSkeletonStyles(theme).ProductDetailsEditSkeleton}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                style={ProductDetailsSkeletonStyles(theme).ProductDetailsEditSkeleton}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>
        </View>
    )




}
