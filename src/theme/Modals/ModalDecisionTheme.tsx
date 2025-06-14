import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../appTheme";

export const ModalDecisionStyles = (theme: Theme, typeTheme: string, size: (_value: string) => number) => StyleSheet.create({
    ModalDecision: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContent: {
        backgroundColor: theme.background_color,
        shadowColor: theme.background_color_tertiary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color
    },
    modalChildren: {
        padding: globalStyles().globalPadding.padding,
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    message: {
        fontSize: globalFont(size).font_med,
        paddingHorizontal: globalStyles().globalPadding.padding,
        paddingTop: globalStyles().globalPadding.padding,
        width: "95%",
        color: theme.text_color,
        fontFamily: 'Rubik-Regular'
    }
});
