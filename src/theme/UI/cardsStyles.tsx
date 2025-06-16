import { StyleSheet } from 'react-native';
import { Theme, globalFont, globalStyles } from '../appTheme';
import { ThemeColor } from '../../context/theme/ThemeProvider';


export const productCardstyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: ThemeColor, size: (_value: string) => number }) => StyleSheet.create({
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
        padding: size("2.5%")
    },

    information: {
        width: "72.5%",
    },
    information__description: {
        fontWeight: "bold",
        fontSize: globalFont(size).font_med / 1.25,
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
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    },
    quantity_unity: {
        display: "flex",
        fontSize: globalFont(size).font_sm,
        width: "auto",
        color: theme.text_color
    },

    // ProductInfo
    ProductInfo: {
        display: "flex",
        flexDirection: "row"
    },
    ProductInfo__text: {
        fontSize: globalFont(size).font_normal,
        color: theme.text_color,
        maxWidth: "80%"
    },
    ProductInfo__label: {
        fontWeight: "bold",
        marginRight: globalStyles().globalMarginBottomSmall.marginBottom / 2,
        fontSize: globalFont(size).font_normal,
        color: theme.text_color
    }
});

export const EmptyMessageCardStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: ThemeColor, size: (_value: string) => number }) => StyleSheet.create({

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
        fontSize: globalFont(size).font_med,
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

export const MessageCardStyles = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: ThemeColor, size: (_value: string) => number }) => StyleSheet.create({
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
        fontSize: globalFont(size).font_normal,
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

// Estilos actualizados
export const ProductSellsCardTheme = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: ThemeColor, size: (_value: string) => number }) =>
    StyleSheet.create({
        ProductSellsCardTheme: {
            flex: 0.5,
            display: "flex",
            position: 'relative'
        },
        item: {
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
        },
        imageContainer_landscape: {
            maxHeight: size("20%")
        },
        image: {
            flex: 1,
            width: "100%",
            minHeight: 120,
            borderRadius: globalStyles().borderRadius.borderRadius * 1.5,
            borderWidth: 0.5,
            borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark,
        },
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
            height: size("15%"),
            width: size("15%"),
            borderRadius: globalStyles().borderRadius.borderRadius,
            transform: [{ rotate: '-25deg' }],
            position: "absolute",
            zIndex: 1
        },
        title: {
            fontSize: globalFont(size).font_normal,
            color: theme.text_color,
            display: "flex",
            textAlign: 'center',
            justifyContent: 'center',
            fontFamily: 'Rubik-Regular'
        }
    });


export const ProductCardSelectTheme = ({
    theme,
    typeTheme,
    size
}: { theme: Theme, typeTheme?: ThemeColor, size: (_value: string) => number }) => {

    return (StyleSheet.create({
        CardSelect: {
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: "center",
            padding: size('2%'),
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
            fontSize: globalFont(size).font_normal,
            color: theme.text_color,
            fontFamily: 'Rubik-Regular'
        },
        CardSelectSubMessage: {
            fontSize: globalFont(size).font_sm,
            fontFamily: 'Rubik-Regular'
        },
        optionCheck: {
            width: size("2.5%"),
            height: size("2.5%"),
            borderRadius: 100,
            borderWidth: 1,
            borderColor: typeTheme === 'light' ? theme.color_border : theme.color_border_dark
        },

        message_component_content: {
            display: 'flex',
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        message_tag: {
        }
    }))
}
