import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../appTheme";

export const ConfirmationScreenStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({

    ConfirmationScreen: {
        height: '100%',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        position: 'relative',
        paddingBottom: globalStyles().globalPadding.padding
    },
    confirmationSells: {
        padding: globalStyles().globalPadding.padding / 3,
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles().globalMarginBottom.marginBottom * 2,
        width: "100%",
    },
    confirmationContainer: {
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles().globalPadding.padding,
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius / 2,
    },
    subtitleConfirmation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 15
    },
    subtitleConfirmation_text: {
        fontFamily: 'Rubik-Bold',
        color: theme.text_color
    },
    confirmationItem: {
        display: "flex",
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between'
    },
    confirmationItemLabel: {
        fontSize: globalFont(size).font_normal,
    },

    confirmation: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    confirmationHeader: {
        height: size("20%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    confirmationHeaderTitle: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    },
    confirmationInfo: {
        borderBottomWidth: 1,
        borderBottomColor: theme.color_border_dark,
        paddingVertical: globalStyles().globalPadding.padding,
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    paymentMethodContainer: {
        backgroundColor: theme.background_color_secondary,
        borderWidth: 0.3,
        borderColor: theme.color_border,
        padding: globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles().globalMarginBottom.marginBottom * 2,
        height: 'auto'
    },

    typeMethodContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    paymentMethodItem: {
        flex: 1,
        backgroundColor: theme.background_color_secondary,
        width: "100%",
        padding: globalStyles().globalPadding.padding,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 0.2,
        borderColor: theme.color_border
    },
    paymentMethodItemActive: {
        flex: 1,
        width: "100%",
        padding: globalStyles().globalPadding.padding,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark
    },
    confirmationProductsContentHeader: {
        color: theme.text_color,
        fontSize: globalFont(size).font_sm,
        textTransform: "uppercase",
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2
    },
    confirmationText: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color,
        fontWeight: 'bold'
    }
})