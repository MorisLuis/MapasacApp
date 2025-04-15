
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from "../../appTheme";

export const customTabBarStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    customTabBar: {
        paddingVertical: globalStyles().globalPadding.padding
    },
    customTabBarAbsolute: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        paddingVertical: globalStyles().globalPadding.padding
    },
    content: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: globalStyles().globalPadding.padding,
        justifyContent: "space-between"
    },
    content_left: {
        display: "flex",
        flexDirection: "row"
    },
    content_right: {
        display: "flex",
        flexDirection: "row"
    },

    buttonBack: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: hp("5%"),
        width: hp("5%"),
        maxHeight: 32,
        marginRight: wp("2%"),
        borderWidth: 1,
        borderColor: theme.color_border_dark,
        backgroundColor: theme.background_color
    },

    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginRight: wp("2%"),
        borderWidth: 0.7,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_black,
        overflow: "hidden"
    },
    blurContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    
    sectionTitle: {
        fontSize: globalFont.font_normal,
        paddingHorizontal: wp("2%")
    },


    buttonBag: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: hp("5%"),
        width: hp("5%"),
        maxHeight: 32,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_secondary,
        backgroundColor: theme.background_color
    },
    bag: {
        backgroundColor: theme.color_tertiary,
        height: hp("5%"),
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: globalStyles().globalPadding.padding
    },
    bagCounter: {
        position: "absolute",
        width: hp("3%"),
        height: hp("3%"),
        top: - globalStyles().globalPadding.padding / 2,
        right: - globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius * 2,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_dark,
        justifyContent: "center",
        alignItems: "center"
    },
    sectionBag: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    }
});

