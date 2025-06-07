import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { getBagInventory } from '../../../services/bag/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { globalFont } from '../../../theme/appTheme';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import CustomText from '../../../components/UI/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postSells } from '../../../services';
import { ClientInterface, CombinedProductInterface, ProductSellsInterface } from '../../../interface';
import useActionsForModules from '../../../hooks/useActionsForModules';
import ProductConfirmationCard from '../../../components/Cards/ProductCard/ProductConfirmationCard';
import { postSellsParams } from '../../../services/inveart/inveart.interface';
import { useTheme } from '../../../hooks/styles/useTheme';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - ConfirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

export interface ConfirmationSellsFormInterface {
    comments: string;
    client?: ClientInterface,
    methodPayment: number;
}

const INITIAL_METHOD_PAYMENT = 0;
const METHOD_PAYMENT_1 = 1;
const METHOD_PAYMENT_2 = 2;

export const ConfirmationSellsScreen = ({ route }: ConfirmationSellsScreenInterface): React.ReactElement => {

    const { client, comments } = route?.params ?? {};
    const { numberOfItemsSells, resetBagAfterSale, productAdded, sumPriceOfItemsSells } = useContext(SellsBagContext);
    const { typeTheme, theme, size } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleColorWithModule } = useActionsForModules();
    const [createSellLoading, setCreateSellLoading] = useState(false);

    const [confirmationSellsForm, setConfirmationSellsForm] = useState<ConfirmationSellsFormInterface>({
        comments: '',
        client: undefined,
        methodPayment: INITIAL_METHOD_PAYMENT
    });

    const availableToPost = confirmationSellsForm.methodPayment !== INITIAL_METHOD_PAYMENT && confirmationSellsForm.client !== undefined;

    const handlePostSells = async (): Promise<void> => {
        setCreateSellLoading(true);

        const sellBody: postSellsParams = {
            clavepago: confirmationSellsForm.methodPayment,
            idclientes: confirmationSellsForm.client?.idclientes,
            comments: confirmationSellsForm.comments
        };

        const { folio } = await postSells(sellBody);

        navigate('succesMessageScreen', {
            redirection: 'SellsNavigation',
            from: 'Sells',
            numberOfProducts: numberOfItemsSells,
            importe: sumPriceOfItemsSells,
            folio: folio
        });

        await resetBagAfterSale();

        setCreateSellLoading(false);
    };

    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => {
        return (
            <ProductConfirmationCard
                product={item}
                onClick={() => navigate('[Sells] - EditProductInBag', { product: item as ProductSellsInterface })}
                renderRightProp={() => (<Icon name='open-outline' color={theme.text_color} size={globalFont(size).font_normal} />)}
            />
        )
    }, [navigate, theme.text_color, size]);

    const renderHeader = (): React.ReactElement => {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background_color }}>
                <View style={ConfirmationScreenStyles({theme, size}).subtitleConfirmation}>
                    <Icon name='card-sharp' color={theme.color_red} size={globalFont(size).font_normal} />
                    <CustomText style={ConfirmationScreenStyles({theme, size}).subtitleConfirmation_text}>Forma de pago</CustomText>
                </View>

                <View style={ConfirmationScreenStyles({ theme, size, typeTheme }).paymentMethodContainer}>
                    <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).typeMethodContainer}>
                        <TouchableOpacity
                            style={[
                                confirmationSellsForm.methodPayment === METHOD_PAYMENT_2 ? ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItemActive :
                                    ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItem, confirmationSellsForm.methodPayment === METHOD_PAYMENT_2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setConfirmationSellsForm((prev) => ({ ...prev, methodPayment: METHOD_PAYMENT_2 }))}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont(size).font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                confirmationSellsForm.methodPayment === METHOD_PAYMENT_1 ? ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItemActive :
                                    ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItem, confirmationSellsForm.methodPayment === METHOD_PAYMENT_1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setConfirmationSellsForm((prev) => ({ ...prev, methodPayment: METHOD_PAYMENT_1 }))}
                        >
                            <Icon name='cash-sharp' color={theme.text_color} size={globalFont(size).font_normal} />
                            <CustomText>Contado</CustomText>
                        </TouchableOpacity>
                    </View>

                    <CardButton
                        onPress={() => navigate("[Sells] - SelectClient", { client: confirmationSellsForm.client, setConfirmationSellsForm })}
                        label='Cliente'
                        valueDefault='Seleccionar el cliente'
                        color='black'
                        icon='people-sharp'
                        specialValue={confirmationSellsForm.client ? confirmationSellsForm.client.nombres.trim() : undefined}
                    />


                    <CardButton
                        onPress={() => navigate("[Sells] - CommentInSell", { comments: confirmationSellsForm.comments, setConfirmationSellsForm })}
                        label='Comentarios'
                        valueDefault='Escribir comentario'
                        color='black'
                        icon='chatbox-ellipses'
                        specialValue={confirmationSellsForm.comments ? confirmationSellsForm.comments.trim() : undefined}
                    />
                </View>
            </SafeAreaView>
        )
    }

    useEffect(() => {
        if (client) setConfirmationSellsForm((prev) => ({ ...prev, client: client }))
        if (comments) setConfirmationSellsForm((prev) => ({ ...prev, comments: comments }))
    }, [comments, client]);

    return (
        <LayoutConfirmation
            option={2}
            queryFn={getBagInventory}
            queryKey={['confirmation', 'sells']}

            renderHeaderExtra={renderHeader}
            renderItem={renderItem}
            type='Sells'

            onPost={handlePostSells}
            availableToPost={availableToPost}
            buttonPostDisabled={createSellLoading}
            numberOfItems={numberOfItemsSells}
            productAdded={productAdded}
        />
    )
};