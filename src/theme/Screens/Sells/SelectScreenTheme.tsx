import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";
import { heightPercentageToDP } from "react-native-responsive-screen";

export const SelectScreenTheme = (theme: Theme ) => StyleSheet.create({
    SelectScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles().globalPadding.padding,
        paddingBottom: heightPercentageToDP("22%")
    },
    header: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    headerTitle: {
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    }
})