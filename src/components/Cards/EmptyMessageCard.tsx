import React, { JSX } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { EmptyMessageCardStyles } from '../../theme/UI/cardsStyles';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';

interface EmptyMessageCardInterface {
    title: string;
    message: string;
    icon?: string
}

export const EmptyMessageCard = ({
    message,
    title,
    icon = 'close-outline'
}: EmptyMessageCardInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <View style={EmptyMessageCardStyles({ theme, typeTheme, size }).EmptyMessageCard}>
            <View style={EmptyMessageCardStyles({ theme, typeTheme, size }).iconContainer}>
                <Icon name={icon} size={24} color={iconColor} style={EmptyMessageCardStyles({ theme, typeTheme, size }).icon} />
            </View>

            <CustomText style={EmptyMessageCardStyles({ theme, typeTheme, size }).title}>{title}</CustomText>
            <CustomText style={EmptyMessageCardStyles({ theme, typeTheme, size }).message}>{message}</CustomText>
        </View>
    );
};
