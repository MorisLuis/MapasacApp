import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SellsDataScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsDataScreen: {
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color
    },
    SellsDataScreen_content: {
        flexGrow: 1, 
        paddingBottom: hp("20%")
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        height:'auto'
    },
    header_tag: {
        marginBottom: globalFont.font_sm / 2 
    },
    title: {
        fontSize: globalFont.font_big,
        fontFamily: 'Rubik-Bold',
        lineHeight: globalFont.font_big,
        marginRight: globalStyles().globalMarginBottom.marginBottom / 2


    },
    title_tag: {
        marginBottom: globalFont.font_sm / 2
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        padding: globalStyles().globalPadding.padding
    },
    image: {
        borderWidth: 3,
        borderRadius: globalStyles().borderRadius.borderRadius * 2,
        borderColor: theme.background_color_secondary,
        resizeMode: "cover",
        display: "flex",
        width: wp("50%"),
        height: hp("20%"),
        minHeight: 140,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2,
    },
    notImage: {
        borderWidth: 2,
        borderRadius: globalStyles().borderRadius.borderRadius * 2,
        borderColor: theme.background_color_secondary,
        display: "flex",
        width: wp("50%"),
        height: hp("20%"),
        minHeight: 140,
        backgroundColor: theme.background_color_tertiary
    },
    inputContainer: {
        width: '100%',
        borderRadius: globalStyles().borderRadius.borderRadius,
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: globalStyles().globalPadding.padding / 1.5,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_tertiary,
    },
    inputContainer_left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 5
    },
    inputContainer_right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6
    },
    label: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontFamily: 'SourceSans3-Regular'
    },
    labelValue: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        maxWidth: "55%"
    },
})