import React, { JSX } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { buttonStyles } from '../../theme/Components/buttons'
import { globalFont, globalStyles } from '../../theme/appTheme'
import CustomText from '../UI/CustumText';
import DotLoader from '../UI/DotLaoder';
import useActionsForModules from '../../hooks/useActionsForModules';
import { useTheme } from '../../hooks/styles/useTheme';

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
}: ButtonCustumInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const { handleColorWithModule } = useActionsForModules()

    return (
        <TouchableOpacity
            style={[
                buttonStyles({theme, size}).button,
                disabled && globalStyles().opacity,
                extraStyles,
                { backgroundColor: buttonColor ? buttonColor : handleColorWithModule.primary }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {
                (iconName && !disabled) && <Icon name={iconName} color={iconColor} size={globalFont(size).font_normal} />
            }
            {
                disabled ?
                    <CustomText style={buttonStyles({theme, typeTheme, size}).buttonText}>
                        {loading ? <DotLoader /> : title}
                    </CustomText>
                    :
                    <CustomText style={buttonStyles({theme, typeTheme, size}).buttonText}>
                        {title}
                    </CustomText>
            }

        </TouchableOpacity>
    )
}

export default ButtonCustum