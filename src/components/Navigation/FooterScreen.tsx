import { View, SafeAreaView, StyleProp, ViewStyle } from 'react-native'
import React, { JSX } from 'react'

import ButtonCustum from '../Inputs/ButtonCustum'
import { uiNavigationStyles } from '../../theme/UI/uiElementsTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/styles/useTheme';

interface FooterScreenInterface {
    buttonTitle: string;
    buttonOnPress: () => void;
    buttonDisabled: boolean;
    buttonLoading?: boolean;

    visible?: boolean
    extraStyles?: StyleProp<ViewStyle>;
};

const FooterScreen = ({
    buttonTitle,
    buttonOnPress,
    buttonDisabled,
    buttonLoading,

    visible = true,
    extraStyles
}: FooterScreenInterface): JSX.Element | null => {

    const { theme, size } = useTheme();
    const { isTablet, isLandscape } = useResponsive();

    return visible ? (
        <SafeAreaView
            style={[
                uiNavigationStyles(theme, size).FooterScreen,
                (isTablet && isLandscape) && uiNavigationStyles(theme, size).tabletLayout,
                extraStyles
            ]}
        >
            <View style={uiNavigationStyles(theme, size).FooterScreenContainer}>
                <ButtonCustum
                    title={buttonTitle}
                    onPress={buttonOnPress}
                    disabled={buttonDisabled}
                    loading={buttonLoading}
                />
            </View>
        </SafeAreaView>
    ) : null
}

export default FooterScreen