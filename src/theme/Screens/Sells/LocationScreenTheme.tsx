import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../../appTheme";

export const LocationScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    LocationScreenContent:{
        backgroundColor: theme.background_color_secondary,
        padding: globalStyles().globalPadding.padding,
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 0.2,
        marginVertical: globalStyles().globalMarginBottom.marginBottom / 2,
        borderColor: theme.color_border,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})