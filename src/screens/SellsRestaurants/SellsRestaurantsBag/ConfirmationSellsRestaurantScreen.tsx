import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { globalFont } from '../../../theme/appTheme';
import { useTheme } from '../../../context/ThemeContext';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/UI/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { CombinedSellsAndAppNavigationStackParamList, ProductSellsRestaurantInterface } from '../../../interface';
import { SellsRestaurantBagContext } from '../../../context/SellsRestaurants/SellsRestaurantsBagContext';
import useActionsForModules from '../../../hooks/useActionsForModules';
import { postSells, postSellsInterface } from '../../../services';
import { shimpentMethod, shimpentMethodInterface } from './ShimpentScreen';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ConfirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

export const ConfirmationSellsRestaurantScreen = ({ route }: ConfirmationSellsScreenInterface) => {

    const opcion = 4;
    const { addressDirection, methodShipment } = route?.params ?? {};
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsRestaurantBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();
    const { handleColorWithModule } = useActionsForModules()

    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductSellsRestaurantInterface[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [totalPrice, setTotalPrice] = useState<number>();
    const [methodPayment, setMethodPayment] = useState(0);
    const [locationValue, setLocationValue] = useState();
    const [methodShipmentLocal, setMethodShipmentLocal] = useState<shimpentMethodInterface['id']>()
    const availableToPost = (methodPayment !== 0 && methodShipmentLocal && locationValue !== undefined) ? true : false;

    const onPostSellRestaurant = async () => {
        setCreateSellLoading(true);
        if (!methodShipmentLocal) return;
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                opcion: 4,
                idviaenvio: methodShipmentLocal,
                //domicilio: locationValue ? `${locationValue.street.trim()} ${locationValue.number ? `- ${locationValue.number}` : ''} ${locationValue.neighborhood ? `/ ${locationValue.neighborhood}` : ''} ${locationValue.locality ? `/ ${locationValue.locality}` : ''}` : ""
            };

            const postSell = await postSells(sellBody);

            if ('error' in postSell) {
                return handleError(postSell);
            }

            await resetAfterPost();

            navigate('succesMessageScreen', {
                redirection: 'SellsRestaurantNavigation',
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

    const getMoreProductsFromBag = async () => {
        if (isLoadingData || !hasMore) return;

        try {
            setIsLoadingData(true);
            const newBags = await getBagInventory({ page, limit: 5, option: opcion });


            if (newBags.error) {
                handleError(newBags.error);
                return;
            }

            if (newBags && newBags.length > 0) {
                setBags((prevBags: ProductSellsRestaurantInterface[]) => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            handleError(error);
        } finally {
            setIsLoadingData(false);
        };
    };

    const getBagInitial = async () => {
        try {
            setIsLoadingData(true);
            const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: opcion });

            if (refreshedBags.error) {
                handleError(refreshedBags.error);
                return;
            }

            setBags(refreshedBags);

        } catch (error) {
            handleError(error);
        } finally {
            setPage(2);
            setIsLoadingData(false);
            setHasMore(true);
            setDataUploaded(true)
        }
    };

    const handleGetPrice = async () => {

        try {
            const totalprice = await getTotalPriceBag({ opcion: opcion });
            if (totalprice.error) return handleError(totalprice.error);
            setTotalPrice(parseFloat(totalprice))
        } catch (error) {
            handleError(error);
        }
    }

    const handleGoToEditLocation = () => {
        navigate('[SellsRestaurants] - EditLocation', { locationValue: locationValue })
    };

    const renderItem = useCallback(({ item }: { item: ProductSellsRestaurantInterface }) => {
        return (
            <ProductSellsCard
                product={item}
                onClick={() => navigate('[SellsRestaurants] - EditProductInBag', { product: item })}
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
                                methodPayment === 1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === 1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(1)}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                methodPayment === 2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === 2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setMethodPayment(2)}
                        >
                            <Icon name='cash-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Contado</CustomText>
                        </TouchableOpacity>
                    </View>

                    {/* <CardButton
                        onPress={handleGoToEditLocation}
                        label='Ubicación'
                        valueDefault='Seleccionar el cliente'
                        color='black'
                        icon='location'
                        specialValue={
                            locationValue
                                ? `${locationValue.street.trim()} ${locationValue.number ? `- ${locationValue.number}` : ''} ${locationValue.neighborhood ? `/ ${locationValue.neighborhood}` : ''} ${locationValue.locality ? `/ ${locationValue.locality}` : ''}`
                                : undefined
                        }
                    /> */}

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
        }, [])
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