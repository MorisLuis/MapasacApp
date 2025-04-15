import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Theme, globalStyles } from "./appTheme";


export const SessionExpiredStyles = (theme: Theme) => StyleSheet.create({

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
        width: wp("40%"),
        height: wp("40%"),
    },
    back: {
        width: "50%" 
    }
})