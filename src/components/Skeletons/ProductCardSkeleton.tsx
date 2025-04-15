import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from "../../context/ThemeContext";
import { productCardstyles } from "../../theme/UI/cardsStyles";
import { Theme, globalFont, globalStyles } from "../../theme/appTheme";
import { JSX } from "react";

export type cardSkeletonType = 'bag' | 'inventory';

interface ProductCardSkeletonInterface {
    type?: cardSkeletonType
}

const DIVIDER_TWO = 2;

export const ProductCardSkeleton = ({
    type = 'inventory'
}: ProductCardSkeletonInterface): JSX.Element => {

    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <TouchableOpacity
            style={[
                productCardstyles(theme, typeTheme).productCard, 
                extraStyles(theme).productCard
            ]}
        >
            <View
                style={[
                    productCardstyles(theme).productCard__data, 
                    extraStyles(theme).productCard__data
                ]}
            >
                <View>
                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[
                            productCardstyles(theme).information__description, 
                            extraStyles(theme).information__description
                        ]}
                    />
                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[
                            productCardstyles(theme).information__description, 
                            extraStyles(theme).information__description2
                        ]}
                    />
                    {type === 'inventory' && (
                        <ShimmerPlaceholder
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                            style={[
                                productCardstyles(theme).information__description, 
                                extraStyles(theme).information__description3
                            ]}
                        />
                    )}
                    {type === 'bag' && (
                        <>
                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[
                                    productCardstyles(theme).information__description, 
                                    extraStyles(theme).information__description4
                                ]}
                            />
                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[
                                    productCardstyles(theme).information__description, 
                                    extraStyles(theme).information__description5
                                ]}
                            />
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

/* eslint-disable react-native/no-unused-styles */
const extraStyles = (theme: Theme): ReturnType<typeof StyleSheet.create> =>
    StyleSheet.create({
        productCard: {
            minHeight: 80
        },
        productCard__data: {
            borderColor: theme.color_border_secondary
        },
        information__description: {
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / DIVIDER_TWO,
            height: globalFont.font_med
        },
        information__description2: {
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / DIVIDER_TWO,
            width: "120%"
        },
        information__description3: {
            width: "80%"
        },
        information__description4: {
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
            width: "80%"
        },
        information__description5: {
            width: "70%"
        }
    });
