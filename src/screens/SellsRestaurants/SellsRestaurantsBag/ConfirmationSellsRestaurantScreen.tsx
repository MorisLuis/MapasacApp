import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { globalFont } from '../../../theme/appTheme';
import { useTheme } from '../../../context/ThemeContext';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import LayoutConfirmation, { CombinedProductInterface } from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { CombinedSellsAndAppNavigationStackParamList, ProductSellsRestaurantInterface } from '../../../interface';
import { SellsRestaurantBagContext } from '../../../context/SellsRestaurants/SellsRestaurantsBagContext';
import useActionsForModules from '../../../hooks/useActionsForModules';
import { postSells, postSellsInterface } from '../../../services';
import { shimpentMethod, shimpentMethodInterface } from './ShimpentScreen';
import ProductConfirmationCard from '../../../components/Cards/ProductCard/ProductConfirmationCard';
import { LocationValue } from './LocationScreen';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ConfirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

const INITIAL_PAGE = 1;
const PAGE_2 = 2;

const INITIAL_METHOD_PAYMENT = 0;
const METHOD_PAYMENT_1 = 1;
const METHOD_PAYMENT_2 = 2;
const BAG_EMPTY = 0;


export const ConfirmationSellsRestaurantScreen = ({ route }: ConfirmationSellsScreenInterface): React.ReactElement => {
    const opcion = 4;
    const { addressDirection, methodShipment } = route?.params ?? {};
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsRestaurantBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();
    const { handleColorWithModule } = useActionsForModules()

    const [page, setPage] = useState(INITIAL_PAGE);
    const [bags, setBags] = useState<CombinedProductInterface[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [totalPrice, setTotalPrice] = useState<number>();
    const [methodPayment, setMethodPayment] = useState(INITIAL_METHOD_PAYMENT);
    const [locationValue, setLocationValue] = useState<LocationValue>();
    const [methodShipmentLocal, setMethodShipmentLocal] = useState<shimpentMethodInterface['id']>()
    const availableToPost = (methodPayment !== INITIAL_METHOD_PAYMENT && methodShipmentLocal && locationValue !== undefined) ? true : false;

    const onPostSellRestaurant = async (): Promise<void> => {
        setCreateSellLoading(true);
        if (!methodShipmentLocal) return;
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                opcion: 4,
                idviaenvio: methodShipmentLocal,
            };

            const { folio } = await postSells(sellBody);
            await resetAfterPost();

            navigate('succesMessageScreen', {
                redirection: 'SellsRestaurantNavigation',
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

    const getMoreProductsFromBag = async (): Promise<void> => {
        if (isLoadingData || !hasMore) return;

        try {
            setIsLoadingData(true);
            const { bag } = await getBagInventory({ page, limit: 5, option: opcion });

            if (bag.length > BAG_EMPTY) {
                setBags((prevBags: CombinedProductInterface[]) => [...prevBags, ...bag]);
                setPage(page + INITIAL_PAGE);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            handleError(error);
        } finally {
            setIsLoadingData(false);
        };
    };

    const getBagInitial = useCallback(async (): Promise<void> => {
        try {
            setIsLoadingData(true);
            const { bag } = await getBagInventory({ page: 1, limit: 5, option: opcion });
            setBags(bag);

        } catch (error) {
            handleError(error);
        } finally {
            setPage(PAGE_2);
            setIsLoadingData(false);
            setHasMore(true);
            setDataUploaded(true)
        }
    }, [handleError]);

    const handleGetPrice = useCallback(async (): Promise<void> => {

        try {
            const { total } = await getTotalPriceBag({ opcion: opcion });
            setTotalPrice(total)
        } catch (error) {
            handleError(error);
        }
    }, [handleError])


    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => {
        return (
            <ProductConfirmationCard
                product={item}
                onClick={() => navigate('[SellsRestaurants] - EditProductInBag', { product: item as ProductSellsRestaurantInterface })}
                renderRightProp={() => {
                    return (
                        <Icon name='open-outline' color={theme.text_color} size={globalFont.font_normal} />
                    )
                }}
            />
        )
    }, [theme.text_color, navigate]);

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
                                methodPayment === METHOD_PAYMENT_1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === METHOD_PAYMENT_1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(METHOD_PAYMENT_1)}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                methodPayment === METHOD_PAYMENT_2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === METHOD_PAYMENT_2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(METHOD_PAYMENT_2)}
                        >
                            <Icon name='cash-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Contado</CustomText>
                        </TouchableOpacity>
                    </View>

                    <CardButton
                        onPress={() => navigate('[SellsRestaurants] - EditShipment')}
                        label='Tipo de envio'
                        valueDefault='Seleccionar el envio'
                        color='black'
                        icon='send'
                        specialValue={
                            methodShipmentLocal ? shimpentMethod.find((item) => methodShipmentLocal === item.id)?.value : undefined
                        }
                    />
                </View>
            </SafeAreaView>
        )
    };

    useFocusEffect(
        useCallback(() => {
            handleGetPrice();
            getBagInitial();
        }, [getBagInitial, handleGetPrice])
    );

    // Handle address direction.
    useEffect(() => {
        if (addressDirection) setLocationValue(addressDirection);
    }, [addressDirection]);

    useEffect(() => {
        if (methodShipment) setMethodShipmentLocal(methodShipment);
    }, [methodShipment]);

    return (
        <LayoutConfirmation
            data={bags}
            renderItem={renderItem}
            loadBags={getMoreProductsFromBag}
            ListHeaderComponent={renderScreen}
            Type='Sells'
            onPost={onPostSellRestaurant}
            loadData={dataUploaded}
            availableToPost={availableToPost}
            buttonPostDisabled={createSellLoading}
            numberOfItems={numberOfItemsSells}
            totalPrice={totalPrice}
        />
    )
};