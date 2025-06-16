import React, { JSX, ReactNode } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ModalBottomStyles } from '../../theme/Modals/ModalBottomTheme';
import CustomText from '../UI/CustumText';
import useActionsForModules from '../../hooks/useActionsForModules';
import { globalStyles } from '../../theme/appTheme';
import { useResponsive } from '../../hooks/UI/useResponsive';
import { useTheme } from '../../hooks/styles/useTheme';
import { Modal } from 'react-native-paper';

interface ModalBottomInterface {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;

    //Menu
    showMenu?: boolean;
    menuOptions?: {
        label: string;
        value: number;
    }[];
    menuOptionActive?: number;
    onNavigateMenu?: (_value: number) => void;
    menuDisabled?: boolean;

    /* Design to inputGooglePlaces */
    scrollAvailable?: boolean
}

const ICON_SIZE_TABLE = 40;
const ICON_SIZE_PHONE = 24;


const ModalBottom = ({
    visible,
    onClose,
    children,

    showMenu,
    menuOptions,
    menuOptionActive,
    onNavigateMenu,
    menuDisabled,
    scrollAvailable = true
}: ModalBottomInterface): JSX.Element => {

    const { theme, typeTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules()
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { isTablet } = useResponsive();

    const renderMenu = (): JSX.Element | null => {
        const visible = menuOptionActive && onNavigateMenu;
        return visible ? (
            <View style={ModalBottomStyles(theme).menuModal}>
                {
                    menuOptions?.map((item) =>
                        <TouchableOpacity
                            onPress={() => onNavigateMenu?.(item.value)}
                            key={item.value}
                            style={[ModalBottomStyles(theme).menuModalOption, {
                                backgroundColor: menuOptionActive === item.value ? handleColorWithModule.primary : theme.background_color,
                            }, menuDisabled && globalStyles().opacity]}
                            disabled={menuDisabled}
                        >
                            <CustomText>{item.label}</CustomText>
                        </TouchableOpacity>
                    )
                }
            </View>)
            : null
    }

    const render = (): JSX.Element => {
        return (
            <TouchableWithoutFeedback>
                <SafeAreaView>
                    <View style={ModalBottomStyles().ModalBottom__content}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
                        >
                            <View style={[ModalBottomStyles(theme, typeTheme).modalContent, ModalBottomStyles(theme, typeTheme).modalContentStatic]} >
                                <TouchableWithoutFeedback onPress={onClose}>
                                    <TouchableOpacity style={ModalBottomStyles(theme, typeTheme).header} onPress={onClose}>
                                        <Icon name="close-outline" size={isTablet ? ICON_SIZE_TABLE : ICON_SIZE_PHONE} color={iconColor} />
                                    </TouchableOpacity>
                                </TouchableWithoutFeedback>
                                <View style={ModalBottomStyles(theme).modalChildren}>
                                    {children}
                                </View>
                            </View>
                            {showMenu && renderMenu()}
                        </KeyboardAvoidingView>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    };


    const renderScroll = (): JSX.Element => {
        return (
            <TouchableWithoutFeedback>
                <SafeAreaView>
                    <View style={ModalBottomStyles().ModalBottom__content}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
                        >
                            <ScrollView
                                contentContainerStyle={ModalBottomStyles(theme, typeTheme).modalContent}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                <TouchableWithoutFeedback onPress={onClose}>
                                    <TouchableOpacity style={ModalBottomStyles(theme, typeTheme).header} onPress={onClose}>
                                        <Icon name="close-outline" size={isTablet ? ICON_SIZE_TABLE : ICON_SIZE_PHONE} color={iconColor} />
                                    </TouchableOpacity>
                                </TouchableWithoutFeedback>
                                <View style={ModalBottomStyles(theme).modalChildren}>
                                    {children}
                                </View>
                            </ScrollView>
                            {showMenu && renderMenu()}
                        </KeyboardAvoidingView>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    };


    return (
        <Modal
            visible={visible}
            contentContainerStyle={ModalBottomStyles().ModalBottom}
        >
            {
                scrollAvailable ? renderScroll() : render()
            }
        </Modal>
    );
};

export default ModalBottom;

