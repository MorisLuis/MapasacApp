import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../../appTheme";


export const PrivacyScreenStyles = (theme: Theme) => StyleSheet.create({
    PrivacyScreen: {
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
        height: '100%'
    },
    paragraph: {
        color: theme.text_color,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    subtitle: {
        color: theme.text_color,
        fontWeight: "bold",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    }
})