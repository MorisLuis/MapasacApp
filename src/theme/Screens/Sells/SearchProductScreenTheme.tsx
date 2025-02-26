import { StyleSheet } from "react-native";
import {Theme, globalFont, globalStyles } from "../../appTheme";


export const SearchProductScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SearchProductScreen: {
        flex: 1,
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding,
    },
    content: {
    },
    adviceHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    titleHeader: {
        fontSize: globalFont.font_normal,
        color: typeTheme === 'light' ? theme.color_red : theme.text_color,
        fontWeight: "bold"
    },
    adviceMessage: {},
    adviceMessage1: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    adviceMessage2: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        fontSize: globalFont.font_normal,
        color: theme.text_color
    }
})