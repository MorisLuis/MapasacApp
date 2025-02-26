import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// themeTypes.ts
export interface Theme {
    primary?: string;
    color_primary: string;
    color_secondary: string;
    color_tertiary: string;
    color_cuaternary: string;
    color_white: string;
    color_red: string;
    color_blue: string;
    color_green: string;
    color_gray: string;
    color_yellow: string;
    color_purple: string;
    color_black: string;
    color_red_light: string;
    color_border: string;
    color_border_secondary: string;
    color_border_dark: string;
    text_color: string;
    text_color_light: string;
    text_color_secondary: string;
    background_color: string;
    background_color_secondary: string;
    background_color_tertiary: string;
    background_color_blur: string;
    color_tertiary_opacity: string;
}


export const lightTheme = {
    //primary: '#5856D6',
    color_primary: "#001E2B",
    color_secondary: "#00684A",
    color_tertiary: "#00ED64",
    color_cuaternary: "#F9FAFA",
    color_red: "#D85A5B",
    color_white: "white",
    color_blue: "#415BB8",
    color_green: "#58B754",
    color_gray: "gray",
    color_yellow: "#EDBD42",
    color_purple: '#9592F7',
    color_black: "black",
    color_red_light: "#ff000056",

    color_border: "#6f7b94",
    color_border_secondary: "#cacaca",
    color_border_dark: "#26282C",

    text_color: "#1d2a36", // black
    text_color_light: "#8e9dab",
    text_color_secondary: "#f9f9f9", // white
    background_color: "#f1f1f1",
    background_color_secondary: "#eaeaea",
    background_color_tertiary: "#e4e4e4",
    background_color_blur: "rgba(0, 0, 0, 0.2)",
    color_tertiary_opacity: "rgba(0, 237, 97, 0.2)"
};


export const darkTheme = {
    //primary: '0D0F14',
    color_primary: "#f1f1f1",
    color_secondary: "#00684A",
    color_tertiary: "#00ED64",
    color_cuaternary: "#444444",
    color_red: "#D85A5B",
    color_white: "white",
    color_blue: "#415BB8",
    color_green: "#58B754",
    color_gray: "#3a3a3a",
    color_yellow: "#EDBD42",
    color_purple: '#9592F7',
    color_black: "black",
    color_red_light: "#ff000056",
    color_border: "#f1f1f1",
    color_border_secondary: "#d6d6d6",
    color_border_dark: "#46484B",
    text_color: "#f9f9f9",
    text_color_light: "#657482",
    text_color_secondary: "#1d2a36",
    background_color: "#111111",
    background_color_secondary: "#222222",
    background_color_tertiary: "#26282C",
    background_color_blur: "rgba(0, 0, 0, 0.2)",
    color_tertiary_opacity: "rgba(0, 237, 97, 0.2)"
};




export const globalStyles = (theme?: Theme) => StyleSheet.create({
    globalPadding: {
        padding: wp("5%")
    },
    globalMarginBottom: {
        marginBottom:  hp("2.5%")
    },
    globalMarginBottomSmall: {
        marginBottom:  hp("1.75%")
    },
    blur: {
        backgroundColor: " rgba(255, 255, 255, 0.2)"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "white",
    },
    disabled: {
        opacity: 50
    },
    borderRadius: {
        borderRadius: hp("1%"),
    },
    borderRadiusStandard: {
        borderRadius: 15
    }

});

export const globalFont = {
    //Font-size
    font_big: hp("4%"),
    font_med: hp("2.5%"),
    font_normal:  hp("1.75%"),
    font_sm: hp("1.5%"),
};
