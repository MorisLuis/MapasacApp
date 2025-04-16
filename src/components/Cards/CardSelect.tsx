import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { JSX } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import CustomText from '../UI/CustumText'
import { useTheme } from '../../context/ThemeContext';
import { ProductCardSelectTheme } from '../../theme/UI/cardsStyles';
import useActionsForModules from '../../hooks/useActionsForModules';

interface CardSelectInterface {
    onPress: () => void;
    message: string;
    sameValue?: boolean;
    icon?: string;

    subMessage?: string;
    visible?: boolean;
    showSelect?: boolean;

    extraStyles?: StyleProp<ViewStyle>;
}

const CardSelect = ({
    onPress,
    message,
    sameValue,
    icon,

    subMessage,
    visible = true,
    showSelect = true,
    extraStyles
}: CardSelectInterface) : JSX.Element | null => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { handleColorWithModule } = useActionsForModules();

    return visible ? (
        <TouchableOpacity
            style={[
                ProductCardSelectTheme(theme, typeTheme).CardSelect,
                sameValue && { backgroundColor: handleColorWithModule.primary + "40" },
                extraStyles
            ]}
            onPress={onPress}
        >
            <View style={ProductCardSelectTheme(theme, typeTheme).CardSelectInfo}>
                {icon && <Icon name={icon} size={30} color={iconColor} />}
                <View>
                    <CustomText
                        style={[ProductCardSelectTheme(theme, typeTheme).CardSelectMessage]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {message}
                    </CustomText>

                    {
                        subMessage &&
                        <CustomText
                            style={ProductCardSelectTheme(theme, typeTheme).CardSelectSubMessage}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {subMessage}
                        </CustomText>
                    }
                </View>
            </View>

            {
                showSelect &&
                <>
                    {
                        (sameValue) ?
                            <Icon name='checkmark-circle' size={30} color={handleColorWithModule.primary} />
                            :
                            <View style={ProductCardSelectTheme(theme, typeTheme).optionCheck}>
                            </View>
                    }
                </>
            }

        </TouchableOpacity>
    ) 
    : null
}

export default CardSelect