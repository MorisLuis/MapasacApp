import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { globalFont } from '../../../theme/appTheme';
import { useTheme } from '../../../context/ThemeContext';
import { getBagInventory } from '../../../services/bag/bag';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import CustomText from '../../../components/UI/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { CombinedProductInterface, CombinedSellsAndAppNavigationStackParamList, ProductSellsRestaurantInterface } from '../../../interface';
import { SellsRestaurantBagContext } from '../../../context/SellsRestaurants/SellsRestaurantsBagContext';
import useActionsForModules from '../../../hooks/useActionsForModules';
import { postSellsRestaurant } from '../../../services';
import { shimpentOptions, shimpentMethodInterface } from './ShimpentScreen';
import ProductConfirmationCard from '../../../components/Cards/ProductCard/ProductConfirmationCard';
import { LocationValue } from './LocationScreen';
import { postSellsRestaurantParams } from '../../../services/inveart/inveart.interface';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ConfirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
};

export interface ConfirmationSellsRestaurantFormInterface {
    methodPayment: number;
    locationValue?: LocationValue;
    methodEnvio?: shimpentMethodInterface['id']
}

const METHOD_PAYMENT_1 = 1;
const METHOD_PAYMENT_2 = 2;

export const ConfirmationSellsRestaurantScreen = ({ route }: ConfirmationSellsScreenInterface): React.ReactElement => {

    const { locationValue, shipmentMethod } = route?.params ?? {};

    const { numberOfItemsSellsRestaurant, resetBagAfterSaleRestaurants, productAdded, sumPriceOfItemsSellsRestaurant } = useContext(SellsRestaurantBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleColorWithModule } = useActionsForModules()
    const [createSellLoading, setCreateSellLoading] = useState(false);

    const [confirmationSellsRestaurantForm, setConfirmationSellsRestaurantForm] = useState<ConfirmationSellsRestaurantFormInterface>({
        locationValue: undefined,
        methodPayment: 1,
        methodEnvio: 1
    });

    const availableToPost = (confirmationSellsRestaurantForm.methodPayment && confirmationSellsRestaurantForm.methodEnvio && confirmationSellsRestaurantForm.locationValue) ? true : false;

    const handlePostSellsRestaurant = async (): Promise<void> => {
    
        setCreateSellLoading(true);
        const sellBody: postSellsRestaurantParams = {
            clavepago: confirmationSellsRestaurantForm.methodPayment,
            idviaenvio: confirmationSellsRestaurantForm.methodEnvio,
            domicilio: `${confirmationSellsRestaurantForm.locationValue?.locality} / ${confirmationSellsRestaurantForm.locationValue?.neighborhood} / ${confirmationSellsRestaurantForm.locationValue?.number} / ${confirmationSellsRestaurantForm.locationValue?.street}` 
        };

        const { folio } = await postSellsRestaurant(sellBody);

        navigate('succesMessageScreen', {
            redirection: 'SellsRestaurantNavigation',
            from: 'Sells',
            numberOfProducts: numberOfItemsSellsRestaurant,
            importe: sumPriceOfItemsSellsRestaurant,
            folio: folio
        });

        await resetBagAfterSaleRestaurants();
        setCreateSellLoading(false);
    };

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

    const renderHeader = (): React.ReactElement => {
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
                                confirmationSellsRestaurantForm.methodPayment === METHOD_PAYMENT_1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, confirmationSellsRestaurantForm.methodPayment === METHOD_PAYMENT_1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setConfirmationSellsRestaurantForm((prev) => ({ ...prev, methodPayment: METHOD_PAYMENT_1 }))}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                confirmationSellsRestaurantForm.methodPayment === METHOD_PAYMENT_2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                    ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, confirmationSellsRestaurantForm.methodPayment === METHOD_PAYMENT_2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => setConfirmationSellsRestaurantForm((prev) => ({ ...prev, methodPayment: METHOD_PAYMENT_2 }))}
                        >
                            <Icon name='cash-sharp' color={theme.text_color} size={globalFont.font_normal} />
                            <CustomText>Contado</CustomText>
                        </TouchableOpacity>
                    </View>

                    <CardButton
                        onPress={() => navigate('[SellsRestaurants] - EditShipment', { shipmentMethod: confirmationSellsRestaurantForm.methodEnvio, setConfirmationSellsRestaurantForm })}
                        label='Tipo de envio'
                        valueDefault='Seleccionar el envio'
                        color='black'
                        icon='send'
                        specialValue={
                            confirmationSellsRestaurantForm.methodEnvio ? shimpentOptions.find((item) => confirmationSellsRestaurantForm.methodEnvio === item.id)?.value : undefined
                        }
                    />

                    <CardButton
                        onPress={() => navigate('[SellsRestaurants] - EditLocation', { locationValue: confirmationSellsRestaurantForm.locationValue, setConfirmationSellsRestaurantForm })}
                        label='Ubicación'
                        valueDefault='Seleccionar la ubicación'
                        color='black'
                        icon='send'
                        specialValue={
                            confirmationSellsRestaurantForm.locationValue ? `${confirmationSellsRestaurantForm.locationValue.street} / ${confirmationSellsRestaurantForm.locationValue.locality}` : undefined
                        }
                    />

                </View>
            </SafeAreaView>
        )
    };

    // Handle address direction.
    useEffect(() => {
        if (locationValue) setConfirmationSellsRestaurantForm((prev) => ({ ...prev, locationValue: locationValue }));
        if (shipmentMethod) setConfirmationSellsRestaurantForm((prev) => ({ ...prev, methodEnvio: shipmentMethod }))

    }, [shipmentMethod, locationValue]);

    return (
        <LayoutConfirmation
            option={4}
            queryFn={getBagInventory}
            queryKey={['confirmation', 'sells-restaurant']}

            renderItem={renderItem}
            renderHeaderExtra={renderHeader}
            type='Sells'

            onPost={handlePostSellsRestaurant}
            availableToPost={availableToPost}
            buttonPostDisabled={createSellLoading}
            numberOfItems={numberOfItemsSellsRestaurant}
            productAdded={productAdded}
        />
    )
};