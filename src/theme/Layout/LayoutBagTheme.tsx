import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";


export const LayoutBagStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({

    LayoutBagScreen: {
        height: '100%',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color
    },
    content: {
        paddingBottom: size("12.5%")
    },
    message: {
        padding: globalStyles().globalPadding.padding,
        color: theme.text_color,
        backgroundColor: theme.background_color
    },
    input: {
        fontSize: globalFont(size).font_normal,
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
        //marginTop: 10
    },
    footer_price_landscape: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-end',
        gap: globalStyles().gap.gap,
        marginTop: globalStyles().globalMarginBottomSmall.marginBottom
    },
    priceText: {
        fontSize: globalFont(size).font_med,
        fontFamily: 'Rubik-Bold',
        lineHeight: globalFont(size).font_med
    },
    priceLabel: {
        fontSize: globalFont(size).font_normal,
        lineHeight: globalFont(size).font_normal
    },

    inputSearch: {
        fontSize: globalFont(size).font_normal,
        fontFamily: 'SourceSans3-Regular',
        color: theme.text_color
    }
})