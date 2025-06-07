import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";


export const LoaderStyles = (theme: Theme, typeTheme: string, size: (_value: string) => number) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        marginTop: 10,
        width: globalFont(size).font_sm / 2,
        height: globalFont(size).font_sm / 2,
        borderRadius: 5,
        backgroundColor: typeTheme === 'light' ? theme.color_primary : theme.background_color_tertiary,
        marginHorizontal: globalStyles().globalMarginBottom.marginBottom / 4,
    },
})