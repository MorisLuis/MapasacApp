import React, { JSX } from 'react';
import { Image, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { StartupScreenTheme } from '../../theme/StartupScreenTheme';

export const StartupScreen = (): JSX.Element => {
    const { theme } = useTheme();

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
