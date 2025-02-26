import { StyleSheet } from "react-native";
import {Theme, globalFont, globalStyles } from "../../appTheme";

export const CodebarUpdateWithInputScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    CodebarUpdateWithInputScreen: {
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding,
        height: "100%"
    },
    inputLabel: {
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        color: theme.text_color
    },
    warningMessage: {
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        color: typeTheme === "light" ? theme.color_red : theme.color_tertiary,
        width: "80%",
    }
})