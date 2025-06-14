import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const customHeaderStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    CustomHeader: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: theme.background_color,
        backgroundColor: theme.background_color,
        borderBottomWidth: 1,
        position: "relative",
        width: "100%",
        height: size("6%"),
    },
    CustomHeaderSecondary: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: theme.background_color,
        backgroundColor: theme.background_color_secondary,
        borderBottomWidth: 1,
        position: "relative",
        width: "100%",
        height: size("6%"),
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: globalStyles().globalMarginBottom.marginBottom / 2,
        bottom: (size("6%") * 0.5) - (globalFont(size).font_normal / 2) - 3
    },
    backText: {
        marginLeft: 5,
        color: theme.text_color,
        fontFamily: 'Rubik-Bold',
        fontSize: globalFont(size).font_sm
    },
    titleHeader: {
        marginBottom: 0,
        padding: 0,
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
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