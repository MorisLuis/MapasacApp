import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";


export const CameraModalStyles = (theme: Theme ) =>  StyleSheet.create({
    cameraScreen: {},
    content: {
        display: "flex",
        flexDirection: "row",
        height: 200,
        width: "100%",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        borderRadius: 10,
        overflow: "hidden"
    },
    camera: {
        width: "100%"
    },
    header: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    header_title: {
        fontSize: globalFont.font_med,
        fontFamily: 'Rubik-Bold'
    },
    header_message: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    header_message_scanner: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    codebarFound: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textcodebarFound: {
        fontWeight: 'bold',
        fontSize: globalFont.font_med,
        color: theme.text_color
    },
    warningMessage: {
        paddingBottom: globalStyles(theme).globalPadding.padding,
        fontSize: globalFont.font_normal,
        color: theme.color_red
    }
});
