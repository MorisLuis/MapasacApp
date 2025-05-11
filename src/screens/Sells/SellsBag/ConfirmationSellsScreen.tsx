import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { globalFont } from '../../../theme/appTheme';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import LayoutConfirmation, { CombinedProductInterface } from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postSells, postSellsInterface } from '../../../services';
import { ClientInterface, ProductSellsInterface } from '../../../interface';
import useActionsForModules from '../../../hooks/useActionsForModules';
import ProductConfirmationCard from '../../../components/Cards/ProductCard/ProductConfirmationCard';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - ConfirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

const INITIAL_PAGE = 1;
const PAGE_2 = 2;

const INITIAL_METHOD_PAYMENT = 0;
const METHOD_PAYMENT_1 = 1;
const METHOD_PAYMENT_2 = 2;
const BAG_EMPTY = 0;

export const ConfirmationSellsScreen = ({ route }: ConfirmationSellsScreenInterface): React.ReactElement => {

    const { client, comments } = route?.params ?? {};
    const { numberOfItemsSells, resetBagAfterSale } = useContext(SellsBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();
    const { handleColorWithModule } = useActionsForModules()

    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [bags, setBags] = useState<CombinedProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [methodPayment, setMethodPayment] = useState(INITIAL_METHOD_PAYMENT);
    const [typeSelected, setTypeSelected] = useState<ClientInterface>();
    const [commentsLocal, setCommentsLocal] = useState("");
    const availableToPost = methodPayment !== INITIAL_METHOD_PAYMENT && typeSelected !== undefined;

    const onPostSells = async (): Promise<void> => {
        setCreateSellLoading(true);
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                idclientes: typeSelected?.idclientes,
                comments: commentsLocal,
                opcion: 2
            }
            const { folio } = await postSells(sellBody);

            await resetBagAfterSale();

            navigate('succesMessageScreen', {
                redirection: 'SellsNavigation',
                from: 'Sells',
                numberOfProducts: numberOfItemsSells,
                importe: totalPrice,
                folio: folio
            });

        } catch (error) {
            handleError(error)
        } finally {
            setCreateSellLoading(false);

        }
    };

    const loadBags = async (): Promise<void> => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const { bag } = await getBagInventory({ page, limit: 5, option: 2 });

            if (bag.length > BAG_EMPTY) {
                setBags((prevBags: CombinedProductInterface[]) => [...prevBags, ...bag]);
                setPage(page + INITIAL_PAGE);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        };

    };

    const handleGetPrice = useCallback(async (): Promise<void> => {
        try {
            const { total } = await getTotalPriceBag({ opcion: 2 });
            setTotalPrice(total)
        } catch (error) {
            handleError(error);
        }
    }, [handleError])

    const handleGetClient = useCallback((): void => {
        setTypeSelected(client)
    }, [client])

    const refreshBags = useCallback(async (): Promise<void> => {

        try {
            setIsLoading(true);
            const { bag } = await getBagInventory({ page: 1, limit: 5, option: 2 });
            setBags(bag);

        } catch (error) {
            handleError(error);
        } finally {
            setPage(PAGE_2);
            setIsLoading(false);
            setHasMore(true);
            setDataUploaded(true)
        }
    }, [handleError]);

    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => {
        return (
            <ProductConfirmationCard
                product={item}
                onClick={() => navigate('[Sells] - EditProductInBag', { product: item as ProductSellsInterface })}
                renderRightProp={() => {
                    return (
                        <Icon name='open-outline' color={theme.text_color} size={globalFont.font_normal} />
                    )
                }}
            />
        )
    }, [navigate, theme.text_color]);

    const renderScreen = (): React.ReactElement => {
        return (
            <SafeAreaView>
                <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <Icon name='card-sharp' color={theme.color_red} size={globalFont.font_normal} />
                    <CustomText style={ConfirmationScreenStyles(theme).subtitleConfirmation_text}>Forma de pago</CustomText>
                </View>

                <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodContainer}>
                    <View style={ConfirmationScreenStyles(theme, typeTheme).typeMethodContainer}>
                        <TouchableOpacity
                            style={[
                                methodPayment === METHOD_PAYMENT_2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === METHOD_PAYMENT_2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(METHOD_PAYMENT_2)}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                methodPayment === METHOD_PAYMENT_1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === METHOD_PAYMENT_1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(METHOD_PAYMENT_1)}
                        >
                            <Icon name='cash-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Contado</CustomText>
                        </TouchableOpacity>
                    </View>

                    <CardButton
                        onPress={() => navigate("[Sells] - SelectClient")}
                        label='Cliente'
                        valueDefault='Seleccionar el cliente'
                        color='black'
                        icon='people-sharp'
                        specialValue={typeSelected ? typeSelected.nombres.trim() : undefined}
                    />


                    <CardButton
                        onPress={() => navigate("[Sells] - CommentInSell", { comments: commentsLocal })}
                        label='Comentarios'
                        valueDefault='Escribir comentario'
                        color='black'
                        icon='chatbox-ellipses'
                        specialValue={commentsLocal ? commentsLocal.trim() : undefined}
                    />
                </View>
            </SafeAreaView>
        )
    }

    useFocusEffect(
        useCallback(() => {
            handleGetPrice();
            refreshBags();
        }, [handleGetPrice, refreshBags])
    );

    useEffect(() => {
        if (client) handleGetClient();
    }, [client, handleGetClient]);

    useEffect(() => {
        if (comments) setCommentsLocal(comments);
    }, [comments]);

    return (
        <LayoutConfirmation
            data={bags}
            renderItem={renderItem}
            loadBags={loadBags}
            Type='Sells'
            onPost={onPostSells}
            loadData={dataUploaded}
            availableToPost={availableToPost}
            buttonPostDisabled={createSellLoading}
            numberOfItems={numberOfItemsSells}
            ListHeaderComponent={renderScreen}
            totalPrice={totalPrice}
        />
    )
};