import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "./appTheme";

export const LoginScreenStyles = (theme: Theme, size: (_value: string) => number) => StyleSheet.create({
    LoginScreen: {
        flex: 1,
        backgroundColor: theme.background_color,
        padding: globalStyles().globalPadding.padding
    },
    LoginDBScreen: {
        flex: 1,
        backgroundColor: theme.background_color_secondary,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        minHeight: size("10%"),
        maxHeight: size("20%"),
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    },
    logo: {
        objectFit: "scale-down",
        height: "100%"
    },
    logoHorizontal: {
        maxWidth: size("60%"),
        objectFit: "cover",
        height: "100%"
    },
    logoActived: {
        maxWidth: size("100%"),
        objectFit: "contain",
        height: size("15%")
    },
    title: {
        color: theme.text_color,
        fontSize: globalFont(size).font_big,
        fontWeight: 'bold',
        lineHeight: globalFont(size).font_big,
        width: "90%",
        fontFamily: 'Rubik-Bold'
    },
    textLogin: {
        fontSize: globalFont(size).font_normal,
        marginBottom: globalStyles().globalMarginBottom.marginBottom, 
        color: theme.text_color   
    },
    titleDB: {
        color: theme.text_color,
        fontSize: globalFont(size).font_med,
        fontWeight: 'bold',
        marginTop:  globalStyles().globalMarginBottom.marginBottom,
        textTransform: "uppercase",
        width: size("80%")
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: globalStyles().globalMarginBottom.marginBottom
    },
    buttonContainerDB: {
        alignItems: 'center',
        marginTop:  globalStyles().globalMarginBottom.marginBottom
    },
    footer: {
        paddingHorizontal: globalStyles().globalPadding.padding,
        paddingVertical: globalStyles().globalPadding.padding,
        display: "flex",
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: "center"
    },
    footerText: {
        marginRight: 5,
        fontSize: globalFont(size).font_sm,
        color: theme.text_color
    },
    formContainer_input:{
        borderWidth: 0, 
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom
    }
});