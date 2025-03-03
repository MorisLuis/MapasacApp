import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductInterface from '../../../interface/product';
import { CameraScreenStyles } from '../../../theme/Screens/Inventory/CameraScreenTheme';
import { CameraPermission } from '../../../components/Screens/CameraPermission';
import { Camera, CameraType } from 'react-native-camera-kit';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import CustomText from '../../../components/UI/CustumText';
import { InventoryNavigationProp } from '../../../interface/navigation';
import { CameraSettings } from './cameraSettings';

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

export type OnReadCodeData = {
    nativeEvent: {
        codeStringValue: string;
    };
};

const CameraScreen: React.FC = () => {

    const { handleCameraAvailable, cameraAvailable, startScanning } = useContext(SettingsContext);
    const { handleUpdateSummary } = useContext(InventoryBagContext);

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const { navigate } = useNavigation<InventoryNavigationProp>();
    const isFocused = useIsFocused();

    const [lightOn, setLightOn] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);
    const [productsScanned, setProductsScanned] = useState<ProductInterface[]>();
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);

    // Other functions.
    const handleOpenProductsFoundByCodebar = (response: ProductInterface[]) => {

        if (response?.length === 1) {
            navigate('[Modal] - scannerResultScreen', { product: response[0], fromProductDetails: false });
        } else if (response?.length > 0) {
            navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigate('[Modal] - scannerResultScreen', { product: response[0], fromProductDetails: false });
        }

        setProductsScanned(response);
    }

    const handleOpenInputModal = () => {
        handleCameraAvailable(false);
        navigate('[Modal] - findByCodebarInputModal');
    }

    const {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned,
        setCodeDetected
    } = CameraSettings({
        handleOpenProductsFoundByCodebar,
        setProductsScanned,
        productsScanned,
        setCameraPermission
    })

    useEffect(() => {
        requestCameraPermission();

        handleUpdateSummary()

        return () => {
            handleCameraAvailable(false);
        };
    }, []);

    useFocusEffect(
        useCallback(() => {

            if (Platform.OS === 'android') {
                setCameraKey(prevKey => prevKey + 1);
            }

            handleCameraAvailable(true);

            return () => {
                setCodeDetected(false)
                handleCameraAvailable(false);
            };
        }, [])
    );

    useEffect(() => {
        if (!isFocused) {
            handleCameraAvailable(false);
        }
    }, [isFocused]);

    if (cameraPermission === null) {
        return <CameraPermission requestPermissions={handleRequestPermission} message="Cargando..." />
    }

    if (cameraPermission !== 'granted') {
        return (
            <CameraPermission
                requestPermissions={handleRequestPermission}
                message="Permisos de cámara no concedidos."
                availableAuthorization={true}
            />
        )
    }

    return (
        <View style={CameraScreenStyles(theme).cameraScreen}>

            <View style={CameraScreenStyles(theme).backgroundBlurTop}></View>
            <View style={CameraScreenStyles(theme).backgroundBlurBottom}></View>

            <View style={CameraScreenStyles(theme).cameraContainer}>
                <Camera
                    key={cameraKey}
                    onReadCode={(event: OnReadCodeData) => {
                        if (!cameraAvailable) {
                            console.log("camera is not available");
                            return;
                        }
                        codeScanned({ codes: event.nativeEvent.codeStringValue });
                    }}
                    style={CameraScreenStyles(theme).camera}
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


            <View style={CameraScreenStyles(theme, typeTheme).actions}>
                {/* FLASH */}
                <TouchableOpacity onPress={() => setLightOn(!lightOn)}>
                    <View style={CameraScreenStyles(theme, typeTheme).flash}>
                        <Icon name={lightOn ? "flash" : "flash-outline"} size={22} color={iconColor} />
                    </View>
                </TouchableOpacity>

                {/* SEARCH */}
                <TouchableOpacity onPress={handleOpenInputModal}>
                    <View style={CameraScreenStyles(theme, typeTheme).cog}>
                        <Icon name={"barcode-outline"} size={22} color={iconColor} />
                    </View>
                </TouchableOpacity>
            </View>

            {
                !startScanning ?
                    <View style={CameraScreenStyles(theme).message}>
                        <CustomText style={CameraScreenStyles(theme, typeTheme).textmessage}>Escanea un código de barras para agregarlo al inventario.</CustomText>
                    </View>
                    :
                    <View style={CameraScreenStyles(theme).message}>
                        <CustomText style={CameraScreenStyles(theme, typeTheme).textmessage}>Escaneando...</CustomText>
                    </View>
            }

        </View>
    );
};

export default CameraScreen;