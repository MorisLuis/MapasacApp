import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ModalDecisionStyles } from '../../theme/Modals/ModalDecisionTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';

interface ModalDecisionInterface {
    visible: boolean;
    children: ReactNode;
    message: string
}

const ModalDecision = ({
    visible,
    children,
    message
}: ModalDecisionInterface) => {

    const { theme, typeTheme } = useTheme();

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={1} />
            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                <View style={ModalDecisionStyles(theme, typeTheme).ModalDecision}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={ModalDecisionStyles(theme, typeTheme).modalContent}>
                            <CustomText style={ModalDecisionStyles(theme, typeTheme).message}>{message}</CustomText>
                            <View style={ModalDecisionStyles(theme, typeTheme).modalChildren}>
                                {children}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ModalDecision;
