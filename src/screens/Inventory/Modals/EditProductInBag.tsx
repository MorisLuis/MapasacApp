import React, { JSX, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useTheme } from '../../../context/ThemeContext';
import { Counter } from '../../../components/Inputs/Counter';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';

type EditProductInBagPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - editProductInBag'>;

type EditProductInBagInterface = {
    route: EditProductInBagPageRouteProp
};

const PIEZAS_COUNT_DEFAULT = 0;

export const EditProductInBag = ({ route }: EditProductInBagInterface): JSX.Element => {

    const { product } = route.params;
    const { editProduct, deleteProduct } = useContext(InventoryBagContext);
    const { goBack, navigate } = useNavigation<InventoryNavigationProp>();
    const { theme } = useTheme();
    const [piezasCount, setPiezasCount] = useState(PIEZAS_COUNT_DEFAULT);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = (): void => {
        goBack()
        navigate('confirmationScreen', { updated: true })
    }

    const onEdit = (): void => {
        setEditingProduct(true)
        if (piezasCount <= PIEZAS_COUNT_DEFAULT) {
            deleteProduct(product.idenlacemob)
        } else {
            editProduct({ idenlacemob: product.idenlacemob, cantidad: piezasCount });
        }

        Toast.show({
            type: 'tomatoToast',
            text1: 'Se actualizo la cantidad!'
        })

        setEditingProduct(false);
        handleCloseModal()
    }
    const handleProductPiezasCount = useCallback( (): void => {
        if (!product?.cantidad) return;
        setPiezasCount(product?.cantidad)
    }, [product?.cantidad])

    useEffect(() => {
        handleProductPiezasCount()
    }, [handleProductPiezasCount])

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={EditProductStyles(theme).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                <Counter counter={piezasCount} setCounter={setPiezasCount} unit={product?.unidad_nombre} secondaryDesign />
            </View>

            {
                piezasCount <= PIEZAS_COUNT_DEFAULT &&
                <View>
                    <CustomText style={EditProductStyles(theme).EditProductInBag_warning}>Si lo dejas en 0 se eliminare el producto.</CustomText>
                </View>
            }

            <ButtonCustum
                title="Editar"
                onPress={onEdit}
                disabled={editingProduct}
            />

        </ModalBottom>
    );
};