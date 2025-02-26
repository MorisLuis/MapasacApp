import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { Counter } from '../../../components/Inputs/Counter';
import { updateProduct } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import {  InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';

type EditPricePageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - editPrice'>;

type EditPriceInterface = {
    route: EditPricePageRouteProp
};

export const EditPrice = ({ route }: EditPriceInterface) => {

    const { product } = route.params;
    const { goBack } = useNavigation<InventoryNavigationProp>();
    const { theme } = useTheme();
    const { handleError } = useErrorHandler()
    const [piezasCount, setPiezasCount] = useState(0);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = () => {
        goBack()
    }

    const onFinish = () => {
        setEditingProduct(false);
        handleCloseModal()
    }

    const onEdit = async () => {

        try {
            setEditingProduct(true);

            const productUpdated = await updateProduct({
                idinvearts: product?.idinvearts,
                dataValue: "precio1",
                data: piezasCount,
                onFinish: onFinish
            });

            if ('error' in productUpdated) {
                return handleError(productUpdated);
            };
        } catch (error) {
            handleCloseModal();
            handleError(error)
        } finally {
            setEditingProduct(false);
        }
    }

    useEffect(() => {
        const handleProductPiezasCount = () => {
            setPiezasCount(product?.precio1 ? product?.precio1 : 0)
        }

        handleProductPiezasCount()
    }, [])

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={EditProductStyles(theme).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                <Counter counter={piezasCount} setCounter={setPiezasCount} unit={"MXN"} secondaryDesign />
            </View>

            {
                piezasCount < 1 &&
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