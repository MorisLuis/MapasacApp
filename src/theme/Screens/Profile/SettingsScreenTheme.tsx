import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SettingsScreenStyles = (theme: Theme) => StyleSheet.create({
    SettingsScreen: {
        
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color
    },
    section: {
        display: "flex"
    },
    sectionContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sectionClosed: {
        paddingTop: globalStyles(theme).globalPadding.padding
    },
    label: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold",
        color: theme.text_color
    },
    edit: {
        fontWeight: 'bold',
        textDecorationLine: "underline",
        color: theme.text_color
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: theme.color_border,
        marginVertical: globalStyles(theme).globalMarginBottom.marginBottom * 1.5
    }
})