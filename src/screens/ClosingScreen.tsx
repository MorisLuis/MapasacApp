import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import CustomText from '../components/UI/CustumText';

export const ClosingScreen = () => {

    const { theme } = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: "100%",
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semi-transparente para simular blur
        }}>
            <CustomText style={{ color: theme.text_color }}>Cerrando sesion...</CustomText>
        </View>
    )
}
