import { Dimensions, StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "../../appTheme";
const { height } = Dimensions.get('window');


export const ScannerResultStyles = ({

    theme,
    typeTheme,
    size
}: {theme: Theme, typeTheme?: string, size: (_value: string) => number}) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        height: height / 3,
        backgroundColor: theme.background_color
    },
    ScannerResult: {
        paddingBottom: globalStyles().globalMarginBottom.marginBottom,
        backgroundColor: theme.background_color
    },
    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: globalStyles().globalMarginBottom.marginBottom,

    },

    code: {
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center"
    },
    codeLabel: {
        fontSize: globalFont(size).font_normal,
        marginRight: globalStyles().globalMarginBottomSmall.marginBottom,
        color: theme.text_color
    },
    codeValue: {
        fontSize: globalFont(size).font_med,
        fontWeight: "bold",
        color: theme.text_color
    },
    otherInfo: {
        display: "flex",
        flexDirection: 'row',
        gap: 10,
        alignItems: "center"
    },
    codebarNotAvailable: {
        backgroundColor: typeTheme === 'light' ?  theme.color_secondary + '30' : theme.color_tertiary + '13',
        padding: globalStyles().globalPadding.padding / 3,
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius
    },
    textNotAvailable: {
        color:  typeTheme === 'light' ? theme.color_secondary : theme.color_tertiary,
        fontSize: globalFont(size).font_normal
    },
    productIcon: {
        width: 50,
        height: 50,
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: globalStyles().globalMarginBottom.marginBottom
    },
    productNotFound: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: globalStyles().globalMarginBottom.marginBottom
    },
    productNotFoundText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        width: "50%"
    },
    productNotFoundMessage: {
        marginLeft: 10
    },
    productNotFoundTitle: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: globalStyles().globalMarginBottom.marginBottom
    },
    seeProduct: {
        fontSize: globalFont(size).font_normal,
    },
    counterContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    },
    counterContainer_left:{
        width: "40%"
    },
    counterContainer_right: {
        width: "55%"
    }
});