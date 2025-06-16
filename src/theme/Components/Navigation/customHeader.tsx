import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const customHeaderStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    CustomHeader: {
        borderBottomColor: theme.background_color,
        backgroundColor: theme.background_color,
        borderBottomWidth: 1,
        position: "relative",
        width: "100%",
        height: size("6%"),
        display: 'flex',
        justifyContent: 'flex-end'
    },
    CustomHeaderSecondary: {
        alignItems: 'center',
        borderBottomColor: theme.background_color,
        backgroundColor: theme.background_color_secondary,
        borderBottomWidth: 1,
        position: "relative",
        width: "100%",
    },
    content: {
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        height: globalFont(size).font_med,
        paddingHorizontal: globalStyles().globalPadding.padding
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: globalStyles().globalPadding.padding,
        bottom: globalFont(size).font_med - globalFont(size).font_normal - globalFont(size).font_med / 3
    },
    backText: {
        color: theme.text_color,
        fontFamily: 'Rubik-Bold',
        fontSize: globalFont(size).font_normal,
        paddingHorizontal: size("1%")
    },
    titleHeader: {
        marginBottom: 0,
        padding: 0,
        color: theme.text_color,
        fontFamily: 'Rubik-Bold',
        fontSize: globalFont(size).font_normal
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: globalStyles().globalMarginBottom.marginBottom,
        bottom: 0,
    },
    rightText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 3,
        color: theme.color_blue
    }
})