import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from "../appTheme";

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
        marginHorizontal: globalStyles().globalMarginBottom.marginBottom / 2,
        backgroundColor: theme.background_color_secondary,
        paddingHorizontal: wp("3%"),
        borderRadius: globalStyles().borderRadius.borderRadius,
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        height: "100%"
    },
    counterButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles().globalPadding.padding / 5,
        borderRadius: globalStyles().borderRadius.borderRadius,
        height: "100%"
    },
    inputText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        marginRight: globalStyles().globalMarginBottom.marginBottom / 4
    },
    unitText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
})

export const counterSecondaryStyles = (theme: Theme)  => StyleSheet.create({
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
        marginHorizontal: globalStyles().globalMarginBottom.marginBottom / 2,
        paddingHorizontal: wp("3%"),
        borderRadius: globalStyles().borderRadius.borderRadius,
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
        padding: globalStyles().globalPadding.padding / 5,
        borderRadius: globalStyles().borderRadius.borderRadius,
    },
    inputText: {
        fontSize: globalFont.font_big * 1.5,
        color: theme.text_color,
        marginRight: globalStyles().globalMarginBottom.marginBottom / 4,
        fontWeight: "bold",
        textAlign: 'center', // Optional: center the text if desired

    },
    unitText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },

    counterClean: {
        display: 'flex',
        alignItems: 'center',
        marginTop: globalStyles().globalMarginBottom.marginBottom
    },


    counterClean_content: {
        width: "40%",
        minWidth: 100
    },

})