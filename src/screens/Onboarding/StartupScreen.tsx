import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { StartupScreenTheme } from '../../theme/StartupScreenTheme';
import { useProtectPage } from '../../hooks/useProtectPage';
import { AuthContext } from '../../context/auth/AuthContext';

export const StartupScreen = () => {
    const { theme } = useTheme();
    const { status } = useContext(AuthContext);

    // Determine protection condition and navigation target
    const isProtected = status === 'not-authenticated' || status === 'authenticated';
    const targetPage = status === 'authenticated' ? 'OnboardingScreen' : 'LoginPage';

    // Setup page protection
    useProtectPage({
        protectionCondition: isProtected,
        navigatePage: targetPage
    });

    return (
        <View style={StartupScreenTheme(theme).StartupScreen}>
            <View style={StartupScreenTheme(theme).imageContainer}>
                <Image
                    style={StartupScreenTheme(theme).logo}
                    source={require('../../assets/ic_launcher_monochrome.png')}
                />
            </View>
        </View>
    );
};
