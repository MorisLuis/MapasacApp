
import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const CameraScreenStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: theme.color_black,
        position: "relative",
        padding: globalStyles().globalPadding.padding
    },
    cameraContainer: {
        flex: 1,
        height: size("100%"),
        width: size('100%'),
        position: "absolute",
        top: 0
    },
    camera: {
        flex: 1
    },
    backgroundBlurTop: {
        //backgroundColor: theme.background_color_blur,
        width: size('100%'),
        height: heightPercentageToDP("32.5%"),
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor:'orange'
    },
    backgroundBlurBottom: {
        //backgroundColor: theme.background_color_blur,
        width: size('100%'),
        height: heightPercentageToDP("32.5%"),
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        backgroundColor:'orange'
    },
    option: {
        flex: 1,
        borderRadius: 30,
        padding: 5,
        backgroundColor: theme.background_color_blur,
    },
    message: {
        position: "absolute",
        top: heightPercentageToDP("25%"),
        left: widthPercentageToDP("20%"),
        width: widthPercentageToDP("60%"),
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        zIndex: 2,
        maxWidth: "60%",
        backgroundColor: 'red'
    },
    textmessage: {
        color: typeTheme === 'light' ? theme.text_color_secondary : theme.text_color,
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        fontSize: globalFont(size).font_normal
    },
    actions: {
        position: "absolute",
        right: globalStyles().globalPadding.padding,
        top: size("42.5%"),
        zIndex: 2
    },
    flash: {
        marginBottom: 20,
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles().globalPadding.padding / 3,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border
    },
    cog: {
        marginBottom: 20,
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles().globalPadding.padding / 3,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border
    },
    bagCounter: {
        position: "absolute",
        width: size("3%"),
        height: size("3%"),
        top: - globalStyles().globalPadding.padding / 2,
        right: - globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius * 2,
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
        zIndex: 1,
        backgroundColor: 'red'
    },
})
