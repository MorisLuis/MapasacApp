import { StyleSheet } from "react-native";

import { Theme, globalStyles } from "../appTheme";


export const ModalScreenStyles = (theme?: Theme) => StyleSheet.create({

    ModalScreen: {
        flex: 1,
        justifyContent: "flex-start",
        height: '100%',
        zIndex: 999
    },
    ModalScreenContainer: {
        backgroundColor: theme?.background_color,
        borderTopRightRadius: 10,
        borderTopStartRadius: 10,
        paddingHorizontal: globalStyles().globalPadding.padding,
        paddingVertical: globalStyles().globalPadding.padding / 2,
        borderBottomWidth: 0.2,
        borderBottomColor: theme?.color_border
    },
    Modal_close: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end"
    },
    Modal_children:{
        height: "100%",
        padding: globalStyles().globalPadding.padding
    }

})