import React, { JSX, useContext, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, CameraType } from 'react-native-camera-kit';

import { SettingsContext } from '../../../context/settings/SettingsContext';
import { CameraScreenStyles } from '../../../theme/Screens/Inventory/CameraScreenTheme';
import { CameraPermission } from '../../../components/Screens/CameraPermission';
import CustomText from '../../../components/UI/CustumText';
import { useTheme } from '../../../hooks/styles/useTheme';
import { SafeAreaView } from 'react-native';
import { useCameraActions } from './useCameraActions';
import { useCenteredAbsoluteTop } from '../../../hooks/UI/useCenteredAbsoluteTop';

export type OnReadCodeData = {
    nativeEvent: {
        codeStringValue: string;
    };
};

const CameraScreen: React.FC = (): JSX.Element => {

    const { startScanning } = useContext(SettingsContext);
    const { theme, typeTheme, size } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { top, onParentLayout, onChildLayout } = useCenteredAbsoluteTop();


    const {
        onActiveLight,
        onActiveSearchProduct,
        onReadCode,
        onRequestPermission,
        lightOn,
        cameraPermission,
        cameraKey
    } = useCameraActions();

    const renderCameraActions = useMemo(() => {
        const RenderCameraActions = (): JSX.Element => {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <View
                        onLayout={onChildLayout}
                        style={[
                            CameraScreenStyles({ theme, typeTheme, size }).actions,
                            { top: top }
                        ]}
                    >
                        {/* FLASH */}
                        <TouchableOpacity onPress={onActiveLight}>
                            <View style={CameraScreenStyles({ theme, typeTheme, size }).actions__item}>
                                <Icon name={lightOn ? "flash" : "flash-outline"} size={22} color={iconColor} />
                            </View>
                        </TouchableOpacity>


                        {/* SEARCH */}
                        <TouchableOpacity onPress={onActiveSearchProduct}>
                            <View style={[CameraScreenStyles({ theme, typeTheme, size }).actions__item, CameraScreenStyles({ theme, typeTheme, size }).actions__item__last]}>
                                <Icon name={"barcode-outline"} size={22} color={iconColor} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )
        }
        return RenderCameraActions
    }, [onActiveSearchProduct, iconColor, lightOn, onActiveLight, size, theme, typeTheme])

    if (cameraPermission === null) {
        return (
            <CameraPermission
                requestPermissions={onRequestPermission}
                message="Cargando..."
            />
        )
    }

    if (cameraPermission !== 'granted') {
        return (
            <CameraPermission
                requestPermissions={onRequestPermission}
                message="Permisos de cámara no concedidos."
                availableAuthorization={true}
            />
        )
    }

    return (
        <View style={CameraScreenStyles({ theme, size }).cameraScreen} onLayout={onParentLayout}        >

            {/* CAMERA BACKGROUND */}
            <View style={CameraScreenStyles({ theme, size }).backgroundBlurTop}></View>
            <View style={CameraScreenStyles({ theme, size }).backgroundBlurBottom}></View>

            {/* CAMERA */}
            <View style={CameraScreenStyles({ theme, size }).cameraContainer}>
                <Camera
                    key={cameraKey}
                    onReadCode={onReadCode}
                    style={CameraScreenStyles({ theme, size }).camera}
                    torchMode={lightOn ? "on" : "off"}
                    zoomMode="on"
                    focusMode="on"
                    cameraType={CameraType.Back}
                    laserColor="transparent"
                    frameColor="transparent"
                    scanBarcode
                    showFrame={false}
                />
            </View>

            {/* CAMERA ACTIONS */}
            {renderCameraActions()}

            {/* CAMERA MESSAGE */}
            <>
                {
                    !startScanning ?
                        <View style={CameraScreenStyles({ theme, size }).message}>
                            <CustomText style={CameraScreenStyles({ theme, typeTheme, size }).textmessage}>Escanea un código de barras para agregarlo al inventario.</CustomText>
                        </View>
                        :
                        <View style={CameraScreenStyles({ theme, size }).message}>
                            <CustomText style={CameraScreenStyles({ theme, typeTheme, size }).textmessage}>Escaneando...</CustomText>
                        </View>
                }
            </>

        </View>
    );
};

export default CameraScreen;