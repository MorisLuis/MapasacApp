import React, { JSX } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

import { buttonStyles } from '../../theme/Components/buttons';
import { CameraPermissionStyles } from '../../theme/Screens/Inventory/CameraPermissionTheme';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';

interface CameraPermissionInterface {
    requestPermissions: () => Promise<void>;
    message: string;
    availableAuthorization?: boolean
}
export const CameraPermission = ({
    requestPermissions,
    message,
    availableAuthorization = false
}: CameraPermissionInterface): JSX.Element => {

    const { theme, size } = useTheme();

    return (
        <View style={CameraPermissionStyles(theme, size).CameraPermission}>

            <View style={CameraPermissionStyles(theme, size).messageContent}>
                <CustomText style={CameraPermissionStyles(theme, size).messageText}>{message}</CustomText>
            </View>

            {
                availableAuthorization &&
                <View >
                    <TouchableOpacity style={buttonStyles({ theme, size }).button_small} onPress={requestPermissions}>
                        <Text style={{ color: theme.text_color }}>Autorizar camara</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
