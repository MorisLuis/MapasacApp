import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";

export const inputStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    input: {
        minHeight: 50,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,
        backgroundColor: theme.background_color_secondary,
        gap: 10,
        color: theme.text_color
    },

    inputicon: {
        marginLeft: 20
    },

    focusedInput: {
        borderWidth: 1,
        borderColor: 'transparent'
    },

    //Input password
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: theme.text_color,
    },
    passwordInput: {
        flex: 1,
    },
    passwordToggle: {
        padding: 10,
        position: 'absolute',
        right: 0
    },

    searchBar: {
        borderRadius: globalStyles(theme).borderRadius.borderRadius/2,
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        borderWidth: 0.2,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_secondary,
    },
});


export const selectStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    input: {
        minHeight: 50,
        fontSize: globalFont.font_normal,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
        color: theme.text_color,

        paddingVertical: globalStyles(theme).globalPadding.padding,
        paddingRight: globalStyles(theme).globalPadding.padding,
    }
});


export const toggleStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    Toggle: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    toggleText: {

    },
    togglelabel: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold",
        color: theme.text_color
    },
    togglemessage: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },

    //Switch styles
    SwitchTrackColorTrue: {
        backgroundColor: typeTheme === 'light' ? theme.color_green : theme.color_white
    },
    SwitchTrackColorFalse: {
        backgroundColor: typeTheme === 'light' ? theme.color_gray : theme.color_gray
    },
    SwitchThumbColorAndroidEnabled: {
        backgroundColor: typeTheme === 'light' ? theme.color_white : theme.color_green
    },
    SwitchThumbColorAndroidNotEnabled: {
        backgroundColor: typeTheme === 'light' ? theme.background_color_tertiary : theme.background_color_tertiary
    },
    SwitchThumbColorIOSdEnabled: {
        backgroundColor: typeTheme === 'light' ? theme.color_white : theme.color_green
    },
    SwitchThumbColorIOSdNotEnabled: {
        backgroundColor: typeTheme === 'light' ? theme.background_color_tertiary : theme.background_color_tertiary
    },
})

