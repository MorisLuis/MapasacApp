import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";


export const PersonalInformationStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    PersonalInformation: {
        height: '100%',
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding
    },

    profile: {
        backgroundColor: "transparent",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },

    circle: {
        backgroundColor: theme.background_color_secondary,
        padding: 6,
        borderRadius: 100,
        width: 50,
        height: 50,
    },

    circleContent: {
        backgroundColor: theme.background_color_secondary,
        //padding: 5,
        borderRadius: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        height: "100%",
        borderWidth: 1,
        borderColor: theme.color_border_secondary
    },

    circleText: {
        color: theme.text_color,
        fontSize: globalFont.font_normal,
        borderRadius: 100
    },

    name: {
        fontWeight: "bold",
        color: theme.text_color
    },

    information: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.background_color_secondary,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_secondary,
        borderRadius: 5,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    data: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        position: "relative",
        color: theme.text_color
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        color: theme.text_color
    },
    separator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: `${theme.color_border}${Math.round(0.25 * 255).toString(16)}`,
    },
})