import React, { JSX, ReactNode } from 'react';
import { Modal, View, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ModalBottomStyles } from '../../theme/Modals/ModalBottomTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';
import useActionsForModules from '../../hooks/useActionsForModules';
import { globalStyles } from '../../theme/appTheme';
import { useResponsive } from '../../hooks/useResponsive';

interface ModalBottomInterface {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;

    blurNotAvailable?: boolean;
    blurAmount?: number;

    //Menu
    showMenu?: boolean;
    menuOptions?: {
        label: string;
        value: number;
    }[];
    menuOptionActive?: number;
    onNavigateMenu?: (_value: number) => void;
    menuDisabled?: boolean
}

const ICON_SIZE_TABLE = 40;
const ICON_SIZE_PHONE = 24;


const ModalBottom = ({
    visible,
    onClose,
    children,

    blurNotAvailable = false,
    showMenu,
    menuOptions,
    menuOptionActive,
    onNavigateMenu,
    menuDisabled
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
                <SafeAreaView style={globalStyles().flex}>
                    <View style={ModalBottomStyles(theme).modalBottom}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
                        >
                            <View style={ModalBottomStyles(theme, typeTheme).modalContent}>
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
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            {
                blurNotAvailable ?
                    <View style={ModalBottomStyles(theme).modalBottomWrapp}>
                        {render()}
                    </View>
                    :
                    <View style={ModalBottomStyles(theme).modalBottomWrapp} >
                        {render()}
                    </View>
            }
        </Modal>
    );
};

export default ModalBottom;

