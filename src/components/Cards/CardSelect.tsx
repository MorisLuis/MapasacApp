import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../UI/CustumText'
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductCardSelectTheme } from '../../theme/UI/cardsStyles';
import useActionsForModules from '../../hooks/useActionsForModules';

interface CardSelectInterface {
    onPress: () => void;
    message: string;
    sameValue?: boolean;
    icon?: string;

    subMessage?: string | number;
    visible?: boolean;
    showSelect?: boolean;
}

const CardSelect = ({
    onPress,
    message,
    sameValue,
    icon,

    subMessage,
    visible = true,
    showSelect = true
}: CardSelectInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { handleColorWithModule } = useActionsForModules();

    return visible && (
        <TouchableOpacity
            style={[
                ProductCardSelectTheme(theme, typeTheme).CardSelect,
                sameValue && { backgroundColor: handleColorWithModule.primary + "40" }
            ]}
            onPress={onPress}
        >
            <View style={ProductCardSelectTheme(theme, typeTheme).CardSelectInfo}>
                {icon && <Icon name={icon} size={20} color={iconColor} />}
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
                            <Icon name='checkmark-circle' size={20} color={handleColorWithModule.primary} />
                            :
                            <View style={ProductCardSelectTheme(theme, typeTheme).optionCheck}>
                            </View>
                    }
                </>
            }

        </TouchableOpacity>
    )
}

export default CardSelect