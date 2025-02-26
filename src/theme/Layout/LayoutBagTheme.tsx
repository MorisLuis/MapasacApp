import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const LayoutBagStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    InventoryBagScreen: {
        height: '100%',
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
        //paddingBottom: 10
    },
    content: {
        paddingBottom: hp("22%")
    },
    message: {
        padding: globalStyles(theme).globalPadding.padding,
        color: theme.text_color,
        backgroundColor: theme.background_color
    },
    footer: {
        backgroundColor: theme.background_color,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: globalStyles(theme).globalPadding.padding,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_secondary,
    },
    footer_actions: {
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    footer_price: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-end',
        paddingVertical: globalStyles(theme).globalPadding.padding / 2,
        gap: 10,
        marginTop: 10
    },
    priceText: {
        fontSize: globalFont.font_med,
        fontFamily: 'Rubik-Bold',
        lineHeight: globalFont.font_med
    },
    priceLabel: {
        fontSize: globalFont.font_normal,
        lineHeight: globalFont.font_normal
    }
})