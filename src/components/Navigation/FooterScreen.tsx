import { View, SafeAreaView } from 'react-native'
import React, { JSX } from 'react'

import ButtonCustum from '../Inputs/ButtonCustum'
import { useTheme } from '../../context/ThemeContext';
import { uiNavigationStyles } from '../../theme/UI/uiElementsTheme';
import { useResponsive } from '../../hooks/useResponsive';

interface FooterScreenInterface {
    buttonTitle: string;
    buttonOnPress: () => void;
    buttonDisabled: boolean;
    buttonLoading?: boolean;

    visible?: boolean
};

const FooterScreen = ({
    buttonTitle,
    buttonOnPress,
    buttonDisabled,
    buttonLoading,

    visible = true
}: FooterScreenInterface): JSX.Element | null => {

    const { theme } = useTheme();
    const { isTablet, isLandscape } = useResponsive();

    return visible ? (
        <SafeAreaView
            style={[
                uiNavigationStyles(theme).FooterScreen,
                isTablet && uiNavigationStyles(theme).tabletLayout,
                isLandscape && uiNavigationStyles(theme).landscape
            ]}
        >
            <View style={uiNavigationStyles(theme).FooterScreenContainer}>
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