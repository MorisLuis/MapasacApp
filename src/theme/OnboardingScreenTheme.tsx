import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const OnboardingScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    OnboardingScreen: {
        backgroundColor: theme.background_color,
        height: hp('100%'),
        padding: globalStyles().globalPadding.padding
    },
    topbar: {
        height: hp('5%'),
        minHeight: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    topbar_profile: {
        backgroundColor: theme.color_secondary,
        height: 30,
        width: 30,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
    },
    topbar_profile_text: {
        fontSize: globalFont.font_normal,
        color: theme.color_tertiary,
        fontFamily: 'Rubik-Bold'
    },
    header: {
        width: wp("100%"),
        marginBottom: hp("1%")
    },
    headerTitle: {
        fontSize: globalFont.font_med * 1.2,
        color: theme.text_color,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        width: wp("80%"),
        fontFamily: 'Rubik-Bold'
    },
    content: {
        flex: 2,
        marginHorizontal: "auto",
        width: '100%',
        height: '100%'
    },
    moduleOptionRow: {
        flexDirection: "row",
        gap: globalStyles(theme).globalPadding.padding / 2,
        marginBottom: globalStyles(theme).globalPadding.padding / 2,
        height: hp("12.5%")
    },
    moduleOption: {
        borderWidth: 1,
        flex: 1,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 3,
        display: "flex",
        justifyContent: "space-between",
        borderColor: typeTheme === 'light' ?  theme.color_primary : theme.text_color_secondary,

        padding: globalStyles(theme).globalPadding.padding / 1.5
    },
    moduleOption2: {
        borderWidth: 0,
        flex: 1,
        padding: globalStyles(theme).globalPadding.padding / 2,
    },
    optionText: {
        fontSize: globalFont.font_normal,
        color: typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary,
        fontFamily: 'Rubik-Regular'
    }

})