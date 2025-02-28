import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomHeader } from '../components/UI/CustomHeader';

// Screens
import CustomTabBar from '../components/Navigation/CustomTabBar';
import { ProductSellsRestaurantInterface } from '../interface/productSells';
import { SellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantScreen';
import { ProductDetailsSellsRestaurants } from '../screens/SellsRestaurants/ProductDetailsSellsRestaurants';
import { SelectAmountRestaurantScreen } from '../screens/SellsRestaurants/SelectAmountRestaurantScreen';
import { SellsRestaurantBagScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/SellsRestaurantsBagScreen';
import { ConfirmationSellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/ConfirmationSellsRestaurantScreen';
import { EditProductSellRestaurantInBag } from '../screens/SellsRestaurants/SellsRestaurantsBag/EditProductSellRestaurantInBag';
import { LocationScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/LocationScreen';
import { CommentsInProduct } from '../screens/SellsRestaurants/CommentsInProduct';
import ShimpentScreen from '../screens/SellsRestaurants/SellsRestaurantsBag/ShimpentScreen';
import { SelectRestaurantClassScreen } from '../screens/SellsRestaurants/SelectRestaurantClassScreen';

// Definición de tipos para la navegación
export type SellsRestaurantsNavigationStackParamList = {
    SellsRestaurantsScreen: undefined;
    SellsRestaurantsDataScreen: undefined;
    BagSellsRestaurantsScreen: undefined;

    "[SellsRestaurants] - EditProductInBag": { product: ProductSellsRestaurantInterface };
    "[SellsRestaurants] - EditLocation": { locationValue?: any };
    "[SellsRestaurants] - EditShipment": undefined;
    "[SellsRestaurants] - ClassScreen": { valueDefault?: number, cvefamilia: string };
    "[SellsRestaurants] - CommentInProduct": { comments: string };
    "[SellsRestaurants] - PiecesScreen": { valueDefault: string, unit?: string, from: string };
    "[SellsRestaurants] - ConfirmationScreen": { addressDirection?: any, methodShipment?: 1 | 2 | 3 | 4 };
};

const Stack = createNativeStackNavigator<SellsRestaurantsNavigationStackParamList>();

export const SellsRestaurantsNavigation = () => {
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
                    header: (props) => (
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
                    header: (props) => (
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
                    header: (props) => (
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
                    header: (props) => (
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
                    headerShown: false,
                    //contentStyle: ModalScreenStyles().ModalScreen
                }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - ConfirmationScreen"
                component={ConfirmationSellsRestaurantScreen}
                options={({ navigation }) => ({
                    header: (props) => (
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
