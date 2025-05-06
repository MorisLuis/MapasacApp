import { StyleSheet } from 'react-native';
import { Theme, globalFont, globalStyles } from './appTheme';

export const ErrorScreenStyles = (theme: Theme) =>
    StyleSheet.create({
        SuccesMessage: {
            display: 'flex',
            height: '100%',
            width: '100%',
            zIndex: 9999,
            padding: globalStyles().globalPadding.padding,
            justifyContent: 'center',
        },
        content: {
            padding: globalStyles().globalPadding.padding,
        },
        title: {
            fontSize: globalFont.font_big,
            width: '80%',
            color: theme.text_color,
            fontWeight: 'bold',
            marginBottom: globalStyles().globalMarginBottom.marginBottom,
        },
        text: {
            fontSize: globalFont.font_normal,
            width: '80%',
            color: theme.text_color,
            marginBottom: globalStyles().globalMarginBottom.marginBottom,
        },
        actions: {
            width: '40%',
        },
    });
