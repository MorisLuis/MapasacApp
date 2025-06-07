import { StyleSheet } from "react-native";

import { Theme, globalStyles } from "./appTheme";


export const SessionExpiredStyles = ({ theme, size }: { theme: Theme, size: (_value: string) => number }) => StyleSheet.create({

    SessionExpiredScreen: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        height: "100%"
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
    },
    back: {
        width: "50%"
    }
})