import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from "../appTheme";


export const LayoutBagStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    InventoryBagScreen: {
        height: '100%',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        position: 'relative',
        paddingBottom: 10
    },
    content: {
        paddingBottom: hp("22%")
    },
    InventoryBagScreen_empty: {
        backgroundColor: theme.background_color, 
        flex: 1
    },
    message: {
        padding: globalStyles().globalPadding.padding,
        color: theme.text_color,
        backgroundColor: theme.background_color
    },
    input: {
        fontSize: globalFont.font_normal, 
        fontFamily: 'SourceSans3-Regular', 
        color: theme.text_color
    },
    footer: {
        backgroundColor: theme.background_color,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: globalStyles().globalPadding.padding,
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
        paddingVertical: globalStyles().globalPadding.padding / 2,
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
    },

    inputSearch: {
        fontSize: globalFont.font_normal, 
        fontFamily: 'SourceSans3-Regular',
        color: theme.text_color
    }
})