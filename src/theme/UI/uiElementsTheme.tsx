import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from "../appTheme";


export const uiElementeStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    tagContainer: {
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        minHeight: 24
    },
    tagText: {
        fontSize: globalFont.font_normal
    },
    green: {
        backgroundColor: typeTheme === 'light' ? theme.color_green + '30' : theme.color_tertiary + '13',
        borderWidth: 0.5,
        borderColor: theme.color_green,
        color: typeTheme === 'light' ? theme.color_green : theme.color_tertiary,
    },

    purple: {
        backgroundColor: typeTheme === 'light' ? theme.color_purple + '30' : theme.color_tertiary + '13',
        borderWidth: 0.5,
        borderColor: theme.color_purple,
        color: typeTheme === 'light' ? theme.color_purple : theme.color_tertiary,
    }

});

export const uiImageCustumContainerStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    imageContainer: {
        height: 300,
        width: "100%",
        display: 'flex',
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_tertiary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        borderRadius: globalStyles().borderRadius.borderRadius,
        backgroundColor: theme.background_color_secondary
    },
    imageBackground: {
        maxHeight: 180,
        width: hp("20%"),
        borderRadius: globalStyles().borderRadius.borderRadius,
        backgroundColor: theme.background_color,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 15,
    },
    image: {
        position: 'absolute',
        height: '100%',
        width: "100%",
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 0.2,
        borderColor: theme.color_border
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
        borderRadius: globalStyles().borderRadius.borderRadius,
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
        borderRadius: globalStyles().borderRadius.borderRadius,
        transform: [{ rotate: '-25deg' }],
        position: "absolute",
        zIndex: 1
    },
    notImageText: {
        fontSize: globalFont.font_med,
        textAlign: "center",
        lineHeight: globalFont.font_med,
        overflow: 'hidden',
        paddingHorizontal: globalStyles().globalPadding.padding
    },

});

export const uiNavigationStyles = (theme: Theme ) => StyleSheet.create({

    FooterScreen: {
        backgroundColor: theme.background_color,
        position: 'absolute',
        bottom: 0,
        right: globalStyles().globalPadding.padding,
        width: wp("100%") - globalStyles().globalPadding.padding * 2,
        height: hp("20%"),
        borderTopWidth: 1,
        borderColor: theme.color_border_secondary
    },
    FooterScreenContainer: {
        marginVertical: globalStyles().globalMarginBottomSmall.marginBottom
    },
    FooterTwoButtonsScreen: {
        backgroundColor: theme.background_color,
        position: 'absolute',
        flex: 1,
        width: wp("100%") - globalStyles().globalPadding.padding * 2,
        right: globalStyles().globalPadding.padding,
        bottom: 0,
        borderEndWidth: 0,
        display: 'flex',
        alignItems: 'flex-end',
        
        borderTopWidth: 1,
        borderColor: theme.color_border_secondary
    },
    FooterTwoButtonsScreenContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginVertical: globalStyles().globalMarginBottomSmall.marginBottom
    },
    tabletLayout: {

    },
    landscape: {
        width: "100%"
    }
});