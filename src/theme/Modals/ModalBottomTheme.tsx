import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../appTheme";
import { heightPercentageToDP } from "react-native-responsive-screen";


export const ModalBottomStyles = (theme?: Theme, typeTheme?: string) => StyleSheet.create({
    ModalBottom: {
        flex: 1,
        display: 'flex',
        height: "100%",
        zIndex: 9999999
    },
    ModalBottom__content: {
        display: 'flex',
        height: "100%",
        justifyContent: 'flex-end',
        padding: 10
    },
    modalContent: {
        backgroundColor: theme?.background_color,
        shadowColor: theme?.background_color_tertiary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme?.color_border
    },
    modalContentStatic: {
        maxHeight: heightPercentageToDP("80%"),
    },
    modalChildren: {
        padding: globalStyles().globalPadding.padding,
        paddingTop: 10
    },
    header: {
        width: "100%",
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "flex-end",
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: typeTheme === 'light' ? theme?.color_border : theme?.color_border_dark,
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    menuModal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    menuModalOption: {
        display: 'flex',
        flexShrink: 1,
        width: 'auto',
        padding:  globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        paddingHorizontal: globalStyles().globalPadding.padding,
        minHeight: 40,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme?.color_border
    }
});
