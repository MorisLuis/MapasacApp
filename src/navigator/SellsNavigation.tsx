import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomHeader } from '../components/UI/CustomHeader';

// Screens
import { SelectClassScreen } from '../screens/Sells/SelectClassScreen';
import { SellsScreen } from '../screens/Sells/SellsScreen';
import { ProductDetailsSells } from '../screens/Sells/ProductDetailsSells';
import { SelectAmountScreen } from '../screens/Sells/SelectAmountScreen';
import { SelectUnitScreen } from '../screens/Sells/SelectUnitsScreen';
import { SellsBagScreen } from '../screens/Sells/SellsBag/SellsBagScreen';
import { ConfirmationSellsScreen } from '../screens/Sells/SellsBag/ConfirmationSellsScreen';
import { EditProductSellInBag } from '../screens/Sells/SellsBag/EditProductSellInBag';
import { SelectClient } from '../screens/Sells/SellsBag/SelectClient';
import CustomTabBar from '../components/Navigation/CustomTabBar';
import { UnitType } from '../interface/navigation';
import { ClientInterface, ProductSellsInterface } from '../interface';
import { CommentsInSell } from '../screens/Sells/CommentsInProduct';
import ClassInterface from '../interface/class';

// useNavigation() type.
export type SellsNavigationStackParamList = {
    SellsScreen: undefined;
    BagSellsScreen: undefined;

    '[Sells] - SellsProductDetails': { 
        classValue?: ClassInterface; 
        cvefamilia: number; 
        descripcio: string; 
        image: string;
        totalClasses: number
    };
    "[Sells] - ClassScreen": { 
        classValue?: ClassInterface, 
        cvefamilia: number, 
        descripcio: string, 
        totalClasses: number,
        image: string
    };
    "[Sells] - PiecesScreen": { valueDefault: string, unit?: string, from: 'price' | 'pieces' };
    "[Sells] - PriceScreen": { valueDefault: string, unit?: string, from: 'price' | 'pieces' };
    "[Sells] - UnitScreen": { valueDefault: UnitType };

    "[Sells] - EditProductInBag": { product: ProductSellsInterface };
    "[Sells] - SelectClient": undefined;
    "[Sells] - CommentInSell": { comments: string };
    "[Sells] - ConfirmationScreen": { client?: ClientInterface, comments?: string };
};

const Stack = createNativeStackNavigator<SellsNavigationStackParamList>();

export const SellsNavigation = (): React.ReactElement => {

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="SellsScreen"
                component={SellsScreen}
                options={() => ({
                    header: (): React.ReactElement => (
                        <CustomTabBar Type='Sells' />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - SellsProductDetails"
                component={ProductDetailsSells}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={""}
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="BagSellsScreen"
                component={SellsBagScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Pedidos"}
                            navigation={navigation}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - PiecesScreen"
                component={SelectAmountScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Cantidad"}
                            navigation={navigation}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - PriceScreen"
                component={SelectAmountScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Precio"}
                            navigation={navigation}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - UnitScreen"
                component={SelectUnitScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Clase"}
                            navigation={navigation}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - ClassScreen"
                component={SelectClassScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Clase"}
                            navigation={navigation}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - SelectClient"
                component={SelectClient}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Cliente"}
                            navigation={navigation}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[Sells] - EditProductInBag"
                component={EditProductSellInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name='[Sells] - CommentInSell'
                component={CommentsInSell}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name='[Sells] - ConfirmationScreen'
                component={ConfirmationSellsScreen}
                options={({ navigation }) => ({
                    header: (props): React.ReactElement => (
                        <CustomHeader
                            {...props}
                            title={"Confirmación"}
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
