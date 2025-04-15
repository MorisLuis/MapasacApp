import React, { JSX } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../context/ThemeContext';
import { MessageCardStyles } from '../../theme/UI/cardsStyles';
import CustomText from '../UI/CustumText';

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
}: MessageCardInterface) : JSX.Element => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <View style={[MessageCardStyles(theme, typeTheme).MessageCard, extraStyles]}>
            <View style={MessageCardStyles(theme, typeTheme).iconContainer}>
                <Icon name={icon} size={18} color={iconColor} style={MessageCardStyles(theme, typeTheme).icon} />
            </View>

            <View style={MessageCardStyles(theme, typeTheme).text}>
                <CustomText style={MessageCardStyles(theme, typeTheme).title}>{title}</CustomText>
                <CustomText style={MessageCardStyles(theme, typeTheme).message}>{message}</CustomText>
            </View>
        </View>
    );
};
