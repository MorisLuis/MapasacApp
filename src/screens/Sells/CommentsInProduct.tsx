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
import { DELAY_HALF_A_SECOND } from '../../utils/globalConstants';

type CommentsInSellScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - CommentInSell'>;

interface CommentsInSellInterface {
    route: CommentsInSellScreenRouteProp
};

export const CommentsInSell = ({ route }: CommentsInSellInterface) : React.ReactElement => {
    const { comments } = route?.params ?? {};
    const { navigate, goBack } = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(comments);
    const textInputRef = useRef<TextInput>(null);

    const onEdit = () : void => {
        setEditingProduct(true);

        setTimeout(() => {
            setEditingProduct(false);
            handleCloseModal();
        }, DELAY_HALF_A_SECOND);
    };

    const handleCloseModal = () : void => {
        goBack()
        navigate('[Sells] - ConfirmationScreen', { comments: comment });
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
