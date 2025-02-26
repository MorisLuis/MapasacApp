import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";


export const CameraPermissionStyles = (theme: Theme ) =>  StyleSheet.create({
    CameraPermission: {
        flex: 1,
        backgroundColor: theme.color_black,
        justifyContent: 'center',
        alignItems: "center"
    },
    messageContent: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    messageText: {
        color: theme.text_color_secondary,
        fontSize: globalFont.font_normal
    },
    authButton: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        textAlign: 'center'
    }
});
