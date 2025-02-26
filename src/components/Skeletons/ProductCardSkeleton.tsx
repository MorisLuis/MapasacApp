import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "../../theme/UI/cardsStyles";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { globalFont, globalStyles } from "../../theme/appTheme";

export const ProductCardSkeleton = () => {

    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];


    return (
        <TouchableOpacity style={[styles(theme, typeTheme).productInventoryCard, { minHeight: 120 }]}>
            <View style={[styles(theme).productInventoryCard__data, { backgroundColor: theme.background_color }]}>
                <View>
                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[styles(theme).description, { marginBottom: globalStyles().globalMarginBottomSmall.marginBottom, height: globalFont.font_med }]}
                    ></ShimmerPlaceholder>

                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[styles(theme).description, { marginBottom: globalStyles().globalMarginBottomSmall.marginBottom, width: "80%" }]}
                    ></ShimmerPlaceholder>

                    <ShimmerPlaceholder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[styles(theme).description, { width: "65%" }]}
                    ></ShimmerPlaceholder>
                </View>
            </View>
        </TouchableOpacity>
    );
};