import { View, TouchableOpacity } from 'react-native'
import React, { JSX, ReactNode } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native-paper';

import { globalStyles } from '../../theme/appTheme';
import { ModalScreenStyles } from '../../theme/Modals/ModalTheme';
import { useTheme } from '../../hooks/styles/useTheme';



interface ModalScreenInterface {
    children: ReactNode;
    onClose: () => void;
    visible: boolean
}

const ModalScreen = ({
    children,
    onClose,
    visible
}: ModalScreenInterface): JSX.Element | null => {

    const { theme } = useTheme();

    return visible ? (

        <Modal
            visible={visible}
            onDismiss={onClose}
            contentContainerStyle={ModalScreenStyles().ModalScreen}
        >

            <View style={globalStyles().flex}>
                <View
                    style={ModalScreenStyles(theme).ModalScreenContainer}
                >
                    <TouchableOpacity
                        style={ModalScreenStyles(theme).Modal_close}
                        onPress={onClose}
                    >
                        <Icon name="close-outline" size={24} color={theme.text_color} />
                    </TouchableOpacity>
                </View>
                <View
                    style={ModalScreenStyles(theme).Modal_children}
                >
                    {children}
                </View>
            </View>
        </Modal>
    ) : null
}

export default ModalScreen