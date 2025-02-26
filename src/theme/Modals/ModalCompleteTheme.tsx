import { StyleSheet } from "react-native";
import { Theme } from "../appTheme";

export const ModalCompleteStyles = (theme: Theme) => StyleSheet.create({
    modalComplete: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: theme.background_color
    },
    modalContent: {
        backgroundColor: theme.background_color,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "90%"
    },
    modalChildren: {
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    header: {
        width: "100%",
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: 'row-reverse',
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: theme.color_border,
    },
    title: {
        fontWeight: 'bold'
    }
});
