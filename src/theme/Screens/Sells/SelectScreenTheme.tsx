import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SelectScreenTheme = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    SelectScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles().globalPadding.padding,
        flex: 1
    },
    header: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    headerTitle: {
        fontSize: globalFont(size).font_med,
        textAlign: "center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    }
})