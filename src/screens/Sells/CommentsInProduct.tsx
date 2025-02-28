import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SellsNavigationProp } from '../../interface';
import { useTheme } from '../../context/ThemeContext';
import { EditProductStyles } from '../../theme/Screens/Inventory/EditProductTheme';
import { TextInputContainer } from '../../components/Inputs/TextInputContainer';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import ModalBottom from '../../components/Modals/ModalBottom';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';

type CommentsInSellScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - CommentInSell'>;

interface CommentsInSellInterface {
    route: CommentsInSellScreenRouteProp
};

export const CommentsInSell = ({ route }: CommentsInSellInterface) => {
    const { comments } = route?.params ?? {};
    const { navigate } = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(comments);
    const textInputRef = useRef<TextInput>(null);

    const onEdit = () => {
        setEditingProduct(true);

        setTimeout(() => {
            setEditingProduct(false);
            handleCloseModal();
        }, 500);
    };

    const handleCloseModal = () => {
        navigate('[Sells] - ConfirmationScreen', { comments: comment });
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
                        value={comments?.toUpperCase()}
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
