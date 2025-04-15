import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../context/ThemeContext';
import { Counter } from '../../../components/Inputs/Counter';
import CustomText from '../../../components/UI/CustumText';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { SellsNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { TextInputContainer } from '../../../components/Inputs/TextInputContainer';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { SellsRestaurantBagContext } from '../../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { DELAY_HALF_A_SECOND, NUMBER_0 } from '../../../utils/globalConstants';

const MenuOptions = [
    { label: 'Precio', value: 1 },
    { label: 'Comentarios', value: 2 }
];

type EditProductSellRestaurantScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - EditProductInBag'>;

interface EditProductSellInBagInterface {
    route: EditProductSellRestaurantScreenRouteProp
};

const INITIAL_PIEZAS = 0;
const MODULE_OPTION_1 = 1;

export const EditProductSellRestaurantInBag = ({ route }: EditProductSellInBagInterface) : React.ReactElement => {

    const { product } = route.params;
    const { editProductSell, deleteProductSell } = useContext(SellsRestaurantBagContext);
    const { goBack } = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const [piezasCount, setPiezasCount] = useState(INITIAL_PIEZAS);
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(product.comentario);
    const [menuOptionActive, setMenuOptionActive] = useState<number>(MenuOptions?.[NUMBER_0].value)
    const textInputRef = useRef<TextInput>(null);

    const onEdit = (): void => {
        if (!product.idenlacemob) return;
        setEditingProduct(true)
        if (piezasCount <= INITIAL_PIEZAS) {
            deleteProductSell(product.idenlacemob)
        } else {
            editProductSell({
                idenlacemob: product.idenlacemob,
                cantidad: piezasCount,
                comentarios: comment
            });
        }

        setTimeout(() => {
            setEditingProduct(false);
            handleCloseModal()
        }, DELAY_HALF_A_SECOND);
    };

    const handleCloseModal = () : void=> {
        goBack()
    };

    const handleProductPiezasCount = useCallback(() : void => {
        setPiezasCount(product?.cantidad ?? INITIAL_PIEZAS)
    }, [product?.cantidad]);

    const handleMenuOptionSelect = useCallback((value: number) => {
        setMenuOptionActive(value);
    }, []);

    const renderEditCounter = () : React.ReactElement => {
        return (
            <>
                <View style={EditProductStyles(theme).EditProductInBag_header}>
                    <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                    <Counter
                        //ref={textInputRef}
                        counter={piezasCount}
                        setCounter={setPiezasCount}
                        unit={product?.unidad_nombre}
                        secondaryDesign
                    />
                </View>

                {
                    piezasCount <= INITIAL_PIEZAS &&
                    <View>
                        <CustomText style={EditProductStyles(theme).EditProductInBag_warning}>Si lo dejas en 0 se eliminara el producto.</CustomText>
                    </View>
                }
            </>
        )
    };

    const renderEditComments = () : React.ReactElement => {
        return (
            <View>
                <View style={EditProductStyles(theme).EditProductInBag_header}>
                    <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas editar el comentario?</CustomText>
                    <TextInputContainer
                        setComments={(value) => {
                            setComment(value);
                        }}
                        value={comment}
                        onFocus={() => setComment('')}
                    />
                </View>
            </View>
        )
    };

    useEffect(() => {
        handleProductPiezasCount();
    }, [handleProductPiezasCount]);

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);


    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
            showMenu={true}
            menuOptions={MenuOptions}
            menuOptionActive={menuOptionActive}
            onNavigateMenu={handleMenuOptionSelect}
            menuDisabled={editingProduct}
        >
            {
                menuOptionActive === MODULE_OPTION_1 ? renderEditCounter() : renderEditComments()
            }

            <ButtonCustum
                title='Editar'
                onPress={onEdit}
                disabled={editingProduct}
                loading={editingProduct}
            />
        </ModalBottom>
    );
};
