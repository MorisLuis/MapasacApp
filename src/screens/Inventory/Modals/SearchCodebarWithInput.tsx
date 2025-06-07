import React, { JSX, useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getProductByClave, getProductByCodeBar, getProductByNoArticulo } from '../../../services/products';
import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/Components/inputs';
import { SearchCodebarWithInputStyles } from '../../../theme/Screens/Inventory/SearchCodebarWithInputTheme';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { ProductInterface } from '../../../interface';
import { useTheme } from '../../../hooks/styles/useTheme';

const MINIMUM_PRODUCTS_FOUND = 1;
const NUMNER_0 = 0;

export const SearchCodebarWithInput = (): JSX.Element => {

    const { updateBarCode } = useContext(SettingsContext);
    const { navigate, goBack } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme, size } = useTheme();

    const [Barcode, onChangeBarcode] = useState('');
    const [typeOfSearch, setTypeOfSearch] = useState('code')
    const [loadingSearch, setLoadingSearch] = useState(false)
    const { handleError } = useErrorHandler()


    const handleSearchProductByCodebarInput = async (): Promise<void> => {

        try {
            updateBarCode('')
            setLoadingSearch(true)

            let response;
            if (typeOfSearch === 'code') {
                response = await getProductByClave({ clave: Barcode });
            } else if (typeOfSearch === 'noarticulo') {
                response = await getProductByNoArticulo({ noarticulo: Barcode });
            } else if (typeOfSearch === 'barcode') {
                response = await getProductByCodeBar({ codeBar: Barcode });
                updateBarCode(Barcode)
            }

            if (response?.product) handleNavigatoToProduct(response?.product);

        } catch (error) {
            handleError(error);
        } finally {
            setLoadingSearch(false);
        };

    }

    const handleNavigatoToProduct = (response: ProductInterface[]): void => {
        goBack()
        if (response?.length === MINIMUM_PRODUCTS_FOUND) {
            navigate('[Modal] - scannerResultScreen', { product: response[NUMNER_0], fromProductDetails: false });
        } else if (response?.length > MINIMUM_PRODUCTS_FOUND) {
            navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigate('[Modal] - scannerResultScreen', { product: response[NUMNER_0], fromProductDetails: false });
        }
    }

    const handleCloseModal = (): void => {
        goBack()
    }

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={SearchCodebarWithInputStyles({ theme, size }).SearchCodebarWithInput}>
                <CustomText style={SearchCodebarWithInputStyles({ theme, size }).SearchCodebarWithInput_title}>
                    Escribe el {
                        typeOfSearch === 'code' ? 'Codigo' :
                            typeOfSearch === 'noarticulo' ? "no. de articulo" :
                                'Codigo de barras'
                    }:
                </CustomText>
                <TextInput
                    style={[inputStyles({ theme, size }).input, globalStyles().globalMarginBottomSmall]}
                    onChangeText={onChangeBarcode}
                    value={Barcode}
                    placeholder="Ej: 6541q"
                    placeholderTextColor={theme.color_gray}
                />

                <ButtonCustum
                    title="Buscar producto"
                    onPress={handleSearchProductByCodebarInput}
                    disabled={loadingSearch || Barcode === ''}
                    loading={loadingSearch}
                    extraStyles={{ marginBottom: globalStyles().globalMarginBottomSmall.marginBottom }}
                />

                <ScrollView horizontal style={SearchCodebarWithInputStyles({ theme, size }).optionsContainer}>
                    <TouchableOpacity
                        style={[SearchCodebarWithInputStyles({ theme, size }).option, typeOfSearch === 'code' && SearchCodebarWithInputStyles({ theme, size }).optionActive]}
                        onPress={() => setTypeOfSearch('code')}
                    >
                        <CustomText style={
                            typeOfSearch === 'code' ?
                                SearchCodebarWithInputStyles({ theme, typeTheme, size }).optionTextActive : SearchCodebarWithInputStyles({ theme, typeTheme, size }).optionText
                        }>
                            Codigo de producto
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[SearchCodebarWithInputStyles({ theme, size }).option, typeOfSearch === 'barcode' && SearchCodebarWithInputStyles({ theme, size }).optionActive]}
                        onPress={() => setTypeOfSearch('barcode')}
                    >
                        <CustomText style={
                            typeOfSearch === 'barcode' ?
                                SearchCodebarWithInputStyles({ theme, typeTheme, size }).optionTextActive : SearchCodebarWithInputStyles({ theme, typeTheme, size }).optionText
                        }>
                            Codigo de barras
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[SearchCodebarWithInputStyles({ theme, size }).option, typeOfSearch === 'noarticulo' && SearchCodebarWithInputStyles({ theme, size }).optionActive]}
                        onPress={() => setTypeOfSearch('noarticulo')}
                    >
                        <CustomText style={
                            typeOfSearch === 'noarticulo' ?
                                SearchCodebarWithInputStyles({ theme, typeTheme, size }).optionTextActive : SearchCodebarWithInputStyles({ theme, typeTheme, size }).optionText
                        }>
                            No. articulo
                        </CustomText>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ModalBottom>
    );
};