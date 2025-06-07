import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SellsScreenStyles = (theme: Theme, size: (_value: string) => number ) => StyleSheet.create({
    SellsScreen: {
        padding: globalStyles().globalPadding.padding,
        height: "100%"
    },
    header: {
        display: "flex",
        flexDirection: "column",
        marginBottom: size("2.5%"),
    },
    header_title: {
        fontSize: globalFont(size).font_med,
        fontFamily: 'Rubik-Bold'
    },
    header_subtitle: {
        color: theme.text_color,
        fontSize: globalFont(size).font_sm
    },
    header_total: {
        color: theme.text_color,
        fontSize: globalFont(size).font_med,
        fontFamily: 'Rubik-Regular'
    }
})