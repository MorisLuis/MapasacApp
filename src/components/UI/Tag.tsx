import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { JSX } from 'react'

import CustomText from './CustumText'
import { uiElementeStyles } from '../../theme/UI/uiElementsTheme'
import { useTheme } from '../../context/ThemeContext'
import useActionsForModules, { ColorWithModule } from '../../hooks/useActionsForModules'

interface TagInterface {
    message: string;
    color: 'green' | 'purple';
    extraStyles?: StyleProp<ViewStyle>;
}

const Tag = ({
    message,
    color,
    extraStyles
}: TagInterface): JSX.Element => {

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
                style={[uiElementeStyles(theme, typeTheme).tagText, extraStylesTag(handleColorWithModule).tagText]}
            >
                {message}
            </CustomText>
        </View>
    )
}

export default Tag;

/* eslint-disable react-native/no-unused-styles */
const extraStylesTag = (handleColorWithModule?: ColorWithModule): ReturnType<typeof StyleSheet.create> => StyleSheet.create({
    tagText: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: handleColorWithModule?.secondary
    }
})
