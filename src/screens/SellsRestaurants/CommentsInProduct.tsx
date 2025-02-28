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

type EditProductSellRestaurantScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - CommentInProduct'>;

interface EditProductSellInBagInterface {
    route: EditProductSellRestaurantScreenRouteProp
};

export const CommentsInProduct = ({ route }: EditProductSellInBagInterface) => {
    const { comments } = route?.params ?? {};
    const { formSellsData, updateFormData } = useContext(SellsRestaurantBagContext);
    const { goBack } = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(comments);
    const textInputRef = useRef<TextInput>(null);

    const onEdit = () => {
        setEditingProduct(true);
        updateFormData({ comments: comment });

        setTimeout(() => {
            setEditingProduct(false);
            handleCloseModal();
        }, 500);
    };

    const handleCloseModal = () => {
        goBack();
    };

    const renderEditComments = () => {
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
            onClose={handleCloseModal}
        >
            {renderEditComments()}
            <ButtonCustum
                title='Guardar'
                onPress={onEdit}
                disabled={editingProduct}
            />
        </ModalBottom>
    );
};
