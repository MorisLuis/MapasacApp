import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";
import { heightPercentageToDP } from "react-native-responsive-screen";


export const CameraModalStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    cameraScreen: {
        paddingHorizontal: globalStyles().globalPadding.padding,
        flex: 1,
        width: '100%'
    },
    content: {
        display: "flex",
        flexDirection: "row",
        height: heightPercentageToDP("50%"),
        width: "100%",
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        borderRadius: globalStyles().borderRadius.borderRadius,
        overflow: "hidden",
        backgroundColor: 'orange'
    },
    camera: {
        width: "100%"
    },
    header: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    header_title: {
        fontSize: globalFont(size).font_med,
        fontFamily: 'Rubik-Bold'
    },
    header_message: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    },
    header_message_scanner: {
        fontSize: globalFont(size).font_sm,
        color: theme.text_color
    },
    codebarFound: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textcodebarFound: {
        fontWeight: 'bold',
        fontSize: globalFont(size).font_med,
        color: theme.text_color
    },
    warningMessage: {
        paddingBottom: globalStyles().globalPadding.padding,
        fontSize: globalFont(size).font_normal,
        color: theme.color_red
    }
});
