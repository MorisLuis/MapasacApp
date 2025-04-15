import { useCallback, useContext, useState } from "react";
import { Platform, Vibration, Alert } from "react-native";
import { PERMISSIONS, check, openSettings, request } from "react-native-permissions";

import { getProductByCodeBar } from "../../../services/products";
import { SettingsContext } from "../../../context/settings/SettingsContext";
import { identifyUPCOrEANBarcode } from "../../../utils/identifyBarcodeType";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { ProductInterface } from "../../../interface";

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

interface cameraSettingsInterface {
    handleOpenProductsFoundByCodebar: (_response: ProductInterface[]) => void;
    setProductsScanned: React.Dispatch<React.SetStateAction<ProductInterface[] | undefined>>;
    productsScanned?: ProductInterface[];
    setCameraPermission: React.Dispatch<React.SetStateAction<PermissionStatus | null>>
}

const VIBRATION_TIME = 500;
const SUBSTRING_VALUE = 1;

export const CameraSettings = ({
    handleOpenProductsFoundByCodebar,
    setProductsScanned,
    productsScanned,
    setCameraPermission
}: cameraSettingsInterface): {
    requestCameraPermission: () => Promise<void>,
    handleRequestPermission: () => Promise<void>,
    codeScanned: (_info: { codes: string; }) => Promise<void>,
    setCodeDetected: React.Dispatch<React.SetStateAction<boolean>>
} => {

    const { handleCameraAvailable, cameraAvailable, vibration, updateBarCode, handleStartScanning } = useContext(SettingsContext);
    const [codeDetected, setCodeDetected] = useState(false)
    const { handleError } = useErrorHandler()


    const requestCameraPermission = useCallback(async (): Promise<void> => {
        const result = await request(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );
        setCameraPermission(result);
    }, [setCameraPermission]);

    // Solicitar permisos de cámara
    const handleRequestPermission = async (): Promise<void> => {
        const result = await check(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );

        if (result === 'denied') {
            requestCameraPermission();
        } else if (result === 'blocked') {
            Alert.alert(
                'Permiso de Cámara Bloqueado',
                'El permiso de la cámara ha sido bloqueado. Por favor, habilítalo en la configuración de tu dispositivo.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Abrir Configuración', onPress: (): Promise<void> => openSettings() }
                ]
            );
        } else {
            setCameraPermission(result);
        }
    };

    const handleVibrate = (): void => {
        if (vibration) {
            Vibration.vibrate(VIBRATION_TIME);
        }
    };

    const codeScanned = async ({ codes }: { codes: string }): Promise<void> => {
        handleCameraAvailable(false)
        handleStartScanning(true)
        setProductsScanned(undefined)
        let codeValue = codes;

        if (!cameraAvailable) {
            handleCameraAvailable(true)
            return;
        };

        const identifyUPCOrEAN = identifyUPCOrEANBarcode(codeValue);

        if (identifyUPCOrEAN === "UPC-A convertido a EAN-13") {
            codeValue = codeValue?.substring(SUBSTRING_VALUE)
        }

        if (!productsScanned) {
            setCodeDetected(true)
            if (codeDetected) {
                handleCameraAvailable(true)
                return;
            };

            if (!codeValue) {
                handleCameraAvailable(true)
                return;
            };

            try {
                const { product, error } = await getProductByCodeBar({ codeBar: codeValue?.trim() });
                if (error) return handleError(error);
                handleOpenProductsFoundByCodebar(product);
                handleVibrate()
                updateBarCode(codeValue)
            } catch (error) {
                handleError(error)
                setCodeDetected(false)
                handleCameraAvailable(true)
            } finally {
                handleStartScanning(false)
            }
        } else {
            handleCameraAvailable(true)
        }
    }


    return {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned,
        setCodeDetected
    }

};