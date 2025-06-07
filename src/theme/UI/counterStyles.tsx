import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";

export const counterStyles = (theme: Theme, size: (_value: string) => number ) => StyleSheet.create({
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
        paddingHorizontal: size("3%"),
        borderRadius: globalStyles().borderRadius.borderRadius,
        fontSize: globalFont(size).font_normal,
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
        fontSize: globalFont(size).font_normal,
        color: theme.text_color,
        marginRight: globalStyles().globalMarginBottom.marginBottom / 4
    },
    unitText: {
        fontSize: globalFont(size).font_sm,
        color: theme.text_color
    },
})

export const counterSecondaryStyles = (theme: Theme, size: (_value: string) => number)  => StyleSheet.create({
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        textAlign: 'center',
        alignItems: 'center',
        marginHorizontal: globalStyles().globalMarginBottom.marginBottom / 2,
        paddingHorizontal: size("3%"),
        borderRadius: globalStyles().borderRadius.borderRadius,
        fontSize: globalFont(size).font_normal,
        color: theme.text_color,
        height: "100%",
        maxWidth: '75%'
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
        fontSize: globalFont(size).font_big * 1.5,
        color: theme.text_color,
        marginRight: globalStyles().globalMarginBottom.marginBottom / 4,
        fontWeight: "bold",
        textAlign: 'center'
    },
    unitText: {
        fontSize: globalFont(size).font_sm,
        color: theme.text_color
    },

    counterClean: {
        display: 'flex',
        alignItems: 'center',
        marginTop: globalStyles().globalMarginBottom.marginBottom,
    },

    counterClean_content: {
        width: "50%",
        minWidth: 100,
    },

})