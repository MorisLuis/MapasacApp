import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";

export const inputStyles = ({ theme, typeTheme, size }: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({
    input: {
        minHeight: 50,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
        borderRadius: globalStyles().borderRadius.borderRadius,
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        backgroundColor: theme.background_color_secondary,
        gap: 10,
        color: theme.text_color,
        fontSize: globalFont(size).font_normal
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
        borderWidth: 0,
        paddingHorizontal: globalStyles().globalPadding.padding / 2
    },
    passwordToggle: {
        padding: 10,
        position: 'absolute',
        right: 0
    },

    searchBar: {
        borderRadius: globalStyles().borderRadius.borderRadius / 2,
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        borderWidth: 0.2,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_secondary,
    },
});


export const selectStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({
    input: {
        minHeight: 50,
        fontSize: globalFont(size).font_normal,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
        borderRadius: globalStyles().borderRadius.borderRadius,
        paddingHorizontal: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color,
        color: theme.text_color,

        paddingVertical: globalStyles().globalPadding.padding,
        paddingRight: globalStyles().globalPadding.padding,
    }
});


export const toggleStyles = ({
    theme,
    typeTheme,
    isEnabled,
    size
}: { theme: Theme, typeTheme: string, isEnabled?: boolean, size: (_value: string) => number }) => StyleSheet.create({
    Toggle: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    togglelabel: {
        fontSize: globalFont(size).font_normal,
        fontWeight: "bold",
        color: theme.text_color
    },
    togglemessage: {
        fontSize: globalFont(size).font_sm,
        color: theme.text_color
    },

    toggleContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center'
    },


    toggleContainer_icon: {
        position: 'absolute',
        zIndex: 2,
        left: isEnabled ? "52.5%" : "12.5%"
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

export const textInputContainerStyles = (theme: Theme, height: number, size: (_value: string) => number) => StyleSheet.create({
    input: {
        height: height,
        backgroundColor: theme.background_color_secondary,
        paddingHorizontal: globalStyles().globalPadding.padding,
        borderWidth: 0.2,
        borderColor: theme.color_border,
        borderRadius: globalStyles().borderRadius.borderRadius / 2,
        color: theme.text_color,
        minHeight: size("5%")
    },
    label: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    }
})
