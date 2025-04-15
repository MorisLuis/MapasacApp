import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../context/ThemeContext';
import CustomText from '../components/UI/CustumText';

export const ClosingScreen = (): React.ReactElement => {

    const { theme } = useTheme();

    return (
        <View style={extraStyles.ClosingScreen}>
            <CustomText style={{ color: theme.text_color }}>Cerrando sesion...</CustomText>
        </View>
    )
}

const extraStyles = StyleSheet.create({
    ClosingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semi-transparente para simular blur
    }
})