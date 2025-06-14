import React, { useContext, useMemo } from 'react';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { SearchProductScreen } from '../screens/Inventory/SearchProductScreen';
import { SearchCodebarWithInput } from '../screens/Inventory/Modals/SearchCodebarWithInput';
import ScannerResult from '../screens/Inventory/Modals/ScannerResult';
import { ProductsFindByCodeBar } from '../screens/Inventory/Modals/ProductsFindByCodeBar';
import { ConfirmationScreen } from '../screens/Inventory/InventoryBag/ConfirmationScreen';
import { EditProductInBag } from '../screens/Inventory/Modals/EditProductInBag';
import { ScannerNavigation } from './ScannerNavigation';
import { ProductDetailsPageEdit } from '../screens/Inventory/ProductDetailsPageEdit';
import { EditPrice } from '../screens/Inventory/Modals/EditPrice';
import { EditDescripcio } from '../screens/Inventory/Modals/EditDescripcio';
import { InventoryBagScreen } from '../screens/Inventory/InventoryBag/InventoryBagScreen';
import { ProductDetailsPage } from '../screens/Inventory/ProductDetailsPage';
import { ProductInterface } from '../interface';
import { HeaderConfirmacion, HeaderInventario, HeaderInventoryDetails, HeaderProductDetails, HeaderProductDetailsEdit, HeaderProductScreen } from './InventoryNavigationHeaders';


export type InventoryNavigationStackParamList = {
    // Navigation
    CodebarUpdateNavigation: { selectedProduct: { idinvearts: number } }
    ScannerNavigation: undefined;

    // Screens
    "[ProductDetailsPage] - inventoryDetailsScreen": { selectedProduct: ProductInterface, fromModal: boolean };
    "[ProductDetailsPage] - productDetailsScreen": { selectedProduct: ProductInterface, fromModal: boolean };
    "[ProductDetailsPage] - productDetailsScreenEdit": { product: { idinvearts: number } };
    "[ProductDetailsPage] - editPrice": { product: ProductInterface };
    "[ProductDetailsPage] - editDescripcio": { product: ProductInterface };

    bagInventoryScreen: undefined;
    confirmationScreen: { updated?: boolean };
    searchProductScreen: { modal?: boolean };

    // Modal
    "[Modal] - scannerResultScreen": { product: ProductInterface, fromProductDetails: boolean },
    "[Modal] - findByCodebarInputModal": undefined;
    "[Modal] - searchProductModal": { modal: boolean };
    "[Modal] - productsFindByCodeBarModal": { products: ProductInterface[] };
    "[Modal] - editProductInBag": { product: ProductInterface };
};

const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

const commonOptions: NativeStackNavigationOptions = {
    headerBackTitle: 'Atrás',
    headerTitleAlign: 'center',
};

export const InventoryNavigation = (): React.ReactElement => {

    const { updateBarCode } = useContext(SettingsContext);

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="ScannerNavigation"
                component={ScannerNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CodebarUpdateNavigation"
                component={CodebarUpdateNavigation}
                options={{ presentation: "modal", headerShown: false }}
            />

            <Stack.Screen
                name="bagInventoryScreen"
                component={InventoryBagScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (headerProps) : React.ReactNode => <HeaderInventario navigation={navigation} props={headerProps} />
                })}
            />

            <Stack.Screen
                name="confirmationScreen"
                component={ConfirmationScreen}
                options={({ navigation }) => ({
                    header: (headerProps): React.ReactNode => <HeaderConfirmacion navigation={navigation} props={headerProps} />
                })}
            />

            <Stack.Screen
                name="searchProductScreen"
                component={SearchProductScreen}
                options={({ navigation }) => ({
                    header: (headerProps) : React.ReactNode => <HeaderProductScreen navigation={navigation} props={headerProps} updateBarCode={updateBarCode} />
                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - inventoryDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation }) => ({
                    header: (headerProps): React.ReactNode => <HeaderInventoryDetails navigation={navigation} props={headerProps} updateBarCode={updateBarCode} />
                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - productDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation, route }) => ({
                    presentation: "modal",
                    header: (headerProps) : React.ReactNode=> <HeaderProductDetails navigation={navigation} props={headerProps} updateBarCode={updateBarCode} route={route} />

                })}
            />
            <Stack.Screen
                name="[ProductDetailsPage] - productDetailsScreenEdit"
                component={ProductDetailsPageEdit}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: (headerProps) : React.ReactNode=> <HeaderProductDetailsEdit navigation={navigation} props={headerProps} />

                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - editPrice"
                component={EditPrice}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - editDescripcio"
                component={EditDescripcio}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            {/* modals */}
            <Stack.Screen
                name="[Modal] - scannerResultScreen"
                component={ScannerResult}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - findByCodebarInputModal"
                component={SearchCodebarWithInput}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - searchProductModal"
                component={SearchProductScreen}
                options={{
                    presentation: "modal",
                    headerTitle: "Buscar Producto",
                    ...commonOptions
                }}
            />
            <Stack.Screen
                name="[Modal] - productsFindByCodeBarModal"
                component={ProductsFindByCodeBar}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - editProductInBag"
                component={EditProductInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
        </>
    ), [updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
