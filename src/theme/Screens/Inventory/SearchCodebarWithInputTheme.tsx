import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../../appTheme";

export const SearchCodebarWithInputStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({
    SearchCodebarWithInput: {},
    SearchCodebarWithInput_title: {
        marginBottom: 10,
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    },
    SearchCodebarWithInput_input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        color: "black",
        marginBottom: 10
    },
    SearchCodebarWithInput_button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        display: "flex",
        alignItems: "center"
    },
    SearchCodebarWithInput_button_text: {
        color: "white"
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: globalStyles().globalPadding.padding * 1.75,
    },
    option: {
        backgroundColor: theme.background_color_tertiary,
        paddingVertical: globalStyles().globalPadding.padding / 2,
        paddingHorizontal: 10,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border_dark,
        marginRight: globalStyles().globalMarginBottomSmall.marginBottom
    },
    optionText: {
        fontSize: globalFont(size).font_normal,
        color: typeTheme === 'light' ? theme.text_color : theme.text_color,
        fontFamily: 'Rubik-Regular'
    },
    optionTextActive: {
        fontSize: globalFont(size).font_normal,
        color: typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
        fontFamily: 'Rubik-Regular'
    },
    optionActive: {
        backgroundColor: theme.color_tertiary,
        borderColor: theme.color_border_dark
    }
});
