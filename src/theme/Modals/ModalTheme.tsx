import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../appTheme";


export const ModalScreenStyles = (theme?: Theme, typeTheme?: string) => StyleSheet.create({

    ModalScreen: {
        flex: 0.5,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '50%',
        width: '100%',
        margin: 0,
        padding: 0
    },
    ModalScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalScreenContent: {
        width: '100%', // Ancho del modal
        //backgroundColor: "white",
        borderRadius: 10,
        //padding: 20,
        
    },
        header: {
        width: "100%",
        top: 0,
        right: 0,
        /* paddingVertical: 10,
        paddingHorizontal: 20, */
        display: "flex",
        alignItems: "flex-end",
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: typeTheme === 'light' ? theme?.color_border : theme?.color_border_dark,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },

})