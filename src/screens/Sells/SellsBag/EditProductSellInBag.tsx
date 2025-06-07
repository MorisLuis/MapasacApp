import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { Counter } from '../../../components/Inputs/Counter';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import CustomText from '../../../components/UI/CustumText';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { SellsNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../hooks/styles/useTheme';

type EditProductSellScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - EditProductInBag'>;

interface EditProductSellInBagInterface {
    route: EditProductSellScreenRouteProp
};

const INITIAL_PIEZAS = 0;

export const EditProductSellInBag = ({ route }: EditProductSellInBagInterface): React.ReactElement => {

    const { product } = route.params;
    const { updateProductToBagSells, deleteProductToBagSells } = useContext(SellsBagContext);
    const { goBack } = useNavigation<SellsNavigationProp>();
    const { theme, size } = useTheme();
    const [piezasCount, setPiezasCount] = useState(INITIAL_PIEZAS);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = (): void => goBack()

    const onEdit = (): boolean => {
        setEditingProduct(true);

        if (!product.idenlacemob) return false;

        if (piezasCount <= INITIAL_PIEZAS) {
            deleteProductToBagSells(product.idenlacemob);
        } else {
            updateProductToBagSells({ idenlacemob: product.idenlacemob, cantidad: piezasCount });
        }

        Toast.show({
            type: 'tomatoToast',
            text1: '¡Se actualizó la cantidad!'
        });
        setEditingProduct(false);
        handleCloseModal();
        return true;
    };

    const handleProductPiezasCount = useCallback((): void => {
        if (!product?.cantidad) return
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
            <View style={EditProductStyles(theme, size).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme, size).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                <Counter
                    counter={piezasCount}
                    setCounter={setPiezasCount}
                    unit={product?.unidad_nombre}
                    secondaryDesign
                />
            </View>

            {
                piezasCount <= INITIAL_PIEZAS &&
                <View>
                    <CustomText style={EditProductStyles(theme, size).EditProductInBag_warning}>Si lo dejas en 0 se eliminare el producto.</CustomText>
                </View>
            }

            <ButtonCustum
                title='Editar'
                onPress={onEdit}
                disabled={editingProduct}
            />

        </ModalBottom>
    );
};