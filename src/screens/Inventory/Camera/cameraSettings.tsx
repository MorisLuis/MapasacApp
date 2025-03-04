import { useContext, useState } from "react";
import { Platform, Vibration, Alert } from "react-native";
import { getProductByCodeBar } from "../../../services/products";
import { PERMISSIONS, check, openSettings, request } from "react-native-permissions";
import { SettingsContext } from "../../../context/settings/SettingsContext";
import ProductInterface from "../../../interface/product";
import { identifyUPCOrEANBarcode } from "../../../utils/identifyBarcodeType";
import useErrorHandler from "../../../hooks/useErrorHandler";

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

interface cameraSettingsInterface {
    handleOpenProductsFoundByCodebar: (response: ProductInterface[]) => void;
    setProductsScanned: React.Dispatch<React.SetStateAction<ProductInterface[] | undefined>>;
    productsScanned?: ProductInterface[];
    setCameraPermission: React.Dispatch<React.SetStateAction<PermissionStatus | null>>
}

export const CameraSettings = ({
    handleOpenProductsFoundByCodebar,
    setProductsScanned,
    productsScanned,
    setCameraPermission
}: cameraSettingsInterface) => {

    const { handleCameraAvailable, cameraAvailable, vibration, updateBarCode, handleStartScanning } = useContext(SettingsContext);
    const [codeDetected, setCodeDetected] = useState(false)
    const { handleError } = useErrorHandler()


    const requestCameraPermission = async () => {
        const result = await request(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );
        setCameraPermission(result);
    };

    // Solicitar permisos de cámara
    const handleRequestPermission = async () => {
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
                    { text: 'Abrir Configuración', onPress: () => openSettings() }
                ]
            );
        } else {
            setCameraPermission(result);
        }
    };

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanned = async ({ codes }: { codes: string }) => {
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
            codeValue = codeValue?.substring(1)
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
                const response = await getProductByCodeBar({ codeBar: codeValue?.trim() });
                if (response?.error) return handleError(response.error);
                handleOpenProductsFoundByCodebar(response);
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