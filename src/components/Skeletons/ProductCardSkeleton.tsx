import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { productCardstyles } from "../../theme/UI/cardsStyles";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { globalFont, globalStyles } from "../../theme/appTheme";

export type cardSkeletonType = 'bag' | 'inventory';

interface ProductCardSkeletonInterface {
    type?: cardSkeletonType
}

export const ProductCardSkeleton = ({
    type = 'inventory'
}: ProductCardSkeletonInterface) => {

    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];


    return (
        <TouchableOpacity style={[productCardstyles(theme, typeTheme).productCard, { minHeight: 80 }]}>
            <View style={[productCardstyles(theme).productCard__data, { borderColor: theme.color_border_secondary }]}>
                <View>
                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[productCardstyles(theme).information__description, { marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2, height: globalFont.font_med }]}
                    ></ShimmerPlaceholder>

                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[productCardstyles(theme).information__description, { marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2, width: "120%" }]}
                    ></ShimmerPlaceholder>

                    {
                        type === 'inventory' &&
                        <>
                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[productCardstyles(theme).information__description, { width: "80%" }]}
                            ></ShimmerPlaceholder>

                        </>
                    }


                    {
                        type === 'bag' &&
                        <>
                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[productCardstyles(theme).information__description, { marginBottom: globalStyles().globalMarginBottomSmall.marginBottom, width: "80%" }]}
                            ></ShimmerPlaceholder>

                            <ShimmerPlaceholder
                                shimmerColors={shimmerColors}
                                LinearGradient={LinearGradient}
                                style={[productCardstyles(theme).information__description, { width: "70%" }]}
                            ></ShimmerPlaceholder>
                        </>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};