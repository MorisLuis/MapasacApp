import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const EditProductStyles = (theme: Theme, typeTheme?: string ) =>  StyleSheet.create({
    EditProductInBag_title: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    EditProductInBag_header: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    EditProductInBag_warning: {
        fontSize: globalFont.font_normal,
        color: theme.color_red,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
    }
});