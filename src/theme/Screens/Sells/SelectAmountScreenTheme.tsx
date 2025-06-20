import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SelectAmountScreenTheme = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    SelectAmountScreen: {
        height: '100%',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        flex: 1
    },
    header: {
    },
    headerTitle: {
        fontSize: globalFont(size).font_med,
        textAlign: "center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    },
    amountContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    amountContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },

    amountNumber: {
        fontSize: globalFont(size).font_big,
        color: theme.text_color
    }
})