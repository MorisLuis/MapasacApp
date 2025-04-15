import { StyleSheet } from "react-native";

import { Theme, globalStyles } from "../../appTheme";


export const PrivacyScreenStyles = (theme: Theme) => StyleSheet.create({
    PrivacyScreen: {
        backgroundColor: theme.background_color, 
        flex: 1
    },
    PrivacyScreen_content: {
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        height: '100%'
    },
    paragraph: {
        color: theme.text_color,
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    subtitle: {
        color: theme.text_color,
        fontWeight: "bold",
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    }
})