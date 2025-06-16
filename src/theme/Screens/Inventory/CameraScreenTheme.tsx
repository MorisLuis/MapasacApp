
import {StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const CameraScreenStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: theme.color_black,
        position: "relative",
        width: "100%"
    },
    cameraContainer: {
        //flex: 1,
        height: "100%",
        width: '100%',
        position: "absolute",
        top: 0
    },
    camera: {
        flex: 1
    },
    backgroundBlurTop: {
        //backgroundColor: theme.background_color_blur,
        width: "100%",
        height: "32.5%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: 'red'
    },
    backgroundBlurBottom: {
        //backgroundColor: theme.background_color_blur,
        width: "100%",
        height: "32.5%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: 'red'
    },
    option: {
        flex: 1,
        borderRadius: 30,
        padding: 5,
        backgroundColor: theme.background_color_blur,
    },
    message: {
        position: "absolute",
        top: "25%",
        left: "20%",
        width: "60%",
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        zIndex: 2,
        maxWidth: "60%"
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
        right: "7.5%",
        //top: "50%",
        backgroundColor: 'red',
        zIndex: 99
    },
    actions__item: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        backgroundColor: theme.background_color_secondary,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border,
        height: size("5%"),
        width: size("5%"),
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions__item__last: {
        marginBottom: 0
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
        zIndex: 1
    },
})
