import React, { JSX, useContext, useState } from 'react'
import { KeyboardType, SafeAreaView, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/Components/inputs';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import codebartypes from '../../../utils/codebarTypes.json';
import { CodebarUpdateWithInputScreenStyles } from '../../../theme/Screens/Inventory/CodebarUpdateWithInputScreenTheme';
import { updateCodeBar } from '../../../services/codebar';
import { getProductByCodeBar } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import FooterScreen from '../../../components/Navigation/FooterScreen';
import ModalDecision from '../../../components/Modals/ModalDecision';
import { CodebarNavigationProp } from '../../../interface/navigation';
import { useTheme } from '../../../hooks/styles/useTheme';

interface CodebarUpdateWithInputScreenInterface {
    selectedProduct: { idinvearts: number }
}

const MIN_PRODUCT_LENGTH = 0;


export const CodebarUpdateWithInputScreen = ({
    selectedProduct
}: CodebarUpdateWithInputScreenInterface): JSX.Element => {

    const { goBack } = useNavigation<CodebarNavigationProp>();
    const { theme, typeTheme, size } = useTheme();
    const { codebarType } = useContext(SettingsContext);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false)
    const { handleError } = useErrorHandler()

    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex ?? '');

    const hanldeUpdateCodebarWithCodeRandom = async (): Promise<void> => {
        try {
            if (!selectedProduct) return;
            if (!regex.test(text)) return;
            setLoading(true)

            const { product } = await getProductByCodeBar({ codeBar: text });
            if (product.length > MIN_PRODUCT_LENGTH) {
                setOpenModalDecision(true);
            } else {
                onUpdateCodeBar()
            }
        } catch (error) {
            handleError(error)
        }
    }

    const onCancel = (): void => {
        goBack()
        goBack()
        setLoading(false)
    }


    const onUpdateCodeBar = async (): Promise<void> => {
        try {
            const codebar = await updateCodeBar({
                codebarras: text,
                idinvearts: selectedProduct.idinvearts
            });

            if ('error' in codebar) {
                return handleError(codebar);
            }

            goBack()
            goBack()
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false)
        };
    }

    const handleTextChange = (value: string): void => {
        setText(value);
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.background_color }} >
                <View style={CodebarUpdateWithInputScreenStyles({ theme, typeTheme, size }).CodebarUpdateWithInputScreen}>

                    <CustomText style={CodebarUpdateWithInputScreenStyles({ theme, typeTheme, size }).inputLabel}>Escribe el codigo que quieras.</CustomText>

                    <CustomText style={CodebarUpdateWithInputScreenStyles({ theme, typeTheme, size }).warningMessage}>{currentType?.errorMessage}</CustomText>

                    <TextInput
                        style={[inputStyles({ theme, size }).input, globalStyles().globalMarginBottomSmall]}
                        placeholder="Ej: 654s1q"
                        onChangeText={handleTextChange}
                        keyboardType={currentType?.keyboardType as KeyboardType}
                        maxLength={currentType?.maxLength}
                        placeholderTextColor={theme.text_color}
                    />

                    <FooterScreen
                        buttonTitle='Actualizar'
                        buttonDisabled={loading || !regex.test(text)}
                        buttonOnPress={hanldeUpdateCodebarWithCodeRandom}
                    />

                </View>
            </SafeAreaView>
            <ModalDecision
                visible={openModalDecision}
                message="Seguro de limpiar el inventario actual?"
            >
                <ButtonCustum
                    title="Ya existe un producto con este codigo de barras. Deseas continuar?"
                    onPress={onUpdateCodeBar}
                    //disabled={loadingCleanBag}
                    iconName="close"
                    extraStyles={{ ...globalStyles().globalMarginBottomSmall }}
                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={onCancel}
                //disabled={loadingCleanBag}
                />
            </ModalDecision>
        </>
    )
}