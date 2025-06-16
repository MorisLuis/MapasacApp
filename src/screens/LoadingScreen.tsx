import React, { JSX } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'

import { LoadingScreenStyles } from '../theme/LoadingScreenTheme';
import CustomText from '../components/UI/CustumText';
import { useTheme } from '../hooks/styles/useTheme';

interface LoadingScreenInterface {
    message?: string;
    loading?: boolean
};

export const LoadingScreen = ({
    message = "Cargando..."
}: LoadingScreenInterface): JSX.Element => {

    const { theme, size } = useTheme();
    return (
        <View style={LoadingScreenStyles(theme, size).LoadingScreen}>
            <View style={LoadingScreenStyles(theme, size).LoadingScreen__container}>
                <View></View>
                <Image
                    style={LoadingScreenStyles(theme, size).logo}
                    source={require('../assets/ic_launcher_monochrome.png')}
                />
                <View style={LoadingScreenStyles(theme, size).LoadingMessage}>
                    <ActivityIndicator
                        size="small"
                        color={theme.text_color}
                    />
                    <CustomText style={{ color: theme.text_color }}>{message}</CustomText>
                </View>
            </View>
        </View>
    )
}
