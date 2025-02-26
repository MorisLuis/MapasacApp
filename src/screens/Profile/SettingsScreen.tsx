import React, { useContext } from 'react'
import { SafeAreaView, View } from 'react-native'
import { SettingsContext } from '../../context/settings/SettingsContext';
import { SettingsScreenStyles } from '../../theme/Screens/Profile/SettingsScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import Toggle from '../../components/Inputs/Toggle';

export const SettingsScreen = () => {

    const { theme, toggleTheme, typeTheme } = useTheme();
    const { vibration, handleVibrationState } = useContext(SettingsContext);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
            <View style={SettingsScreenStyles(theme).SettingsScreen}>
                <>
                    <Toggle
                        label='Vibracion en escaneo'
                        message="Hacer vibrar el celular cuando escaneas."
                        extraStyles={{}}
                        value={vibration}
                        onChange={(value: boolean) => handleVibrationState(value)}
                    />

                    <View style={SettingsScreenStyles(theme).divider}></View>

                    <Toggle
                        label='Apariencia'
                        message="Personaliza el aspecto de la aplicación en tu dispositivo."
                        extraStyles={{}}
                        value={typeTheme === 'light' ? true : false}
                        onChange={(value: boolean) => toggleTheme()}
                    />

                    <View style={SettingsScreenStyles(theme).divider}></View>
                </>
            </View>
        </SafeAreaView>
    )
}