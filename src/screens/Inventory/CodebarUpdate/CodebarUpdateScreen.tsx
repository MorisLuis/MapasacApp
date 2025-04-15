import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { globalStyles } from '../../../theme/appTheme';
import { updateCodeBar } from '../../../services/codebar';
import { Selector } from '../../../components/Inputs/Selector';
import codebartypes from '../../../utils/codebarTypes.json';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { CodebarUpdateScreenStyles } from '../../../theme/Screens/Inventory/CodebarUpdateScreenTheme';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import { ProductDetailsStyles } from '../../../theme/Screens/Inventory/ProductDetailsTheme';
import CardSelect from '../../../components/Cards/CardSelect';
import FooterScreen from '../../../components/Navigation/FooterScreen';
import { CodebarNavigationProp } from '../../../interface/navigation';

interface CodebarUpdateScreenInterface {
    selectedProduct: { idinvearts: number }
}

const OPTION_DISABLED = 0;
const OPTION_UPDATE_WITH_FOUND_CODE = 1;
const OPTION_USE_CAMERA = 2;
const OPTION_UPDATE_WITH_RANDOM_CODE = 3;
const OPTION_MANUAL_INPUT = 4;

const DEFAULT_CODEBAR_TYPE = 1;

export const CodebarUpdateScreen = ({ selectedProduct }: CodebarUpdateScreenInterface) : React.ReactElement => {

    const navigation = useNavigation<CodebarNavigationProp>();
    const { updateBarCode, handleGetCodebarType, codebarType, codeBar } = useContext(SettingsContext);
    const { theme } = useTheme();
    const { handleError } = useErrorHandler()

    const [codebartypeSelected, setCodebartypeSelected] = useState<number>();
    const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false);
    const [optionSelected, setOptionSelected] = useState<number>(OPTION_DISABLED)
    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType);

    const hanldeCodebarTypeSelected = (value: number): void => {
        handleGetCodebarType(value)
    }

    const handleGoToNextStep = (): void => {
        if (optionSelected === OPTION_UPDATE_WITH_FOUND_CODE) {
            hanldeUpdateCodebarWithCodeFound();
        } else if (optionSelected === OPTION_USE_CAMERA) {
            updateBarCode('');
            navigation.navigate('[CodebarUpdateNavigation] - CameraModal');
        } else if (optionSelected === OPTION_UPDATE_WITH_RANDOM_CODE) {
            hanldeUpdateCodebarWithCodeRandom();
        } else if (optionSelected === OPTION_MANUAL_INPUT) {
            navigation.navigate('[CodebarUpdateNavigation] - UpdateCodeBarWithInput', { title: "Escribir manualmente" });
        }
    };

    <FooterScreen
        buttonDisabled={optionSelected === OPTION_DISABLED}
        buttonOnPress={handleGoToNextStep}
        buttonTitle='Avanzar'
    />

    const hanldeUpdateCodebarWithCodeFound = async (): Promise<void> => {

        try {
            if (!codeBar) return;
            const codebar = await updateCodeBar({
                codebarras: codeBar,
                idinvearts: selectedProduct.idinvearts
            })

            if ('error' in codebar) {
                return handleError(codebar);
            }

            navigation.goBack()
        } catch (error) {
            handleError(error);
        }

    }

    const hanldeUpdateCodebarWithCodeRandom = async (): Promise<void> => {

        try {
            if (!codeBar) return;
            const codebar = await updateCodeBar({
                codebarras: codeBar,
                idinvearts: selectedProduct.idinvearts
            })

            if ('error' in codebar) {
                return handleError(codebar);
            }

            navigation.goBack();
        } catch (error) {
            handleError(error);
        }

    }

    const handleGetTypeOfCodebar =  useCallback(async (): Promise<void> => {
        setCodebartypeSelected(codebarType || DEFAULT_CODEBAR_TYPE);
    }, [codebarType]);

    useEffect(() => {
        handleGetTypeOfCodebar()
    }, [codebarType, handleGetTypeOfCodebar]);


    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={CodebarUpdateScreenStyles(theme).CodebarUpdateScreen}>
                <View style={ProductDetailsStyles(theme).optionsContent}>
                    {
                        !changeTypeOfCodebar ?
                            <View style={CodebarUpdateScreenStyles(theme).actualCodebarType}>
                                <CustomText style={CodebarUpdateScreenStyles(theme).actualCodebarTypeText}>Actualmente el codigo de barras es tipo {currentType?.type}</CustomText>
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(true)}
                                >
                                    <CustomText style={CodebarUpdateScreenStyles(theme).actualCodebarTypeChange}>Cambiar</CustomText>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={CodebarUpdateScreenStyles(theme).selectorCodebarType}>
                                <Selector
                                    label={"Tipo de codigo de barras: "}
                                    items={codebartypes.barcodes.map((item) => {
                                        return { label: item?.type, value: item?.id }
                                    })}
                                    value={codebartypes?.barcodes.find((code) => code?.id === codebartypeSelected)?.type || "Code 128"}

                                    //Methods
                                    onValueChange={(value) => hanldeCodebarTypeSelected(value)}
                                />
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(false)}
                                >
                                    <CustomText style={[CodebarUpdateScreenStyles(theme).actualCodebarTypeChange, { marginTop: globalStyles().globalMarginBottomSmall.marginBottom }]}>Ocultar</CustomText>
                                </TouchableOpacity>
                            </View>
                    }

                    <CardSelect
                        onPress={() => setOptionSelected(OPTION_UPDATE_WITH_FOUND_CODE)}
                        message={`Actualizar código con: ${codeBar}`}
                        sameValue={optionSelected === OPTION_UPDATE_WITH_FOUND_CODE}
                        icon="barcode-outline"
                        visible={codeBar ? true : false}
                        extraStyles={{ marginBottom: globalStyles().globalMarginBottom.marginBottom }}
                    />

                    <CardSelect
                        onPress={() => setOptionSelected(OPTION_USE_CAMERA)}
                        message={`Usar camara para escanear codigo`}
                        sameValue={optionSelected === OPTION_USE_CAMERA}
                        icon="camera-outline"
                        extraStyles={{ marginBottom: globalStyles().globalMarginBottom.marginBottom }}
                    />

                    <CardSelect
                        onPress={() => setOptionSelected(OPTION_MANUAL_INPUT)}
                        message='Escribir manualmente'
                        sameValue={optionSelected === OPTION_MANUAL_INPUT}
                        icon="text-outline"
                        extraStyles={{ marginBottom: globalStyles().globalMarginBottom.marginBottom }}
                    />
                </View>

                <FooterScreen
                    buttonDisabled={optionSelected === OPTION_DISABLED}
                    buttonOnPress={handleGoToNextStep}
                    buttonTitle='Avanzar'
                />
            </View>
        </SafeAreaView>
    )
}