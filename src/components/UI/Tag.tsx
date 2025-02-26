import { StyleProp, View, ViewStyle } from 'react-native'
import React from 'react'
import CustomText from './CustumText'
import { uiElementeStyles } from '../../theme/UI/uiElementsTheme'
import { useTheme } from '../../context/ThemeContext'
import useActionsForModules from '../../hooks/useActionsForModules'

interface TagInterface {
    message: string;
    color: 'green' | 'purple';
    extraStyles?: StyleProp<ViewStyle>;
}

const Tag = ({
    message,
    color,
    extraStyles
}: TagInterface) => {

    const { theme, typeTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules()

    return (
        <View
            style={[
                uiElementeStyles(theme, typeTheme).tagContainer,
                uiElementeStyles(theme, typeTheme)[color],
                extraStyles
            ]}>
            <CustomText
                style={[
                    uiElementeStyles(theme, typeTheme).tagText,
                    {
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        color: handleColorWithModule.secondary
                    }]}
            >
                {message}
            </CustomText>
        </View>
    )
}

export default Tag;