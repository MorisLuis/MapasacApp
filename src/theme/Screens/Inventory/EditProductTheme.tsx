import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const EditProductStyles = (theme: Theme ) =>  StyleSheet.create({
    EditProductInBag_title: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    EditProductInBag_header: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    EditProductInBag_warning: {
        fontSize: globalFont.font_normal,
        color: theme.color_red,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    }
});