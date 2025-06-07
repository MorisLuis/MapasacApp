import React, { JSX, ReactNode } from 'react';
import { Modal, StyleSheet, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { ModalDecisionStyles } from '../../theme/Modals/ModalDecisionTheme';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';

interface ModalDecisionInterface {
    visible: boolean;
    children: ReactNode;
    message: string
}

const ModalDecision = ({
    visible,
    children,
    message
}: ModalDecisionInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();

    const handleDismissKeyboard = (): void => {
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
                <View style={ModalDecisionStyles(theme, typeTheme, size).ModalDecision}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={ModalDecisionStyles(theme, typeTheme, size).modalContent}>
                            <CustomText style={ModalDecisionStyles(theme, typeTheme, size).message}>{message}</CustomText>
                            <View style={ModalDecisionStyles(theme, typeTheme, size).modalChildren}>
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
