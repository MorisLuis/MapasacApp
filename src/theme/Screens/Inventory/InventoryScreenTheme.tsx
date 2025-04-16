import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const InventoryScreenStyles = (theme: Theme) => StyleSheet.create({
    content: {
        paddingHorizontal: globalStyles().globalPadding.padding,
        height: "100%",
        paddingTop: hp("5%")
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
        marginBottom: hp("2.5%") + globalStyles().globalMarginBottom.marginBottom
    },
    title: {
        display: "flex",
        fontSize: globalFont.font_big,
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
        fontSize: globalFont.font_normal,
        paddingVertical: globalStyles().globalPadding.padding
    }
})