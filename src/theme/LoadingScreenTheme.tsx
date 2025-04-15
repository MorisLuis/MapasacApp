import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Theme, globalStyles } from "./appTheme";


export const LoadingScreenStyles = (theme: Theme) => StyleSheet.create({

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
        width: wp("40%"),
        height: wp("40%"),
    }
})