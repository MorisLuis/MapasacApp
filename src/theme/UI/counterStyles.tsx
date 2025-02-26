import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const counterStyles = (theme: Theme) => StyleSheet.create({
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        textAlign: 'center',
        alignItems: 'center',
        marginHorizontal: globalStyles(theme).globalMarginBottom.marginBottom / 2,
        backgroundColor: theme.background_color_secondary,
        paddingHorizontal: wp("3%"),
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        height: "100%"
    },
    counterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding / 5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        height: "100%"
    },
    inputText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        marginRight: globalStyles(theme).globalMarginBottom.marginBottom / 4
    },
    unitText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
})

export const counterSecondaryStyles = (theme: Theme) => StyleSheet.create({
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        textAlign: 'center',
        alignItems: 'center',
        marginHorizontal: globalStyles(theme).globalMarginBottom.marginBottom / 2,
        paddingHorizontal: wp("3%"),
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        height: "100%",
        maxWidth: 250,
    },
    counterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding / 5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
    },
    inputText: {
        fontSize: globalFont.font_big * 1.5,
        color: theme.text_color,
        marginRight: globalStyles(theme).globalMarginBottom.marginBottom / 4,
        fontWeight: "bold",
        textAlign: 'center', // Optional: center the text if desired

    },
    unitText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
})