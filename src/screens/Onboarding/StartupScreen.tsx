import React, { JSX } from 'react';
import { Image, View } from 'react-native';

import { StartupScreenTheme } from '../../theme/StartupScreenTheme';
import { useTheme } from '../../hooks/styles/useTheme';

export const StartupScreen = (): JSX.Element => {
    const { theme,  size } = useTheme();

    return (
        <View style={StartupScreenTheme(theme, size).StartupScreen}>
            <View style={StartupScreenTheme(theme, size).imageContainer}>
                <Image
                    style={StartupScreenTheme(theme, size).logo}
                    source={require('../../assets/ic_launcher_monochrome.png')}
                />
            </View>
        </View>
    );
};
