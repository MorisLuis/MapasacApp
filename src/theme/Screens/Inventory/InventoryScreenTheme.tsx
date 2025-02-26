import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const InventoryScreenStyles = (theme: Theme) => StyleSheet.create({
    content: {
        padding: globalStyles(theme).globalPadding.padding,
        height: "100%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("2.5%"),
        marginTop: hp("2.5%") + globalStyles(theme).globalPadding.padding // This is because customTabBarAbsolute in CustumTabBar.
    },
    headerContent: {
        display: 'flex'
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
        alignContent: 'flex-end',
        height: "100%"
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
        fontSize: globalFont.font_normal
    }
})