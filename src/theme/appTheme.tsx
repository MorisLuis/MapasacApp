import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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




export const globalStyles = () => {
    const { width, height } = Dimensions.get('window');
    const isPortrait = height >= width;
    const size = isPortrait ? hp : wp;

    return StyleSheet.create({
        flex: {
            flex: 1
        },
        opacity: {
            opacity: 0.5
        },
        globalPadding: {
            padding: hp("2.5%"),
        },
        globalMarginBottom: {
            marginBottom: hp("2.5%")
        },
        globalMarginBottomSmall: {
            marginBottom: hp("1.75%")
        },
        blur: {
            backgroundColor: "rgba(255, 255, 255, 0.2)"
        },
        divider: {
            width: "100%",
            height: 1,
            backgroundColor: "white",
        },
        disabled: {
            opacity: 0.5 // ← este lo tenías como 50 (lo cual es inválido en React Native)
        },
        borderRadius: {
            borderRadius: size("1%")
        },
        borderRadiusStandard: {
            borderRadius: 15
        },
        ItemSeparator: {
            height: 15
        },
        display_none: {
            display: 'none'
        },
        gap: {
            gap: 10
        }
    });
};



export const globalFont = (
    size?: (_value: string) => number
) => {
    return {
        font_big: size?.('4%') ?? 16,
        font_med: size?.('2.5%') ?? 14,
        font_normal: size?.('1.75%') ?? 12,
        font_sm: size?.('1.5%') ?? 10,
    };
};
