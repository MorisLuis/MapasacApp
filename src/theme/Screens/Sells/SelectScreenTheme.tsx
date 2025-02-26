import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SelectScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SelectScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles().globalPadding.padding,
        paddingBottom: 100
    },
    header: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    headerTitle: {
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    }
})