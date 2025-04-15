import React from 'react';
import { View } from 'react-native';
import {
    MaterialTopTabBarProps,
    MaterialTopTabNavigationProp,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { globalStyles } from '../theme/appTheme';

import { Inventory } from '../screens/Inventory/Camera/Inventory';
import CameraScreen from '../screens/Inventory/Camera/CameraScreen';
import CustumNavigationInventory from '../components/Navigation/CustumNavigationInventory';

export type ScannerNavigationStackParamList = {
    "[ScannerNavigation] - camera": undefined;
    "[ScannerNavigation] - inventory": undefined;
};

// Definí los props de ScannerNavigation con el parámetro opcional "screen"
type ScannerNavigationProps = {
    route: {
        params?: {
            screen?: keyof ScannerNavigationStackParamList;
        }
    }
};

export const ScannerNavigation = ({ route }: ScannerNavigationProps): React.ReactElement => {
    const TopTabs = createMaterialTopTabNavigator<ScannerNavigationStackParamList>();
    const initialScreen = route.params?.screen || '[ScannerNavigation] - camera';

    return (
        <View style={globalStyles().flex}>
            <TopTabs.Navigator
                tabBar={(props: MaterialTopTabBarProps) => {
                    const typedNavigation = props.navigation as unknown as MaterialTopTabNavigationProp<ScannerNavigationStackParamList>;
                    return (
                        <CustumNavigationInventory
                            navigation={typedNavigation}
                            absolute={true}
                        />
                    );
                }}
                initialRouteName={initialScreen}
            >
                <TopTabs.Screen
                    name="[ScannerNavigation] - camera"
                    options={{ title: "Camara" }}
                    component={CameraScreen}
                />
                <TopTabs.Screen
                    name="[ScannerNavigation] - inventory"
                    options={{ title: "Inventario" }}
                    component={Inventory}
                />
            </TopTabs.Navigator>
        </View>
    );
};


/* 
import React from 'react';
import { View } from 'react-native';
import {
    MaterialTopTabBarProps,
    MaterialTopTabNavigationProp,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { globalStyles } from '../theme/appTheme';

import { Inventory } from '../screens/Inventory/Camera/Inventory';
import CameraScreen from '../screens/Inventory/Camera/CameraScreen';
import CustumNavigationInventory from '../components/Navigation/CustumNavigationInventory';

export type ScannerNavigationStackParamList = {
    "[ScannerNavigation] - camera": undefined;
    "[ScannerNavigation] - inventory": undefined;
};

// Definí los props de ScannerNavigation con el parámetro opcional "screen"
type ScannerNavigationProps = {
    route: {
        params?: {
            screen?: keyof ScannerNavigationStackParamList;
        }
    }
};

export const ScannerNavigation = ({ route }: ScannerNavigationProps): React.ReactElement => {
    const TopTabs = createMaterialTopTabNavigator<ScannerNavigationStackParamList>();
    const initialScreen = route.params?.screen || '[ScannerNavigation] - camera';

    return (
        <View style={globalStyles().flex}>
            <TopTabs.Navigator
                tabBar={(props: MaterialTopTabBarProps) => {
                    const typedNavigation = props.navigation as unknown as MaterialTopTabNavigationProp<ScannerNavigationStackParamList>;

                    // Obtener el nombre de la pantalla activa
                    const currentRouteName = props.state.routeNames[props.state.index];

                    // Setear `absolute` dependiendo de la pantalla
                    const isCameraScreen = currentRouteName === "[ScannerNavigation] - camera";

                    return (
                        <CustumNavigationInventory
                            navigation={typedNavigation}
                            absolute={isCameraScreen} // true solo en cámara
                        />
                    );
                }}
                initialRouteName={initialScreen}
            >
                <TopTabs.Screen
                    name="[ScannerNavigation] - camera"
                    options={{ title: "Camara" }}
                    component={CameraScreen}
                />
                <TopTabs.Screen
                    name="[ScannerNavigation] - inventory"
                    options={{ title: "Inventario" }}
                    component={Inventory}
                />
            </TopTabs.Navigator>

        </View>
    );
};

*/