import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";


export const ProductDetailsSkeletonStyles = (theme: Theme, size: (_value: string) => number ) => StyleSheet.create({
    ProductDetailsPage: {
        height: '100%',
        padding: size("2.5%"),
        backgroundColor: theme.background_color,
        paddingBottom: size("10%"),
        flex: 1
    },
    imageContainer: {
        minHeight: 300,
        width: "100%",
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },

    header: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    description: {
        height: globalFont(size).font_med,
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
        height: globalFont(size).font_normal + (globalStyles().globalPadding.padding * 1.5),
        width: "100%",
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    }
})