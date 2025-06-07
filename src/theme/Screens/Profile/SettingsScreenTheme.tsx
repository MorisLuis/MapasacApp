import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SettingsScreenStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    SettingsScreen: {
        backgroundColor: theme.background_color,
        flex: 1
    },
    SettingsScreen__content: {
        padding: globalStyles().globalPadding.padding,
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
        paddingTop: globalStyles().globalPadding.padding
    },
    label: {
        fontSize: globalFont(size).font_normal,
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
        marginVertical: globalStyles().globalMarginBottom.marginBottom * 1.5
    }
})