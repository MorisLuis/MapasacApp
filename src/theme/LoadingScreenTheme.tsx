import { StyleSheet } from "react-native";
import { Theme } from "./appTheme";



export const LoadingScreenStyles = (theme: Theme, size: (_value: string) => number ) => StyleSheet.create({

    LoadingScreen: {
        flex: 1,
        display: 'flex',
        justifyContent:'center',
        alignContent: 'center',
        height: "100%",
        backgroundColor: theme.background_color
    },
    LoadingScreen__container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center'
    },
    LoadingMessage: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logo: {
        width: size("25%"),
        height: size("25%"),
    }
})