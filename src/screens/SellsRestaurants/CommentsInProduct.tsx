import React, { useContext, useState, useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';
import { SellsNavigationProp } from '../../interface';
import { useTheme } from '../../context/ThemeContext';
import { EditProductStyles } from '../../theme/Screens/Inventory/EditProductTheme';
import { TextInputContainer } from '../../components/Inputs/TextInputContainer';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import ModalBottom from '../../components/Modals/ModalBottom';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { DELAY_HALF_A_SECOND } from '../../utils/globalConstants';

type EditProductSellRestaurantScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - CommentInProduct'>;

interface EditProductSellInBagInterface {
    route: EditProductSellRestaurantScreenRouteProp
};

export const CommentsInProductSellsRestaurants = ({ route }: EditProductSellInBagInterface) : React.ReactElement => {

    const { comments } = route?.params ?? {};
    const { formSellsData, methods: { setValue } } = useContext(SellsRestaurantBagContext);
    const { goBack } = useNavigation<SellsNavigationProp>();

    const { theme } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(comments);
    const textInputRef = useRef<TextInput>(null);

    const editComments = () : void => {
        setEditingProduct(true);

        setTimeout(() => {
            setEditingProduct(false);
            closeModal();
        }, DELAY_HALF_A_SECOND);
    };

    const closeModal = () : void => {
        setValue('comments', comment)
        goBack();
    };

    const renderEditComments = () : React.ReactElement => {
        return (
            <View>
                <View style={EditProductStyles(theme).EditProductInBag_header}>
                    <TextInputContainer
                        ref={textInputRef}
                        setComments={(value) => {
                            setComment(value);
                        }}
                        value={formSellsData.comments}
                        onFocus={() => setComment('')}
                    />
                </View>
            </View>
        );
    };

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    return (
        <ModalBottom
            visible={true}
            onClose={closeModal}
        >
            {renderEditComments()}
            <ButtonCustum
                title='Guardar'
                onPress={editComments}
                disabled={editingProduct}
            />
        </ModalBottom>
    );
};
