import React, { JSX, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { Counter } from '../../../components/Inputs/Counter';
import { updateProduct } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import {  InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../hooks/styles/useTheme';

type EditPricePageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - editPrice'>;

type EditPriceInterface = {
    route: EditPricePageRouteProp
};

const PIEZAS_COUNT_DEFAULT = 0;

export const EditPrice = ({ route }: EditPriceInterface) : JSX.Element => {

    const { product } = route.params;
    const { goBack } = useNavigation<InventoryNavigationProp>();
    const { theme, size } = useTheme();
    const { handleError } = useErrorHandler()
    const [piezasCount, setPiezasCount] = useState(PIEZAS_COUNT_DEFAULT);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = () : void => {
        goBack()
    }

    const onFinish = () : void => {
        setEditingProduct(false);
        handleCloseModal()
    }

    const onEdit = async () : Promise<void> => {

        try {
            setEditingProduct(true);

            await updateProduct({
                idinvearts: product?.idinvearts,
                dataValue: "precio",
                data: piezasCount,
                onFinish: onFinish
            });

        } catch (error) {
            handleCloseModal();
            handleError(error)
        } finally {
            setEditingProduct(false);
        }
    }

    const handleProductPiezasCount = useCallback(() : void => {
        setPiezasCount(product?.precio ? product?.precio : PIEZAS_COUNT_DEFAULT)
    }, [product?.precio])

    useEffect(() => {
        handleProductPiezasCount()
    }, [handleProductPiezasCount])

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={EditProductStyles(theme, size).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme, size).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                <Counter counter={piezasCount} setCounter={setPiezasCount} unit={"MXN"} secondaryDesign />
            </View>

            {
                piezasCount <= PIEZAS_COUNT_DEFAULT &&
                <View>
                    <CustomText style={EditProductStyles(theme, size).EditProductInBag_warning}>Si lo dejas en 0 se eliminare el producto.</CustomText>
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