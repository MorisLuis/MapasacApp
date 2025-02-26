import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const SessionExpiredStyles = (theme: Theme) => StyleSheet.create({

    SessionExpiredScreen: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
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
    }
})