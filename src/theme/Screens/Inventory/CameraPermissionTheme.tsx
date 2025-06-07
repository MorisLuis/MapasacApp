import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";


export const CameraPermissionStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    CameraPermission: {
        flex: 1,
        backgroundColor: theme.color_black,
        justifyContent: 'center',
        alignItems: "center"
    },
    messageContent: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    messageText: {
        color: theme.text_color_secondary,
        fontSize: globalFont(size).font_normal
    },
    authButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});
