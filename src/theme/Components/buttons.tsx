import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";

export const buttonStyles = ({ theme, typeTheme, size }: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => {

    const global = globalStyles();
    const globalF = globalFont(size);

    return StyleSheet.create({
        button: {
            height: size("5%"),
            backgroundColor: theme.color_tertiary,
            borderWidth: 1,
            borderColor: theme.color_border_dark,
            borderRadius: global.borderRadius.borderRadius,
            paddingHorizontal: global.globalPadding.padding,
            width: "100%",
            color: theme.text_color_secondary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: global.globalMarginBottomSmall.marginBottom / 2
        },

        button_small: {
            flexDirection: "row",
            backgroundColor: theme.background_color_secondary,
            borderWidth: 1,
            borderColor: theme.color_border_dark,
            borderRadius: global.borderRadius.borderRadius,
            paddingHorizontal: global.globalPadding.padding,
            paddingVertical: global.globalPadding.padding / 2,
            width: "100%",
            color: theme.color_tertiary,
            display: "flex",
            gap: global.globalMarginBottomSmall.marginBottom / 2,
            justifyContent: 'center'
        },

        // Button text
        buttonText: {
            color: typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
            fontSize: globalF.font_normal,
            fontFamily: 'Rubik-Regular'
        },

        buttonTextSecondary: {
            color: typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
            fontSize: globalF.font_normal,
            fontFamily: 'Rubik-Regular'
        },

        buttonTextTertiary: {
            color: typeTheme === 'light' ? theme.text_color : theme.text_color,
            fontSize: globalF.font_normal,
            fontFamily: 'Rubik-Regular'
        },

        buttonTextRed: {
            color: theme.color_red,
            fontSize: globalF.font_normal
        },

        buttonTextClear: {
            color: theme.text_color_light,
            fontSize: globalF.font_sm,
            width: "100%",
            textAlign: 'center'
        },

        // Others
        button_line: {
            height: 36,
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: "transparent",
            borderRadius: global.borderRadius.borderRadius,
            paddingHorizontal: global.globalPadding.padding,
            width: "100%",
            color: theme.text_color_secondary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },

        button_line_text: {
            textDecorationLine: "underline"
        },

        svg: {
            marginRight: 8
        },

        search: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: theme.color_border_dark,
            color: theme.text_color
        },

        disabled: {
            opacity: 0.5,
        },

        // Colors
        white: {
            backgroundColor: "transparent",
            color: theme.text_color,
            borderWidth: 1,
            borderColor: theme.color_border_dark,
        },

        purple: {
            backgroundColor: theme.color_purple,
            color: theme.text_color_secondary
        },

        green: {
            backgroundColor: theme.color_tertiary,
            color: theme.text_color_secondary
        },

        yellow: {
            backgroundColor: theme.color_tertiary,
            color: theme.text_color
        },

        red: {
            backgroundColor: theme.color_red_light,
            color: theme.color_red_light,
        },

        light: {
            backgroundColor: theme.background_color_secondary,
            textDecorationLine: "underline",
            borderWidth: 0,
        },
    });
};
