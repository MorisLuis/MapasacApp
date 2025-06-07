import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "./appTheme";


export const StartupScreenTheme = (theme: Theme, size: (_value: string) => number ) =>  StyleSheet.create({
    StartupScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background_color,
        height: "100%"
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        minHeight: size("10%"),
        maxHeight: size("20%"),
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    },
    logo: {
        objectFit: "scale-down",
        height: "100%"
    },
})