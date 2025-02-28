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

const MenuOptions = [
    { label: 'Precio', value: 1 },
    { label: 'Comentarios', value: 2 }
];

type EditProductSellRestaurantScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - EditProductInBag'>;

interface EditProductSellInBagInterface {
    route: EditProductSellRestaurantScreenRouteProp
};

export const EditProductSellRestaurantInBag = ({ route }: EditProductSellInBagInterface) => {

    const { product } = route.params;
    const { editProductSell, deleteProductSell } = useContext(SellsRestaurantBagContext);
    const { goBack } = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const [piezasCount, setPiezasCount] = useState(0);
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(product.comentario);
    const [menuOptionActive, setMenuOptionActive] = useState<Number>(MenuOptions?.[0].value)
    const textInputRef = useRef<TextInput>(null);

    const onEdit = () => {
        if(!product.idenlacemob) return;
        setEditingProduct(true)
        if (piezasCount < 1) {
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
        }, 500);
    };

    const handleCloseModal = () => {
        goBack()
    };

    const handleProductPiezasCount = () => {
        setPiezasCount(product?.cantidad ?? 0)
    };

    const handleMenuOptionSelect = useCallback((value: Number) => {
        setMenuOptionActive(value);
    }, []);

    const renderEditCounter = () => {
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
                    piezasCount < 1 &&
                    <View>
                        <CustomText style={EditProductStyles(theme).EditProductInBag_warning}>Si lo dejas en 0 se eliminara el producto.</CustomText>
                    </View>
                }
            </>
        )
    };

    const renderEditComments = () => {
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
    }, []);

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
                menuOptionActive === 1 ? renderEditCounter() : renderEditComments()
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
