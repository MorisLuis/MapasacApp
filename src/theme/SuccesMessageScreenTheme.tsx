import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const SuccesMessageScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SuccesMessage: {
        display: "flex",
        alignItems: 'center',
        height: "100%",
        width: "100%",
        paddingVertical: 100
    },
    content: {
        width: "80%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBackground: {
        maxHeight: 180,
        width: hp("20%"),
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        backgroundColor: theme.background_color,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 15,
    },
    headerText: {
        textAlign: 'center',
        fontSize: globalFont.font_med,
        width: "80%",
        color: typeTheme === 'light' ? theme.text_color : theme.text_color,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        fontFamily: 'Rubik-Bold'
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        padding: 10,
        borderRadius: globalStyles().borderRadius.borderRadius * 2,
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    dataContainer: {
        padding: globalStyles().globalPadding.padding / 4,
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2,
        width: "100%"
    },
    dataContainerInterior: {
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles().globalPadding.padding,
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius / 2,
        //backgroundColor: theme.background_color,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 15,
    },
    dataHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    dataTitle: {
        fontSize: globalFont.font_normal,
        fontFamily: 'Rubik-Bold'
    },
    dataDivider: {
        height: 0.2,
        backgroundColor: theme.color_border,
        width: "100%",
        marginVertical: 10
    },
    confirmationItem: {
        display: "flex",
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between'
    },
    confirmationItemLabel: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    confirmationText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontWeight: 'bold'
    }
})