import React, { useContext, useState } from 'react';
import { View, Vibration, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'react-native-camera-kit';

import { globalStyles } from '../../../theme/appTheme';
import { buttonStyles } from '../../../theme/Components/buttons';
import { CameraModalStyles } from '../../../theme/Screens/Inventory/CameraModalTheme';

import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';

import { getProductByCodeBar } from '../../../services/products';
import { updateCodeBar } from '../../../services/codebar';

import codebartypes from '../../../utils/codebarTypes.json';
import { identifyBarcodeType, identifyUPCOrEANBarcode } from '../../../utils/identifyBarcodeType';
import { MessageCard } from '../../../components/Cards/MessageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import { CodebarNavigationProp } from '../../../interface';

interface CameraModalInterface {
    selectedProduct: { idinvearts: number }
    onClose: () => void
}

const CameraModal = ({ selectedProduct, onClose }: CameraModalInterface) => {

    const { vibration, updateBarCode, codebarType, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<CodebarNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false);
    const [codebarTest, setCodebarTest] = useState(true);

    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex ?? '');

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanned = async ({ codes }: { codes: string }) => {

        setCodeIsScanning(true)
        if (codes.length > 0 && isScanningAllowed) {
            setIsScanningAllowed(false);
            let codeValue = codes;
            if (!codeValue) return;

            const identifyUPCOrEAN = identifyUPCOrEANBarcode(codeValue);

            if (identifyUPCOrEAN === "UPC-A convertido a EAN-13") {
                codeValue = codeValue?.substring(1)
            }

            if (!regex.test(codeValue)) {
                setCodebarTest(false)
            }

            try {
                const response = await getProductByCodeBar({ codeBar: codeValue });
                if (response?.error) return handleError(response.error);

                handleVibrate()
                updateBarCode(codeValue)

                if (response.length > 0) {
                    setProductExistent(true)
                }
            } catch (error) {
                setCodebarTest(true)
                handleError(error)
            } finally {
                setTimeout(() => {
                    setIsScanningAllowed(true);
                }, 2000);
            }
        }
        setCodeIsScanning(false);
    }

    const hanldeUpdateCodebar = async () => {

        try {
            if (!codeBar) return;

            const codebar = await updateCodeBar({
                codebarras: codeBar,
                idinvearts: selectedProduct.idinvearts
            });

            if ('error' in codebar) {
                return handleError(codebar);
            }

            onClose();
            navigation.goBack();
        } catch (error) {
            handleError(error);
        }
    }

    const handleTryAgain = () => {
        updateBarCode("")
        setProductExistent(false)
    }

    return (
        <SafeAreaView>
            <View style={CameraModalStyles(theme).cameraScreen}>
                {
                    !productExistent ?
                        <>
                            <View style={CameraModalStyles(theme).header}>
                                <CustomText style={CameraModalStyles(theme).header_title}>Escanea el codigo</CustomText>
                                {
                                    (codeBar && !codebarTest) ?
                                        <CustomText style={CameraModalStyles(theme).header_message}>
                                            Revisa el tipo de codigo de barras requerido, cambiar si asi lo deseas.
                                        </CustomText>
                                        : (codeBar && !codeIsScanning) ?
                                            <CustomText style={CameraModalStyles(theme).header_message}>
                                                Asegurate que es el codigo que deseas asignarle a este producto.
                                            </CustomText>
                                            :
                                            <View >
                                                <CustomText style={{ color: theme.text_color }}>Escanea el codigo que le pondras a este producto.</CustomText>
                                                <CustomText style={CameraModalStyles(theme).header_message_scanner}>Actualmente el codigo de barras es tipo: {currentType?.type}.</CustomText>
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
                                        <View style={CameraModalStyles(theme).content}>
                                            <Camera
                                                onReadCode={(event: { nativeEvent: { codeStringValue: string } }) => codeScanned({ codes: event.nativeEvent.codeStringValue })}
                                                style={CameraModalStyles(theme).camera}

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
                                                <CustomText style={[CameraModalStyles(theme).textcodebarFound, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}>{codeBar}</CustomText>
                                                <CustomText style={CameraModalStyles(theme).warningMessage}>{currentType?.errorMessage}</CustomText>
                                                <TouchableOpacity
                                                    style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                                                    onPress={handleTryAgain}
                                                >
                                                    <CustomText style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Intentar de nuevo</CustomText>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <>
                                                <View style={CameraModalStyles(theme).codebarFound}>
                                                    <CustomText style={CameraModalStyles(theme).textcodebarFound}>{codeBar}</CustomText>
                                                </View>

                                                <MessageCard
                                                    title='El tipo de codigo de barras es:'
                                                    message={`${identifyBarcodeType(codeBar ?? '')}`}
                                                    icon="barcode-outline"
                                                    extraStyles={{ marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }}
                                                />


                                                {
                                                    codeBar &&
                                                    <TouchableOpacity
                                                        style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                                                        onPress={hanldeUpdateCodebar}
                                                    >
                                                        <Icon name={"bookmark-outline"} size={18} color={iconColor} />
                                                        <CustomText style={buttonStyles(theme).buttonTextTertiary}>Asignar codigo de barras</CustomText>
                                                    </TouchableOpacity>
                                                }

                                            </>
                            }
                        </>
                        :
                        <>
                            <View style={CameraModalStyles(theme).header}>
                                <CustomText style={CameraModalStyles(theme).header_title}>Producto encontrado</CustomText>
                                <CustomText style={CameraModalStyles(theme).header_message}>
                                    Se encontro un producto con el codigo de barras: {codeBar}
                                </CustomText>
                            </View>

                            <TouchableOpacity style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]} onPress={handleTryAgain}>
                                <CustomText style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Intentar de nuevo</CustomText>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </SafeAreaView>
    );
};

export default CameraModal;

