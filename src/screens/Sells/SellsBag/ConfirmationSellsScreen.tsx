import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterface } from '../../../interface/productSells';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../../theme/appTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postSells, postSellsInterface } from '../../../services';
import { ClientInterface } from '../../../interface';
import useActionsForModules from '../../../hooks/useActionsForModules';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - ConfirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

export const ConfirmationSellsScreen = ({ route }: ConfirmationSellsScreenInterface) => {

    const { client, comments } = route?.params ?? {};
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();
    const { handleColorWithModule } = useActionsForModules()

    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductSellsInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [methodPayment, setMethodPayment] = useState(0);
    const [typeSelected, setTypeSelected] = useState<ClientInterface>();
    const [commentsLocal, setCommentsLocal] = useState("");
    const availableToPost = methodPayment !== 0 && typeSelected !== undefined;

    const onPostSells = async () => {
        setCreateSellLoading(true);
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                idclientes: typeSelected?.idclientes,
                comments: commentsLocal,
                opcion: 2
            }
            const postSell = await postSells(sellBody);

            if ('error' in postSell) {
                return handleError(postSell);
            };

            await resetAfterPost();

            navigate('succesMessageScreen', {
                redirection: 'SellsNavigation',
                from: 'Sells',
                numberOfProducts: numberOfItemsSells,
                importe: totalPrice,
                folio: postSell.data.folio
            });

        } catch (error) {
            handleError(error)
        } finally {
            setCreateSellLoading(false);

        }
    };

    const loadBags = async () => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const newBags = await getBagInventory({ page, limit: 5, option: 2 });


            if (newBags.error) {
                handleError(newBags.error);
                return;
            }

            if (newBags && newBags.length > 0) {
                setBags((prevBags: ProductSellsInterface[]) => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        };

    };

    const handleGetPrice = async () => {

        try {
            const totalprice = await getTotalPriceBag({ opcion: 2 });
            if (totalprice.error) return handleError(totalprice.error);
            setTotalPrice(parseFloat(totalprice))
        } catch (error) {
            handleError(error);
        }
    }

    const handleGetClient = () => {
        setTypeSelected(client)
    }

    const refreshBags = async () => {

        try {
            setIsLoading(true);
            const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 2 });

            if (refreshedBags.error) {
                handleError(refreshedBags.error);
                return;
            }

            setBags(refreshedBags);

        } catch (error) {
            handleError(error);
        } finally {
            setPage(2);
            setIsLoading(false);
            setHasMore(true);
            setDataUploaded(true)
        }
    };

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => {
        return (
            <ProductSellsCard
                product={item}
                onClick={() => navigate('[Sells] - EditProductInBag', { product: item })}
                renderRightProp={() => {
                    return (
                        <Icon name='open-outline' color={theme.text_color} size={globalFont.font_normal} />
                    )
                }}
            />
        )
    }, [createSellLoading, bags]);

    const renderScreen = () => {
        return (
            <SafeAreaView>
                <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <Icon name='card-sharp' color={theme.color_red} size={globalFont.font_normal} />
                    <CustomText style={{ fontFamily: 'Rubik-Bold', color: theme.color_red }}>Forma de pago</CustomText>
                </View>

                <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodContainer}>
                    <View style={ConfirmationScreenStyles(theme, typeTheme).typeMethodContainer}>
                        <TouchableOpacity
                            style={[
                                methodPayment === 2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === 2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(2)}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                methodPayment === 1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === 1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(1)}
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
        }, [])
    );

    useEffect(() => {
        if (client) handleGetClient();
    }, [client]);

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