import React, { JSX, useContext, useState } from 'react';
import { View, Vibration, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/Ionicons';

import { globalStyles } from '../../../theme/appTheme';
import { buttonStyles } from '../../../theme/Components/buttons';
import { CameraModalStyles } from '../../../theme/Screens/Inventory/CameraModalTheme';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { getProductByCodeBar } from '../../../services/products';
import { updateCodeBar } from '../../../services/codebar';
import codebartypes from '../../../utils/codebarTypes.json';
import { identifyBarcodeType, identifyUPCOrEANBarcode } from '../../../utils/identifyBarcodeType';
import { MessageCard } from '../../../components/Cards/MessageCard';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import { CombineNavigationProp } from '../../../interface';
import { useTheme } from '../../../hooks/styles/useTheme';

interface CameraModalInterface {
    selectedProduct: { idinvearts: number }
}

const VIBRATION_DURATION = 500;
const SCAN_DELAY = 2000;
const NAVIGATION_DELAY = 100;
const UPC_PREFIX_LENGTH = 1;
const MIN_CODES_LENGTH = 0;
const MIN_PRODUCT_LENGTH = 0;


const CameraModal = ({ selectedProduct }: CameraModalInterface): JSX.Element => {

    const { vibration, updateBarCode, codebarType, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<CombineNavigationProp>();
    const { theme, typeTheme, size } = useTheme();
    const { handleError } = useErrorHandler()

    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false);
    const [codebarTest, setCodebarTest] = useState(true);

    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex ?? '');

    const handleVibrate = (): void => {
        if (vibration) {
            Vibration.vibrate(VIBRATION_DURATION);
        }
    };

    const codeScanned = async ({ codes }: { codes: string }): Promise<void> => {

        setCodeIsScanning(true)
        if (codes.length > MIN_CODES_LENGTH && isScanningAllowed) {
            setIsScanningAllowed(false);
            let codeValue = codes;
            if (!codeValue) return;

            const identifyUPCOrEAN = identifyUPCOrEANBarcode(codeValue);

            if (identifyUPCOrEAN === "UPC-A convertido a EAN-13") {
                codeValue = codeValue?.substring(UPC_PREFIX_LENGTH)
            }

            if (!regex.test(codeValue)) {
                setCodebarTest(false)
            }

            try {
                const { product } = await getProductByCodeBar({ codeBar: codeValue });
                handleVibrate()
                updateBarCode(codeValue)

                if (product.length > MIN_PRODUCT_LENGTH) {
                    setProductExistent(true)
                }
            } catch (error) {
                setCodebarTest(true)
                handleError(error)
            } finally {
                setTimeout(() => {
                    setIsScanningAllowed(true);
                }, SCAN_DELAY);
            }
        }
        setCodeIsScanning(false);
    }

    const hanldeUpdateCodebar = async (): Promise<void> => {

        try {
            if (!codeBar) return;

            await updateCodeBar({
                codebarras: codeBar,
                idinvearts: selectedProduct.idinvearts
            });

            updateBarCode("")
            navigation.goBack();
            setTimeout(() => navigation.goBack(), NAVIGATION_DELAY); // Pequeño delay para evitar bugs


        } catch (error) {
            handleError(error);
        }
    }

    const handleTryAgain = (): void => {
        updateBarCode("")
        setProductExistent(false)
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={CameraModalStyles(theme, size).cameraScreen}>
                {
                    !productExistent ?
                        <>
                            <View style={CameraModalStyles(theme, size).header}>
                                <CustomText style={CameraModalStyles(theme, size).header_title}>Escanea el codigo</CustomText>
                                {
                                    (codeBar && !codebarTest) ?
                                        <CustomText style={CameraModalStyles(theme, size).header_message}>
                                            Revisa el tipo de codigo de barras requerido, cambiar si asi lo deseas.
                                        </CustomText>
                                        : (codeBar && !codeIsScanning) ?
                                            <CustomText style={CameraModalStyles(theme, size).header_message}>
                                                Asegurate que es el codigo que deseas asignarle a este producto.
                                            </CustomText>
                                            :
                                            <View >
                                                <CustomText style={{ color: theme.text_color }}>Escanea el codigo que le pondras a este producto.</CustomText>
                                                <CustomText style={CameraModalStyles(theme, size).header_message_scanner}>a Actualmente el codigo de barras es tipo: {currentType?.type}.</CustomText>
                                            </View>
                                }
                            </View>

                            {
                                (!codeBar && codeIsScanning) ?
                                    <ActivityIndicator
                                        size={50}
                                        color={iconColor}
                                    />
                                    :
                                    (!codeBar && !codeIsScanning) ?
                                        <View style={CameraModalStyles(theme, size).content}>
                                            <Camera
                                                onReadCode={(event: { nativeEvent: { codeStringValue: string } }) => codeScanned({ codes: event.nativeEvent.codeStringValue })}
                                                style={CameraModalStyles(theme, size).camera}
                                                zoomMode="on"
                                                focusMode="on"
                                                cameraType={CameraType.Back}
                                                laserColor="transparent"
                                                frameColor="transparent"
                                                scanBarcode
                                                showFrame={false}
                                            />
                                        </View>
                                        :
                                        (codeBar && !codeIsScanning && !codebarTest) ?
                                            <View>
                                                <CustomText style={[CameraModalStyles(theme, size).textcodebarFound, { marginBottom: globalStyles().globalMarginBottom.marginBottom }]}>{codeBar}</CustomText>
                                                <CustomText style={CameraModalStyles(theme, size).warningMessage}>{currentType?.errorMessage}</CustomText>
                                                <TouchableOpacity
                                                    style={[buttonStyles({ theme, size }).button_small, { marginBottom: globalStyles().globalMarginBottom.marginBottom }]}
                                                    onPress={handleTryAgain}
                                                >
                                                    <CustomText style={buttonStyles({ theme, typeTheme, size }).buttonTextTertiary}>Intentar de nuevo</CustomText>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <>
                                                <View style={CameraModalStyles(theme, size).codebarFound}>
                                                    <CustomText style={CameraModalStyles(theme, size).textcodebarFound}>{codeBar}</CustomText>
                                                </View>

                                                <MessageCard
                                                    title='El tipo de codigo de barras es:'
                                                    message={`${identifyBarcodeType(codeBar ?? '')}`}
                                                    icon="barcode-outline"
                                                    extraStyles={{ marginBottom: globalStyles().globalMarginBottomSmall.marginBottom }}
                                                />


                                                {
                                                    codeBar &&
                                                    <TouchableOpacity
                                                        style={[buttonStyles({ theme, size }).button_small, { marginBottom: globalStyles().globalMarginBottom.marginBottom }]}
                                                        onPress={hanldeUpdateCodebar}
                                                    >
                                                        <Icon name={"bookmark-outline"} size={18} color={iconColor} />
                                                        <CustomText style={buttonStyles({ theme, size }).buttonTextTertiary}>Asignar codigo de barras</CustomText>
                                                    </TouchableOpacity>
                                                }

                                            </>
                            }
                        </>
                        :
                        <>
                            <View style={CameraModalStyles(theme, size).header}>
                                <CustomText style={CameraModalStyles(theme, size).header_title}>Producto encontrado</CustomText>
                                <CustomText style={CameraModalStyles(theme, size).header_message}>
                                    Se encontro un producto con el codigo de barras: {codeBar}
                                </CustomText>
                            </View>

                            <TouchableOpacity style={[buttonStyles({ theme, size }).button_small, { marginBottom: globalStyles().globalMarginBottom.marginBottom }]} onPress={handleTryAgain}>
                                <CustomText style={buttonStyles({ theme, typeTheme, size }).buttonTextTertiary}>Intentar de nuevo</CustomText>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </SafeAreaView>
    );
};

export default CameraModal;

