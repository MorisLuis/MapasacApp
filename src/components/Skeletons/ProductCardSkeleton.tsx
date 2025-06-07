import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { productCardstyles } from "../../theme/UI/cardsStyles";
import { Theme, globalFont, globalStyles } from "../../theme/appTheme";
import { JSX } from "react";
import { useTheme } from '../../hooks/styles/useTheme';

export type cardSkeletonType = 'bag' | 'inventory';

interface ProductCardSkeletonInterface {
    type?: cardSkeletonType
}

const DIVIDER_TWO = 2;

export const ProductCardSkeleton = ({
    type = 'inventory'
}: ProductCardSkeletonInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <TouchableOpacity
            style={[
                productCardstyles({ theme, typeTheme, size }).productCard,
                extraStyles(theme, size).productCard
            ]}
        >
            <View
                style={[
                    productCardstyles({ theme, size }).productCard__data,
                    extraStyles(theme, size).productCard__data
                ]}
            >
                <View>
                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[
                            productCardstyles({ theme, size }).information__description,
                            extraStyles(theme, size).information__description
                        ]}
                    />
                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[
                            productCardstyles({ theme, size }).information__description,
                            extraStyles(theme, size).information__description2
                        ]}
                    />
                    {type === 'inventory' && (
                        <ShimmerPlaceholder
                            shimmerColors={shimmerColors}
                            LinearGradient={LinearGradient}
                            style={[
                                productCardstyles({ theme, size }).information__description,
                                extraStyles(theme, size).information__description3
                            ]}
                        />
                    )}
                    {type === 'bag' && (
                        <>
                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[
                                    productCardstyles({ theme, size }).information__description,
                                    extraStyles(theme, size).information__description4
                                ]}
                            />
                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[
                                    productCardstyles({ theme, size }).information__description,
                                    extraStyles(theme, size).information__description5
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
const extraStyles = (theme: Theme, size: (_value: string) => number): ReturnType<typeof StyleSheet.create> =>
    StyleSheet.create({
        productCard: {
            minHeight: 80
        },
        productCard__data: {
            borderColor: theme.color_border_secondary
        },
        information__description: {
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / DIVIDER_TWO,
            height: globalFont(size).font_med
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
