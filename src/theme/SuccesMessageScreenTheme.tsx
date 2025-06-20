import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";


export const SuccesMessageScreenStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size:(_value: string) => number }) => StyleSheet.create({
    SuccesMessage: {
        height: '100%',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        position: 'relative',
        paddingBottom: globalStyles().globalPadding.padding
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center'
    },
    contentBackground: {
        maxHeight: 180,
        borderRadius: globalStyles().borderRadius.borderRadius,
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
        fontSize: globalFont(size).font_med,
        width: "80%",
        color: typeTheme === 'light' ? theme.text_color : theme.text_color,
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
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
        padding: size("2%"),
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginBottom: globalStyles().globalMarginBottom.marginBottom * 2,
        width: "100%"
    },
    dataContainerInterior: {
        backgroundColor: theme.background_color_secondary,
        padding: size("2%"),
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius / 2,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 15
    },
    dataHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    dataTitle: {
        fontSize: globalFont(size).font_normal,
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
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    },
    confirmationText: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color,
        fontWeight: 'bold'
    }
})