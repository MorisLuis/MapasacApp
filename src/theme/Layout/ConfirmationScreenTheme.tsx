import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ConfirmationScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    ConfirmationScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding,
        //paddingBottom: 100
    },
    confirmationSells: {
        padding: globalStyles().globalPadding.padding / 3,
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2,
        width: "100%",
        minHeight: 100
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
    confirmationItem: {
        display: "flex",
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between'
    },
    confirmationItemLabel: {
        fontSize: globalFont.font_normal,
    },

    confirmation: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    confirmationHeader: {
        height: hp("20%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    confirmationHeaderTitle: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    confirmationInfo: {
        borderBottomWidth: 1,
        borderBottomColor: theme.color_border_dark,
        paddingVertical: globalStyles(theme).globalPadding.padding,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    paymentMethodContainer: {
        backgroundColor: theme.background_color_secondary,
        borderWidth: 0.3,
        borderColor: theme.color_border,
        padding: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2,
        height: 'auto'
    },

    typeMethodContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    paymentMethodItem: {
        flex: 1,
        backgroundColor: theme.background_color_secondary,
        width: "100%",
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 0.2,
        borderColor: theme.color_border
    },
    paymentMethodItemActive: {
        flex: 1,
        width: "100%",
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark
    },
    confirmationProductsContentHeader: {
        color: theme.text_color,
        fontSize: globalFont.font_sm,
        textTransform: "uppercase",
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2
    },
    confirmationText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontWeight: 'bold'
    }
})