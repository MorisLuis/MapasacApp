import React, { useState, useEffect, useRef, useContext } from 'react';
import { TextInput, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SellsNavigationProp } from '../../interface';
import { EditProductStyles } from '../../theme/Screens/Inventory/EditProductTheme';
import { TextInputContainer } from '../../components/Inputs/TextInputContainer';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import ModalBottom from '../../components/Modals/ModalBottom';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import { DELAY_HALF_A_SECOND } from '../../utils/globalConstants';
import { useTheme } from '../../hooks/styles/useTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';

type CommentsInSellScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - CommentInSell'>;

interface CommentsInSellInterface {
    route: CommentsInSellScreenRouteProp
};

export const CommentsInSell = ({ route }: CommentsInSellInterface): React.ReactElement => {

    const { comments } = route?.params ?? {};
    const { goBack } = useNavigation<SellsNavigationProp>();
    const { updateConfirmationForm } = useContext(SellsBagContext);

    const { theme, size } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [comment, setComment] = useState(comments);
    const textInputRef = useRef<TextInput>(null);

    const editCommentsSells = (): void => {
        setEditingProduct(true);
        updateConfirmationForm({ comments: comment })

        setTimeout(() => {
            setEditingProduct(false);
            handleCloseModal();
        }, DELAY_HALF_A_SECOND);
    };

    const handleCloseModal = (): void => {
        goBack()
    };

    const renderEditComments = (): React.ReactElement => {
        return (
            <View>
                <View style={EditProductStyles(theme, size).EditProductInBag_header}>
                    <TextInputContainer
                        ref={textInputRef}
                        setComments={(value) => setComment(value)}
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
                onPress={editCommentsSells}
                disabled={editingProduct}
            />
        </ModalBottom>
    );
};
