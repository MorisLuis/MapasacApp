import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";


export const ProductDetailsSkeletonStyles = (theme: Theme) => StyleSheet.create({
    ProductDetailsPage: {
        padding: globalStyles(theme).globalPadding.padding,
        height: "100%",
        backgroundColor: theme.background_color
    },
    imageContainer: {
        minHeight: 300,
        width: "100%",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },

    header: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    description: {
        height: globalFont.font_med,
        fontWeight: "bold",
        marginBottom: 5
    },
    price: {
        marginBottom: 5,
        width: 50,
        height: 12
    },
    priceSecond: {
        width: 100
    },
    information: {
        borderRadius: 5,
        width: "100%",
        height: 200
    },

    ProductDetailsEditSkeleton: {
        height: globalFont.font_normal + (globalStyles(theme).globalPadding.padding * 1.5),
        width: "100%",
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
    }
})