import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { Counter } from '../../../components/Inputs/Counter';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import Toast from 'react-native-toast-message';
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

export const EditProductInBag = ({ route }: EditProductInBagInterface) => {

    const { product } = route.params;
    const { editProduct, deleteProduct } = useContext(InventoryBagContext);
    const { goBack } = useNavigation<InventoryNavigationProp>();
    const { theme } = useTheme();
    const [piezasCount, setPiezasCount] = useState(0);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = () => {
        goBack()
    }

    const onEdit = () => {
        setEditingProduct(true)
        if (piezasCount < 1) {
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

    useEffect(() => {
        const handleProductPiezasCount = () => {
            if(!product?.cantidad) return;
            setPiezasCount(product?.cantidad)
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
                <Counter counter={piezasCount} setCounter={setPiezasCount} unit={product?.unidad_nombre} secondaryDesign />
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