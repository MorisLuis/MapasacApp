import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";


export const CodebarUpdateScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    CodebarUpdateScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding
    },
    selectorCodebarType: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    actualCodebarType: {
        display: "flex",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    actualCodebarTypeText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    actualCodebarTypeChange: {
        fontSize: globalFont.font_sm,
        color: theme.color_blue,
    },
    optionCodebarText: {
        color: typeTheme === 'light' ? theme.text_color : theme.text_color
    },
    optionCodebarTextActive: {
        color: typeTheme === 'light' ? theme.text_color_secondary : theme.text_color_secondary
    }
})