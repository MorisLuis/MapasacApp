import React, { JSX } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

import { buttonStyles } from '../../theme/Components/buttons';
import { useTheme } from '../../context/ThemeContext';
import { CameraPermissionStyles } from '../../theme/Screens/Inventory/CameraPermissionTheme';
import CustomText from '../UI/CustumText';

interface CameraPermissionInterface {
    requestPermissions: () => Promise<void>;
    message: string;
    availableAuthorization?: boolean
}
export const CameraPermission = ({
    requestPermissions,
    message,
    availableAuthorization = false
}: CameraPermissionInterface) : JSX.Element => {

    const { theme } = useTheme();

    return (
        <View style={CameraPermissionStyles(theme).CameraPermission}>

            <View style={CameraPermissionStyles(theme).messageContent}>
                <CustomText style={CameraPermissionStyles(theme).messageText}>{message}</CustomText>
            </View>

            {
                availableAuthorization &&
                <View >
                <TouchableOpacity style={buttonStyles(theme).button_small} onPress={requestPermissions}>
                        <Text style={{ color: theme.text_color }}>Autorizar camara</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
