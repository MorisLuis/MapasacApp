import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SellsScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsScreen: {
        padding: globalStyles().globalPadding.padding,
        height: "100%"
    },
    header: {
        display: "flex",
        flexDirection: "column",
        marginBottom: hp("2.5%"),
    },
    header_title: {
        fontSize: globalFont.font_med,
        fontFamily: 'Rubik-Bold'
    },
    header_subtitle: {
        color: theme.text_color,
        fontSize: globalFont.font_sm
    },
    header_total: {
        color: theme.text_color,
        fontSize: globalFont.font_med,
        fontFamily: 'Rubik-Regular'
    }
})