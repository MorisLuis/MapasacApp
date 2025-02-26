import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ProductDetailsStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    ProductDetailsPage: {
        display: 'flex',
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
        paddingBottom: 100
    },
    imageContainer: {
        minHeight: 300,
        backgroundColor: theme.background_color_secondary,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_tertiary,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        borderRadius: globalStyles(theme).borderRadius.borderRadius
    },
    image: {
        position: 'absolute',
        height: hp("30%"),
        width: wp("50%"),
        resizeMode: 'contain',
        backgroundColor: theme.background_color_secondary,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius / 3
    },
    notImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: theme.background_color_secondary,
        borderWidth: 1,
        borderColor: theme.color_border_secondary,
        height: wp("20%"),
        width: wp("20%"),
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        transform: [{ rotate: '12.5deg' }],
        position: "relative",
        zIndex: 3
    },
    notImageBackground: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: theme.background_color_tertiary,
        borderWidth: 1,
        borderColor: theme.color_border_secondary,
        height: wp("20%"),
        width: wp("20%"),
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        transform: [{ rotate: '-25deg' }],
        position: "absolute",
        zIndex: 1
    },
    notImageText: {
        fontSize: globalFont.font_med,
        textAlign: "center",
        lineHeight: globalFont.font_med,
        overflow: 'hidden',
        paddingHorizontal: globalStyles(theme).globalPadding.padding
    },
    header: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },

    description: {
        fontSize: globalFont.font_med,
        fontWeight: "bold",
        color: theme.text_color,
        width: "90%",
        fontFamily: 'Rubik-Bold'
    },
    price: {
        fontWeight: "bold",
        color: theme.text_color
    },
    priceValue: {
        color: theme.text_color
    },
    informationContainer: {
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding / 2,
        borderWidth: 0.5,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_tertiary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius / 2
    },
    information: {
        padding: globalStyles(theme).globalPadding.padding / 3,
        backgroundColor: theme.background_color,
        borderWidth: 0.5,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_tertiary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2
    },
    codebarIdentify: {
        paddingBottom: globalStyles(theme).globalPadding.padding / 2
    },
    data: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: globalStyles(theme).globalPadding.padding / 4,
        position: "relative"
    },
    label: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal,
        marginRight: globalStyles(theme).globalMarginBottom.marginBottom / 2,
        color: theme.text_color
    },
    dataValue: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    separator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        //borderBottomColor: `${theme.color_border_secondary}${Math.round(0.25 * 255).toString(16)}`,
        backgroundColor: theme.color_border,
        borderBottomColor: theme.color_border_secondary
    },
    optionsContent: {

    },
    optionCodebar: {
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.background_color_tertiary,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
    },
    optionCodebar_icon: {
        marginRight: globalStyles(theme).globalMarginBottomSmall.marginBottom,
    },
    selectedOption: {
        backgroundColor: theme.background_color,
        borderWidth: 1,
        borderColor: theme.color_border,
        display: "flex"
    },

    manageEvents: {
        flex: 3,
        display: "flex",
        width: "100%",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2
    },
    manageEvents_content: {
        flex: 3,
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    manageEvents_title: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold",
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        color: theme.text_color
    },

    event: {
        flex: 1,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        padding: globalStyles(theme).globalPadding.padding / 2,
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: theme.background_color_secondary
    },
    event_icon: {
        //backgroundColor: theme.background_color_secondary,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        width: 34,
        height: 34,
    },
    event_text: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        textAlign: "center"
    },
    editContainer: {
        backgroundColor: theme.background_color_tertiary,
        padding: globalStyles(theme).globalPadding.padding / 1.5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",

        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
    },
    editContainer_text: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    editContainer_label: {
        color: theme.text_color_light
    },
    editContainer_left: {
        display: "flex",
        flexDirection: 'row',
        gap: 10,
        width: "35%"
    },
    editContainer_right: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-end',
        width: "65%"
    },
    footer: {
        bottom: 0,
        height: 100,
        width: "100%",
        backgroundColor: theme.background_color_secondary,
        borderTopWidth: 0.75,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
        padding: globalStyles(theme).globalPadding.padding,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
