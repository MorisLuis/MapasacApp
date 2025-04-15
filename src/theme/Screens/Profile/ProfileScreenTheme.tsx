import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";


export const ProfileScreenStyles = (theme: Theme ) => StyleSheet.create({
    ProfileScreen: {
        backgroundColor: theme.background_color, 
        flex: 1
    },
    ProfileScreen_content: {
        display: 'flex',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color
    },
    section: {
        paddingVertical: globalStyles().globalMarginBottom.marginBottom * 0.75,
        borderWidth: 1,
        borderColor: "transparent",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.7
    },
    title: {
        fontSize: globalFont.font_med,
        fontWeight: "bold",
        paddingTop: globalStyles().globalPadding.padding,
        color: theme.text_color
    },
    logOutDB: {

    },
    logOutDBText: {
        textDecorationLine: "underline",
        color: theme.text_color
    },
    closeSession: {
        marginVertical: globalStyles().globalMarginBottom.marginBottom,
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: theme.color_border
    }
})