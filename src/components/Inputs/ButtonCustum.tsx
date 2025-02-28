import React from 'react'
import { buttonStyles } from '../../theme/Components/buttons'
import { useTheme } from '../../context/ThemeContext'
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../theme/appTheme'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import CustomText from '../UI/CustumText';
import DotLoader from '../UI/DotLaoder';
import useActionsForModules from '../../hooks/useActionsForModules';

interface ButtonCustumInterface {
    onPress: () => void;
    title: string;

    disabled?: boolean;
    loading?: boolean;
    buttonColor?: "white"
    iconName?: string;
    iconColor?: string;
    extraStyles?: StyleProp<ViewStyle>;
}

const ButtonCustum = ({
    onPress,
    title,
    iconName,
    iconColor,
    extraStyles,
    disabled,
    loading,
    buttonColor
}: ButtonCustumInterface) => {

    const { theme, typeTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules()

    return (
        <TouchableOpacity
            style={[
                buttonStyles(theme).button,
                disabled && { opacity: 0.6 },
                extraStyles,
                {backgroundColor: buttonColor ? buttonColor : handleColorWithModule.primary }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {
                (iconName && !disabled) && <Icon name={iconName} color={iconColor} size={globalFont.font_normal} />
            }
            {
                disabled ?
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {loading ? <DotLoader /> : title} 
                    </CustomText>
                    :
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {title}
                    </CustomText>
            }

        </TouchableOpacity>
    )
}

export default ButtonCustum