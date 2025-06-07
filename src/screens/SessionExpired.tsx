import React, { JSX, useContext } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native';

import { buttonStyles } from '../theme/Components/buttons';
import { globalFont, globalStyles } from '../theme/appTheme';
import { SessionExpiredStyles } from '../theme/SessionExpiredScreenTheme';
import { AuthContext } from '../context/auth/AuthContext';
import { useTheme } from '../hooks/styles/useTheme';

export const SessionExpiredScreen = (): JSX.Element => {

    const { theme, size } = useTheme();
    const { logOut } = useContext(AuthContext);

    const handleLogOut = (): void => {
        const isExpired = true
        logOut(isExpired);
    }

    return (
        <View style={SessionExpiredStyles(theme).SessionExpiredScreen}>
            <Text
                style={{
                    color: theme.text_color,
                    marginBottom: globalStyles().globalMarginBottom.marginBottom,
                    fontSize: globalFont(size).font_med
                }}
            >
                La sentimos por las molestias pero la sesión término, es necesario volver iniciar sesión.
            </Text>
            <TouchableOpacity
                style={[buttonStyles({ theme, size }).button_small, buttonStyles({ theme, size }).yellow, SessionExpiredStyles({ theme, size }).back]}
                onPress={handleLogOut}
            >
                <Text style={buttonStyles({ theme, size }).buttonTextTertiary}>Volver</Text>
            </TouchableOpacity>
        </View>
    )
}
