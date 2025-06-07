import { StyleSheet } from "react-native";

import { Theme, globalStyles } from "./appTheme";


export const LoadingScreenStyles = (theme: Theme, size: (_value: string) => number ) => StyleSheet.create({

    LoadingScreen: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.background_color,
        height: "100%",
        paddingVertical: globalStyles().globalPadding.padding * 4
    },
    LoadingMessage: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    logo: {
        width: size("40%"),
        height: size("40%"),
    }
})