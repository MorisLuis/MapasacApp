import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CustomHeader } from '../components/UI/CustomHeader';

// Screens
import CustomTabBar from '../components/Navigation/CustomTabBar';
import { SellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantScreen';
import { ProductDetailsSellsRestaurants } from '../screens/SellsRestaurants/ProductDetailsSellsRestaurants';
import { SelectAmountRestaurantScreen } from '../screens/SellsRestaurants/SelectAmountRestaurantScreen';
import { SellsRestaurantBagScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/SellsRestaurantsBagScreen';
import { ConfirmationSellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/ConfirmationSellsRestaurantScreen';
import { EditProductSellRestaurantInBag } from '../screens/SellsRestaurants/SellsRestaurantsBag/EditProductSellRestaurantInBag';
import { LocationScreen, LocationValue } from '../screens/SellsRestaurants/SellsRestaurantsBag/LocationScreen';
import { CommentsInProductSellsRestaurants } from '../screens/SellsRestaurants/CommentsInProduct';
import ShimpentScreen, { shimpentMethodInterface } from '../screens/SellsRestaurants/SellsRestaurantsBag/ShimpentScreen';
import { SelectRestaurantClassScreen } from '../screens/SellsRestaurants/SelectRestaurantClassScreen';
import { ProductSellsRestaurantInterface } from '../interface';
import ClassInterface from '../interface/class';

// Definición de tipos para la navegación
export type SellsRestaurantsNavigationStackParamList = {
    SellsRestaurantsScreen: undefined;
    BagSellsRestaurantsScreen: undefined;

    "[SellsRestaurants] - SellsRestaurantsDetailsScreen": {
        classValue?: ClassInterface,
        cvefamilia?: number,
        descripcio?: string,
        image: string,
        totalClasses: number

        price: number,
        capa?: string,
        typeClass: { id: number, value: string },
        units: number,
        idinvearts: number
    },
    "[SellsRestaurants] - ClassScreen": {
        classValue?: ClassInterface,
        cvefamilia?: number,
        descripcio: string,
        totalClasses: number,
        image: string
    };
    "[SellsRestaurants] - PiecesScreen": { valueDefault: string, unit?: string, from: string };
    "[SellsRestaurants] - EditProductInBag": { product: ProductSellsRestaurantInterface };

    "[SellsRestaurants] - ConfirmationScreen": {
        locationValue?: LocationValue,
        shipmentMethod?: shimpentMethodInterface['id']
    };
    "[SellsRestaurants] - EditLocation": { locationValue?: LocationValue; };
    "[SellsRestaurants] - EditShipment": { shipmentMethod?: shimpentMethodInterface['id']; };
    "[SellsRestaurants] - CommentInProduct": { comments: string };
};

const Stack = createNativeStackNavigator<SellsRestaurantsNavigationStackParamList>();

export const SellsRestaurantsNavigation = (): React.ReactElement => {
    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="SellsRestaurantsScreen"
                component={SellsRestaurantScreen}
                options={{
                    header: () => <CustomTabBar Type='Sells-Restaurant' />
                }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - SellsRestaurantsDetailsScreen"
                component={ProductDetailsSellsRestaurants}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title=""
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="BagSellsRestaurantsScreen"
                component={SellsRestaurantBagScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title="Pedidos"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[SellsRestaurants] - PiecesScreen"
                component={SelectAmountRestaurantScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title="Cantidad"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[SellsRestaurants] - ClassScreen"
                component={SelectRestaurantClassScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title="Clase"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[SellsRestaurants] - EditProductInBag"
                component={EditProductSellRestaurantInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - CommentInProduct"
                component={CommentsInProductSellsRestaurants}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - EditLocation"
                component={LocationScreen}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - EditShipment"
                component={ShimpentScreen}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - ConfirmationScreen"
                component={ConfirmationSellsRestaurantScreen}
                options={({ navigation }) => ({
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title="Confirmación"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />
        </>
    ), []);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
