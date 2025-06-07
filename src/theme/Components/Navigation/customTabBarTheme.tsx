
import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const customTabBarStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({

    customTabBar: {},
    customTabBarAbsolute: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        flex: 1
    },
    content: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: globalStyles().globalPadding.padding,
        justifyContent: "space-between"
    },
    content_left: {
        display: "flex",
        flexDirection: "row"
    },
    content_right: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        gap: globalStyles().gap.gap
    },
    user_name: {
        fontSize: globalFont(size).font_sm
    },
    buttonBack: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: size("5%"),
        width: size("5%"),
        maxHeight: 32,
        marginRight: size("1%"),
        borderWidth: 1,
        borderColor: theme.color_border_dark,
        backgroundColor: theme.background_color
    },

    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginRight: size("1%"),
        borderWidth: 0.7,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_black,
        overflow: "hidden"
    },
    blurContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    sectionTitle: {
        fontSize: globalFont(size).font_normal,
        paddingHorizontal: size("1%")
    },


    buttonBag: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: size("5%"),
        width: size("5%"),
        maxHeight: 32,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_secondary,
        backgroundColor: theme.background_color
    },
    bag: {
        backgroundColor: theme.color_tertiary,
        height: size("5%"),
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: globalStyles().globalPadding.padding
    },
    bagCounter: {
        position: "absolute",
        width: size("3%"),
        height: size("3%"),
        top: "-30%",
        right: "-30%",
        borderRadius: globalStyles().borderRadius.borderRadius * 2,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_dark,
        justifyContent: "center",
        alignItems: "center"
    },
    sectionBag: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    }
});

