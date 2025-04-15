import React, { JSX, useContext } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native';

import { buttonStyles } from '../theme/Components/buttons';
import { useTheme } from '../context/ThemeContext';
import { globalFont, globalStyles } from '../theme/appTheme';
import { SessionExpiredStyles } from '../theme/SessionExpiredScreenTheme';
import { AuthContext } from '../context/auth/AuthContext';

export const SessionExpiredScreen = (): JSX.Element => {

    const { theme } = useTheme();
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
                    fontSize: globalFont.font_med
                }}
            >
                La sentimos por las molestias pero la sesión término, es necesario volver iniciar sesión.
            </Text>
            <TouchableOpacity
                style={[buttonStyles(theme).button_small, buttonStyles(theme).yellow, SessionExpiredStyles(theme).back]}
                onPress={handleLogOut}
            >
                <Text style={buttonStyles(theme).buttonTextTertiary}>Volver</Text>
            </TouchableOpacity>
        </View>
    )
}
