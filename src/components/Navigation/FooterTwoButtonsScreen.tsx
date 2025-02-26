import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import ButtonCustum from '../Inputs/ButtonCustum'
import { useTheme } from '../../context/ThemeContext';
import { uiNavigationStyles } from '../../theme/UI/uiElementsTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/Components/buttons';
import { globalFont } from '../../theme/appTheme';

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
}: FooterTwoButtonsScreenInterface) => {

    const { typeTheme, theme } = useTheme();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.text_color_secondary

    return visible && (
        <SafeAreaView style={uiNavigationStyles(theme, typeTheme).FooterTwoButtonsScreen}>
            {visibleChildren && children}
            <View style={uiNavigationStyles(theme, typeTheme).FooterTwoButtonsScreenContainer}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).white, { flex: 0.2 }]}
                    onPress={buttonSmallOnPress}
                    disabled={buttonSmallDisable}
                >
                    <Icon name={buttonSmallIcon} color={theme.text_color} size={globalFont.font_normal} />
                </TouchableOpacity>
                <ButtonCustum
                    title={buttonTitle}
                    onPress={buttonOnPress}
                    disabled={buttonDisabled}
                    extraStyles={{ flex: 0.8 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default FooterTwoButtonsScreen;