import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { globalFont, globalStyles } from '../../../theme/appTheme';
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
import { useTheme } from '../../../hooks/styles/useTheme';

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

    const { numberOfItemsSellsRestaurant, resetBagAfterSaleRestaurants, productAdded, sumPriceOfItemsSellsRestaurant, confirmationForm, updateConfirmationForm } = useContext(SellsRestaurantBagContext);
    const { typeTheme, theme, size } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleColorWithModule } = useActionsForModules()
    const [createSellLoading, setCreateSellLoading] = useState(false);


    const availableToPost = (confirmationForm.methodPayment && confirmationForm.methodEnvio && confirmationForm.locationValue) ? true : false;

    const handlePostSellsRestaurant = async (): Promise<void> => {

        setCreateSellLoading(true);
        const sellBody: postSellsRestaurantParams = {
            clavepago: confirmationForm.methodPayment,
            idviaenvio: confirmationForm.methodEnvio,
            domicilio: `${confirmationForm.locationValue?.locality} / ${confirmationForm.locationValue?.neighborhood} / ${confirmationForm.locationValue?.number} / ${confirmationForm.locationValue?.street}`
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
                        <Icon name='open-outline' color={theme.text_color} size={globalFont(size).font_normal} />
                    )
                }}
            />
        )
    }, [theme.text_color, navigate, size]);

    const renderHeader = (): React.ReactElement => {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }}>
                <View style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation}>
                    <Icon name='card-sharp' color={theme.color_red} size={globalFont(size).font_normal} />
                    <CustomText style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation_text}>Forma de pago</CustomText>
                </View>

                <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodContainer}>
                    <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).typeMethodContainer}>
                        <TouchableOpacity
                            style={[
                                confirmationForm.methodPayment === METHOD_PAYMENT_1 ? ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItemActive :
                                    ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItem, confirmationForm.methodPayment === METHOD_PAYMENT_1 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => updateConfirmationForm({ methodPayment: METHOD_PAYMENT_1 })}
                        >
                            <Icon name='card-sharp' color={theme.text_color} size={globalFont(size).font_normal} />
                            <CustomText>Credito</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                confirmationForm.methodPayment === METHOD_PAYMENT_2 ? ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItemActive :
                                    ConfirmationScreenStyles({ theme, typeTheme, size }).paymentMethodItem, confirmationForm.methodPayment === METHOD_PAYMENT_2 && { backgroundColor: handleColorWithModule.primary }
                            ]}
                            onPress={() => updateConfirmationForm({ methodPayment: METHOD_PAYMENT_2 })}
                        >
                            <Icon name='cash-sharp' color={theme.text_color} size={globalFont(size).font_normal} />
                            <CustomText>Contado</CustomText>
                        </TouchableOpacity>
                    </View>

                    <CardButton
                        onPress={() => navigate('[SellsRestaurants] - EditShipment', { shipmentMethod: confirmationForm.methodEnvio })}
                        label='Tipo de envio'
                        valueDefault='Seleccionar el envio'
                        color='black'
                        icon='send'
                        specialValue={
                            confirmationForm.methodEnvio ? shimpentOptions.find((item) => confirmationForm.methodEnvio === item.id)?.value : undefined
                        }
                    />

                    <CardButton
                        onPress={() => navigate('[SellsRestaurants] - EditLocation', { locationValue: confirmationForm.locationValue })}
                        label='Ubicación'
                        valueDefault='Seleccionar la ubicación'
                        color='black'
                        icon='send'
                        specialValue={
                            confirmationForm.locationValue ? `${confirmationForm.locationValue.street} / ${confirmationForm.locationValue.locality}` : undefined
                        }
                    />

                </View>
            </SafeAreaView>
        )
    };

    // Handle address direction.
    useEffect(() => {
        if (locationValue) updateConfirmationForm({ locationValue: locationValue });
        if (shipmentMethod) updateConfirmationForm({ methodEnvio: shipmentMethod })

    }, [updateConfirmationForm, shipmentMethod, locationValue]);

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