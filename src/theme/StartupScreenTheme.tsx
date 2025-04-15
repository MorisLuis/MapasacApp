import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Theme, globalStyles } from "./appTheme";


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
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    },
    logo: {
        objectFit: "scale-down",
        height: "100%"
    },
})