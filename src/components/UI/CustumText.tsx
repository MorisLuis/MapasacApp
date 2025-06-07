import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { Theme, globalFont } from '../../theme/appTheme';
import { useTheme } from '../../hooks/styles/useTheme';

// Componente de texto personalizado
interface CustomTextProps extends TextProps {
    children: React.ReactNode; // Asegura que acepte texto y otros elementos
}

const CustomText: React.FC<CustomTextProps> = ({ style, children, ...props }) => {
    const { theme, size } = useTheme();

    return (
        <Text
            style={[extraStyles(theme, size).text, style]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default CustomText;

/* eslint-disable react-native/no-unused-styles */
const extraStyles = (theme: Theme, size: (_value: string) => number ): ReturnType<typeof StyleSheet.create> => StyleSheet.create({

    text: {
        fontFamily: 'SourceSans3-Regular',
        fontSize: globalFont(size).font_normal,
        color: theme?.text_color
    }

}) 