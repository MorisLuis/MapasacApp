import React, { JSX, useContext } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'

import { SettingsContext } from '../../context/settings/SettingsContext';
import { SettingsScreenStyles } from '../../theme/Screens/Profile/SettingsScreenTheme';
import Toggle from '../../components/Inputs/Toggle';
import { useTheme } from '../../hooks/styles/useTheme';

export const SettingsScreen = (): JSX.Element => {

    const { theme, toggleTheme, typeTheme, size } = useTheme();
    const { vibration, handleVibrationState } = useContext(SettingsContext);

    return (
        <SafeAreaView style={SettingsScreenStyles(theme, size).SettingsScreen} >
            <ScrollView>
                <View style={SettingsScreenStyles(theme, size).SettingsScreen__content}>
                    <Toggle
                        label='Vibracion en escaneo'
                        message="Hacer vibrar el celular cuando escaneas."
                        extraStyles={{}}
                        value={vibration}
                        onChange={(value: boolean) => handleVibrationState(value)}
                    />

                    <View style={SettingsScreenStyles(theme, size).divider}></View>

                    <Toggle
                        label='Apariencia'
                        message="Personaliza el aspecto de la aplicación en tu dispositivo."
                        extraStyles={{}}
                        value={typeTheme === 'light' ? true : false}
                        onChange={() => toggleTheme()}
                    />

                    <View style={SettingsScreenStyles(theme, size).divider}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}