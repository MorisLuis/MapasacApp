import { View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { JSX, ReactNode } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import ButtonCustum from '../Inputs/ButtonCustum'
import { useTheme } from '../../context/ThemeContext';
import { uiNavigationStyles } from '../../theme/UI/uiElementsTheme';
import { buttonStyles } from '../../theme/Components/buttons';
import { globalFont } from '../../theme/appTheme';

const { height } = Dimensions.get('window');
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useResponsive } from '../../hooks/useResponsive';

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

const LIMIT_HEIGH = 700;
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
}: FooterTwoButtonsScreenInterface) : JSX.Element | null => {

    const { theme } = useTheme();
    const { isTablet, isLandscape } = useResponsive();

    const getDynamicHeight = () : number => {
        return height > LIMIT_HEIGH ? hp("20%") : hp("25%");
    };

    return visible ? (
        <SafeAreaView style={[
            uiNavigationStyles(theme).FooterTwoButtonsScreen,
            isTablet && uiNavigationStyles(theme).tabletLayout,
            isLandscape && uiNavigationStyles(theme).landscape,
            { height: getDynamicHeight() }
        ]}>
            {visibleChildren && children}
            <View style={uiNavigationStyles(theme).FooterTwoButtonsScreenContainer}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).white, { flex: BUTTON_SIZE_LEFT }]}
                    onPress={buttonSmallOnPress}
                    disabled={buttonSmallDisable}
                >
                    <Icon name={buttonSmallIcon} color={theme.text_color} size={globalFont.font_normal} />
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