import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { JSX } from 'react'

import CustomText from './CustumText'
import { uiElementeStyles } from '../../theme/UI/uiElementsTheme'
import useActionsForModules, { ColorWithModule } from '../../hooks/useActionsForModules'
import { useTheme } from '../../hooks/styles/useTheme'

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

    const { theme, typeTheme, size } = useTheme();
    const { handleColorWithModule } = useActionsForModules()

    return (
        <View
            style={[
                uiElementeStyles({ theme, typeTheme, size }).tagContainer,
                uiElementeStyles({ theme, typeTheme, size })[color],

                extraStyles
            ]}>
            <CustomText
                style={[uiElementeStyles({ theme, typeTheme, size }).tagText, extraStylesTag(handleColorWithModule).tagText]}
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
