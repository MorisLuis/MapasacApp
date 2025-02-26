
import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CameraScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: theme.color_black,
        position: "relative",
        padding: globalStyles().globalPadding.padding
    },
    cameraContainer: {
        flex: 1,
        height: hp("100%"),
        width: wp('100%'),
        position: "absolute",
        top: 0
    },
    camera: {
        flex: 1
    },
    backgroundBlurTop: {
        backgroundColor: theme.background_color_blur,
        width: wp('100%'),
        height: hp("32.5%"),
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2
    },
    backgroundBlurBottom: {
        backgroundColor: theme.background_color_blur,
        width: wp('100%'),
        height: hp("32.5%"),
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2
    },
    option: {
        flex: 1,
        borderRadius: 30,
        padding: 5,
        backgroundColor: theme.background_color_blur,
    },
    message: {
        position: "absolute",
        top: hp("25%"),
        left: wp("20%"),
        width: wp("60%"),
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        zIndex: 2,
    },
    textmessage: {
        color: typeTheme === 'light' ? theme.text_color_secondary : theme.text_color,
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        fontSize: globalFont.font_normal
    },
    /* scanSvgContainer: {
        position: "absolute",
        top: hp("50%"),
        left: wp("50%"),
        transform: [{ translateX: -150 }, { translateY: -150 }],
        zIndex: 2
    }, */
    actions: {
        position: "absolute",
        right: globalStyles().globalPadding.padding,
        top: hp("42.5%"),
        zIndex: 2
    },
    flash: {
        marginBottom: 20,
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding / 3,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border
    },
    cog: {
        marginBottom: 20,
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding / 3,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border
    },
    bagCounter: {
        position: "absolute",
        width: hp("3%"),
        height: hp("3%"),
        top: - globalStyles(theme).globalPadding.padding / 2,
        right: - globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2,
        backgroundColor: theme.color_tertiary,
        borderWidth: 1,
        borderColor: theme.color_border_dark,
        justifyContent: "center",
        alignItems: "center"
    },
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
})
