import { useCallback, useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../../context/settings/SettingsContext";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { InventoryNavigationProp, ProductInterface } from "../../../interface";
import { DELAY_ACTION, NUMBER_0 } from "../../../utils/globalConstants";
import { InventoryBagContext } from "../../../context/Inventory/InventoryBagContext";
import { useCameraSettings, PermissionStatus } from "./useCameraSettings";
import { Platform } from "react-native";
import { OnReadCodeData } from "./CameraScreen";

interface useCameraActionsResponse {
    onActiveSearchProduct: () => void;
    onActiveLight: () => void;
    onReadCode: (_event: OnReadCodeData) => void;

    handleProductsFoundByCodebar: (_response: ProductInterface[]) => void;
    onRequestPermission: () => Promise<void>,

    lightOn: boolean;
    cameraPermission: PermissionStatus | null,
    cameraKey: number
};

const EMPTY_PRODUCTS_FOUND = 0;
const MORE_THAN_ONE_PRODUCTS_FOUND = 1;
const CAMERA_KEY_DEFAULT = 0;
const CAMERA_KEY = 1;

export const useCameraActions = (): useCameraActionsResponse => {

    const { handleCameraAvailable, cameraAvailable } = useContext(SettingsContext);
    const { handleUpdateSummary } = useContext(InventoryBagContext);

    const isFocused = useIsFocused();
    const { navigate } = useNavigation<InventoryNavigationProp>();

    const [lightOn, setLightOn] = useState(false);
    const [productsScanned, setProductsScanned] = useState<ProductInterface[]>();
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
    const [cameraKey, setCameraKey] = useState(CAMERA_KEY_DEFAULT);

    const handleProductsFoundByCodebar = useCallback((response: ProductInterface[]): void => {

        if (response?.length === MORE_THAN_ONE_PRODUCTS_FOUND) {
            navigate('[Modal] - scannerResultScreen', { product: response[NUMBER_0], fromProductDetails: false });
        } else if (response?.length > EMPTY_PRODUCTS_FOUND) {
            navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigate('[Modal] - scannerResultScreen', { product: response[NUMBER_0], fromProductDetails: false });
        }

        setProductsScanned(response);
    }, [navigate]);

    const { requestCameraPermission, onRequestPermission, codeScanned, setCodeDetected } = useCameraSettings({
        handleProductsFoundByCodebar,
        setProductsScanned,
        productsScanned,
        setCameraPermission
    })

    const onActiveSearchProduct = useCallback(() => {
        handleCameraAvailable(false);
    
        // Da tiempo al componente Camera para desmontarse
        setTimeout(() => {
            navigate('[Modal] - findByCodebarInputModal');
        }, DELAY_ACTION);
    }, [handleCameraAvailable, navigate]);

    const onActiveLight = () : void => {
        setLightOn(!lightOn)
    };

    const onReadCode = useCallback((event: OnReadCodeData) : void => {
        if (!cameraAvailable) return;
        codeScanned({ codes: event.nativeEvent.codeStringValue });
    }, [cameraAvailable, codeScanned] );

    useEffect(() => {
        if (!isFocused) handleCameraAvailable(false);
    }, [handleCameraAvailable, isFocused]);

    useEffect(() => {
        requestCameraPermission();

        handleUpdateSummary()

        return (): void => {
            handleCameraAvailable(false);
        };
    }, [handleCameraAvailable, handleUpdateSummary, requestCameraPermission]);

    useFocusEffect(
        useCallback(() => {

            if (Platform.OS === 'android') {
                setCameraKey(prevKey => prevKey + CAMERA_KEY);
            }

            handleCameraAvailable(true);

            return (): void => {
                setCodeDetected(false)
                handleCameraAvailable(false);
            };
        }, [handleCameraAvailable, setCodeDetected])
    );

    return {
        onActiveSearchProduct,
        onActiveLight,
        onReadCode,
        onRequestPermission,

        handleProductsFoundByCodebar,

        lightOn,
        cameraPermission,
        cameraKey
    }
}