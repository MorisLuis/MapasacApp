import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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