import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const InventoryScreenStyles = (theme: Theme, size: (_value: string) => number ) => StyleSheet.create({
    content: {
        paddingHorizontal: globalStyles().globalPadding.padding,
        height: "100%",
        paddingTop: size("5%")
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    headerContent: {
        display: 'flex'
    },
    content_products: {
        marginBottom: size("2.5%") + globalStyles().globalMarginBottom.marginBottom
    },
    title: {
        display: "flex",
        fontSize: globalFont(size).font_big,
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    },
    subtitle: {
        display: 'flex',
        alignSelf: 'flex-start', 
        flexShrink: 1
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        alignContent: 'flex-end'
    },
    iconSearch: {
        display: 'flex',
        marginBottom: 0,
        height: 'auto',
        color: theme.text_color,
        alignSelf: 'flex-start', 
        flexShrink: 1
    },
    footerMessage: {
        fontSize: globalFont(size).font_normal,
        paddingVertical: globalStyles().globalPadding.padding
    }
})