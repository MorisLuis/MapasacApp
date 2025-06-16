import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { JSX, ReactNode } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import ButtonCustum from '../Inputs/ButtonCustum'
import { uiNavigationStyles } from '../../theme/UI/uiElementsTheme';
import { buttonStyles } from '../../theme/Components/buttons';
import { globalFont } from '../../theme/appTheme';

import { useResponsive } from '../../hooks/UI/useResponsive';
import { useTheme } from '../../hooks/styles/useTheme';

interface FooterTwoButtonsScreenInterface {
    buttonTitle: string;
    buttonOnPress: () => void;
    buttonDisabled: boolean;

    buttonSmallOnPress: () => void;
    buttonSmallDisable: boolean;
    buttonSmallIcon: string;

    children: ReactNode;
    visible: boolean;
    visibleChildren: boolean;
};

const BUTTON_SIZE_LEFT = 0.2;
const BUTTON_SIZE_RIGHT = 0.8;

const FooterTwoButtonsScreen = ({
    buttonTitle,
    buttonOnPress,
    buttonDisabled,
    buttonSmallOnPress,
    buttonSmallDisable,
    buttonSmallIcon,
    children,
    visible,
    visibleChildren
}: FooterTwoButtonsScreenInterface): JSX.Element | null => {

    const { theme, size } = useTheme();
    const { isTablet, isLandscape } = useResponsive();


    return visible ? (
        <SafeAreaView style={[
            uiNavigationStyles(theme, size).FooterTwoButtonsScreen,
            isTablet && uiNavigationStyles(theme, size).tabletLayout,
            isLandscape && uiNavigationStyles(theme, size).landscape
        ]}>
            {visibleChildren && children}
            <View style={uiNavigationStyles(theme, size).FooterTwoButtonsScreenContainer}>
                <TouchableOpacity
                    style={[buttonStyles({ theme, size }).button, buttonStyles({ theme, size }).white, { flex: BUTTON_SIZE_LEFT }]}
                    onPress={buttonSmallOnPress}
                    disabled={buttonSmallDisable}
                >
                    <Icon name={buttonSmallIcon} color={theme.text_color} size={globalFont(size).font_normal} />
                </TouchableOpacity>
                <ButtonCustum
                    title={buttonTitle}
                    onPress={buttonOnPress}
                    disabled={buttonDisabled}
                    extraStyles={{ flex: BUTTON_SIZE_RIGHT }}
                />
            </View>
        </SafeAreaView>
    ) : null
}

export default FooterTwoButtonsScreen;