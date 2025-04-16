import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from '../appTheme';
import { ThemeColor } from '../../context/ThemeContext';


export const productCardstyles = (theme: Theme, typeTheme?: ThemeColor) => StyleSheet.create({
    productCard: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        borderRadius: globalStyles().borderRadius.borderRadius,
        overflow: 'hidden'
    },
    productCard__data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: globalStyles().globalPadding.padding / 2
    },

    information: {
        width: "72.5%",
    },
    information__description: {
        fontWeight: "bold",
        fontSize: globalFont.font_med / 1.25,
        color: theme.text_color
    },
    information__deleteContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: globalStyles().globalPadding.padding / 2
    },
    delete: {
        color: theme.color_red,
        marginLeft: globalStyles().globalMarginBottomSmall.marginBottom / 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    quantity: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: "22.5%"
    },
    quantity_value: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    quantity_unity: {
        display: "flex",
        fontSize: globalFont.font_sm,
        width: "auto",
        color: theme.text_color
    },

    // ProductInfo
    ProductInfo: {
        display: "flex",
        flexDirection: "row"
    },
    ProductInfo__text: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        maxWidth: "80%"
    },
    ProductInfo__label: {
        fontWeight: "bold",
        marginRight: globalStyles().globalMarginBottomSmall.marginBottom / 2,
        fontSize: globalFont.font_normal,
        color: theme.text_color
    }
});

export const EmptyMessageCardStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    EmptyMessageCard: {
        backgroundColor: theme.background_color,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        width: "100%",
        padding: globalStyles().globalPadding.padding,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: globalFont.font_med,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
        color: theme.text_color
    },
    iconContainer: {
        backgroundColor: theme.background_color_secondary,
        borderWidth: 1,
        borderColor: theme.color_border,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: globalStyles().globalMarginBottom.marginBottom
    },
    icon: {
        textAlign: "center"
    },
    message: {
        color: theme.text_color
    }
})

export const MessageCardStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    MessageCard: {
        backgroundColor: theme.color_tertiary_opacity,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        width: "100%",
        padding: globalStyles().globalPadding.padding / 2,
        borderRadius: 10,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    text: {

    },
    title: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: globalStyles().globalMarginBottomSmall.marginBottom
    },
    icon: {
        textAlign: "center"
    },
    message: {
        color: theme.text_color
    }
})

export const ProductItemSearchStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    ProductItemSearch: {
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        paddingVertical: globalStyles().globalPadding.padding / 2,
        paddingHorizontal: globalStyles().globalPadding.padding / 2,

        borderRadius: globalStyles().borderRadius.borderRadius,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.background_color_secondary
    },
    ProductItemSearchSelected: {
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        paddingVertical: globalStyles().globalPadding.padding / 2,
        paddingHorizontal: globalStyles().globalPadding.padding / 2,

        borderRadius: globalStyles().borderRadius.borderRadius,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.color_tertiary
    },
    productInventoryCard__Image: {
        width: wp("17.5%"),
        minHeight: wp("17.5%"),
        marginRight: globalStyles().globalMarginBottom.marginBottom,
        borderRadius: globalStyles().borderRadius.borderRadius
    },
    information: {
        alignItems: 'flex-start'
    },
    description: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    otherInformation: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    otherInformationText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    codebarAvailable: {
        backgroundColor: typeTheme === 'light' ? theme.color_border_dark + '23' : theme.color_border_secondary + '23',
        padding: globalStyles().globalPadding.padding / 5,
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginVertical: globalStyles().globalMarginBottomSmall.marginBottom
    },
    textAvailable: {
        color: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_secondary,
        fontSize: globalFont.font_normal
    },
    codebarNotAvailable: {
        backgroundColor: theme.color_red + '13',
        padding: globalStyles().globalPadding.padding / 3,
        paddingHorizontal: globalStyles().globalPadding.padding / 2,
        borderRadius: globalStyles().borderRadius.borderRadius,
        marginVertical: globalStyles().globalMarginBottomSmall.marginBottom / 2
    },
    textNotAvailable: {
        color: theme.color_red,
        fontSize: globalFont.font_normal
    },
    notImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp("17.5%"),
        minHeight: wp("17.5%"),
        marginRight: globalStyles().globalMarginBottom.marginBottom,
        borderRadius: globalStyles().borderRadius.borderRadius,
        backgroundColor: theme.background_color_tertiary,
        borderWidth: 1,
        borderColor: theme.color_border
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal / 2,
        textAlign: "center",
        lineHeight: 8,
        maxHeight: 40,
        overflow: 'hidden',
        paddingHorizontal: 2
    },
})

// Estilos actualizados
export const ProductSellsCardTheme = (theme: Theme, typeTheme?: ThemeColor) =>
    StyleSheet.create({
        ProductSellsCardTheme: {
            flex: 0.5,
            display: "flex",
            position: 'relative'
        },
        item: {
            // Puedes agregar aquí un borderRadius si lo requieres
        },
        imageContainer: {
            padding: 5,
            borderWidth: 0.5,
            borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2,
            borderRadius: globalStyles().borderRadius.borderRadius, // Radio para el contenedor
            overflow: 'hidden', // Clipa el contenido según el borderRadius
            minHeight: 150
        },
        imageContainer_tablet: {
            minHeight: 200
        },
        imageContainer_landscape: {
            minHeight: 300
        },
        image: {
            flex: 1,
            width: "100%",
            minHeight: 120,
            borderRadius: globalStyles().borderRadius.borderRadius * 1.5,
            borderWidth: 0.5,
            borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        },
        // ... el resto de estilos se mantienen sin cambios
        notImage: {
            flex: 1,
            display: "flex",
            width: "100%",
            minHeight: 130,
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2,
            padding: 5,
            borderRadius: globalStyles().borderRadius.borderRadius * 2.5,
            borderWidth: 1,
            borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        notImageBackground: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            borderWidth: 1,
            borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
            height: wp("15%"),
            width: wp("15%"),
            borderRadius: globalStyles().borderRadius.borderRadius,
            transform: [{ rotate: '-25deg' }],
            position: "absolute",
            zIndex: 1
        },
        title: {
            fontSize: globalFont.font_normal,
            color: theme.text_color,
            display: "flex",
            textAlign: 'center',
            justifyContent: 'center',
            fontFamily: 'Rubik-Regular',
        }
    });


export const ProductCardSelectTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    CardSelect: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
        padding: globalStyles().globalPadding.padding,
        backgroundColor: 'transparent',
        borderRadius: globalStyles().borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark
    },
    CardSelectInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        maxWidth: "90%"
    },
    CardSelectMessage: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontFamily: 'Rubik-Regular'
    },
    CardSelectSubMessage: {
        fontSize: globalFont.font_sm,
        fontFamily: 'Rubik-Regular'
    },
    optionCheck: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark
    },

    message_component_content: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'orange',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message_tag: {
    }
})
