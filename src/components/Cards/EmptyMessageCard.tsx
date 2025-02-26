import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { EmptyMessageCardStyles } from '../../theme/UI/cardsStyles';
import CustomText from '../UI/CustumText';

interface EmptyMessageCardInterface {
    title: string;
    message: string;
    icon?: string
}

export const EmptyMessageCard = ({
    message,
    title,
    icon = 'close-outline'
}: EmptyMessageCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <View style={EmptyMessageCardStyles(theme, typeTheme).EmptyMessageCard}>
            <View style={EmptyMessageCardStyles(theme, typeTheme).iconContainer}>
                <Icon name={icon} size={24} color={iconColor} style={EmptyMessageCardStyles(theme, typeTheme).icon} />
            </View>

            <CustomText style={EmptyMessageCardStyles(theme, typeTheme).title}>{title}</CustomText>
            <CustomText style={EmptyMessageCardStyles(theme, typeTheme).message}>{message}</CustomText>
        </View>
    );
};
