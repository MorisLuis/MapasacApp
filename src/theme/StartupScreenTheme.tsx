import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "./appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const StartupScreenTheme = (theme: Theme) =>  StyleSheet.create({
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
        minHeight: hp("10%"),
        maxHeight: hp("20%"),
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
    },
    logo: {
        objectFit: "scale-down",
        height: "100%"
    },
})