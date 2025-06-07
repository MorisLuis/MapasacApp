import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { inputStyles } from '../../../theme/Components/inputs';
import { updateProduct } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../hooks/styles/useTheme';

type EditDescripcioPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - editDescripcio'>;

type EditDescripcioInterface = {
    route: EditDescripcioPageRouteProp
};

export const EditDescripcio = ({ route }: EditDescripcioInterface): JSX.Element => {

    const { product } = route?.params ?? {};
    const { goBack } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme, size } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [descripcioState, setDescripcioState] = useState<string>()
    const inputRef = useRef<TextInput>(null);
    const { handleError } = useErrorHandler()

    const handleCloseModal = (): void => goBack();
    const handleEditDescripcio = (text: string): void => setDescripcioState(text);
    const handleProductPiezasCount = useCallback((): void => setDescripcioState(product?.producto), [product?.producto])

    const onFinish = (): void => {
        setEditingProduct(false);
        handleCloseModal()
    }

    const onEdit = async (): Promise<void> => {

        try {
            setEditingProduct(true);
            const productUpdated = await updateProduct({
                idinvearts: product?.idinvearts,
                dataValue: "producto",
                data: descripcioState ?? '',
                onFinish: onFinish
            });
            if ('error' in productUpdated) {
                return handleError(productUpdated);
            };
        } catch (error) {
            handleError(error)
        }

    }

    useEffect(() => {
        handleProductPiezasCount()
    }, [handleProductPiezasCount])

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={EditProductStyles(theme, size).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme, size).EditProductInBag_title}>Deseas cambiar la descripción?</CustomText>
                <TextInput
                    ref={inputRef}
                    value={descripcioState}
                    onChangeText={handleEditDescripcio}
                    style={[inputStyles({theme, typeTheme, size}).input]}
                />
            </View>

            <ButtonCustum
                title="Editar"
                onPress={onEdit}
                disabled={editingProduct}
            />

        </ModalBottom>
    );
};