import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../UI/CustumText'
import { useTheme } from '../../context/ThemeContext';
import { ProductCardSelectTheme } from '../../theme/UI/cardsStyles';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const CardSelectSkeleton = () => {

    const { theme, typeTheme } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <TouchableOpacity
            style={[
                ProductCardSelectTheme(theme, typeTheme).CardSelect,
            ]}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: "100%"
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10
                    }}
                >
                    <ShimmerPlaceholder
                        style={[
                            ProductCardSelectTheme(theme, typeTheme).CardSelectMessage,
                            { width: "10%" }
                        ]}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        style={[
                            ProductCardSelectTheme(theme, typeTheme).CardSelectMessage,
                            {
                                width: "55%"
                            }
                        ]}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceholder>
                </View>

                <ShimmerPlaceholder
                    style={[
                        ProductCardSelectTheme(theme, typeTheme).CardSelectMessage,
                        {
                            width: "30%"
                        }
                    ]}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceholder>

            </View>

        </TouchableOpacity>
    )
}

export default CardSelectSkeleton