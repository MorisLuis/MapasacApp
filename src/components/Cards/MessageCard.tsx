import React, { JSX } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { MessageCardStyles } from '../../theme/UI/cardsStyles';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';

interface MessageCardInterface {
    title: string;
    message: string;
    icon?: string;
    extraStyles?: StyleProp<ViewStyle>;
}

export const MessageCard = ({
    message,
    title,
    icon = 'close-outline',
    extraStyles
}: MessageCardInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <View style={[MessageCardStyles({ theme, typeTheme, size }).MessageCard, extraStyles]}>
            <View style={MessageCardStyles({ theme, typeTheme, size }).iconContainer}>
                <Icon name={icon} size={18} color={iconColor} style={MessageCardStyles({ theme, typeTheme, size }).icon} />
            </View>

            <View style={MessageCardStyles({ theme, typeTheme, size }).text}>
                <CustomText style={MessageCardStyles({ theme, typeTheme, size }).title}>{title}</CustomText>
                <CustomText style={MessageCardStyles({ theme, typeTheme, size }).message}>{message}</CustomText>
            </View>
        </View>
    );
};
