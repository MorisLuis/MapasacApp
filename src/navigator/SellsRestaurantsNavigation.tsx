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
import { CommentsInProduct } from '../screens/SellsRestaurants/CommentsInProduct';
import ShimpentScreen from '../screens/SellsRestaurants/SellsRestaurantsBag/ShimpentScreen';
import { SelectRestaurantClassScreen } from '../screens/SellsRestaurants/SelectRestaurantClassScreen';
import { ProductSellsRestaurantInterface, TypeEnvio } from '../interface';

// Definición de tipos para la navegación
export type SellsRestaurantsNavigationStackParamList = {
    SellsRestaurantsScreen: undefined;
    SellsRestaurantsDataScreen: undefined;
    BagSellsRestaurantsScreen: undefined;

    "[SellsRestaurants] - EditProductInBag": { product: ProductSellsRestaurantInterface };
    "[SellsRestaurants] - EditLocation": { locationValue?: LocationValue };
    "[SellsRestaurants] - EditShipment": undefined;
    "[SellsRestaurants] - ClassScreen": { valueDefault?: number, cvefamilia: number };
    "[SellsRestaurants] - CommentInProduct": { comments: string };
    "[SellsRestaurants] - PiecesScreen": { valueDefault: string, unit?: string, from: string };
    "[SellsRestaurants] - ConfirmationScreen": { addressDirection?: LocationValue, methodShipment?: TypeEnvio };
};

const Stack = createNativeStackNavigator<SellsRestaurantsNavigationStackParamList>();

export const SellsRestaurantsNavigation = () : React.ReactElement => {
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
                name="SellsRestaurantsDataScreen"
                component={ProductDetailsSellsRestaurants}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props) : React.ReactElement  => (
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
                    header: (props) : React.ReactElement  => (
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
                    header: (props) : React.ReactElement  => (
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
                    header: (props) : React.ReactElement  => (
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
                component={CommentsInProduct}
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
                    header: (props) : React.ReactElement  => (
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
