import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import { heightPercentageToDP } from "react-native-responsive-screen";

export const uiElementeStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({

    tagContainer: {
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        minHeight: 24
    },
    tagText: {
        fontSize: globalFont(size).font_normal
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

export const uiImageCustumContainerStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => {

    return StyleSheet.create({
        imageContainer: {
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
            width: size("20%"),
            borderRadius: globalStyles().borderRadius.borderRadius,
            backgroundColor: theme.color_blue,
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
            height: size("20%"),
            width: size("20%"),
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
            height: size("20%"),
            width: size("20%"),
            borderRadius: globalStyles().borderRadius.borderRadius,
            transform: [{ rotate: '-25deg' }],
            position: "absolute",
            zIndex: 1
        },
        notImageText: {
            fontSize: globalFont(size).font_med,
            textAlign: "center",
            lineHeight: globalFont(size).font_med,
            overflow: 'hidden',
            paddingHorizontal: globalStyles().globalPadding.padding
        }
    })
}

export const uiNavigationStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({

    FooterScreen: {
        position: 'absolute',
        bottom: 0,
        left: size("2.5%"),

        width: "100%",
        minHeight: heightPercentageToDP("10%"),

        backgroundColor: theme.background_color,
        borderTopWidth: 1,
        borderColor: theme.color_border_secondary
    },
    FooterScreenContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: globalStyles().globalMarginBottomSmall.marginBottom,
    },

    FooterTwoButtonsScreen: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: globalStyles().globalPadding.padding,

        width: "100%",
        display: 'flex',
        alignItems: 'flex-end',

        backgroundColor: theme.background_color,
        borderTopWidth: 1,
        borderColor: theme.color_border_secondary,
        borderEndWidth: 0,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    },
    FooterTwoButtonsScreenContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: globalStyles().globalMarginBottomSmall.marginBottom,
        gap: globalStyles().gap.gap
    },
    tabletLayout: {
        height: size("10%")
    },
    landscape: {
        width: "100%",
        maxHeight: heightPercentageToDP("25%"),
        paddingVertical: 0,
        marginVertical: 0
    }
});