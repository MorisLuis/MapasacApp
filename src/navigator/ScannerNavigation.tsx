import React from 'react';
import { View } from 'react-native';
import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Inventory } from '../screens/Inventory/Camera/Inventory';
import CameraScreen from '../screens/Inventory/Camera/CameraScreen';
import CustumNavigationInventory from '../components/Navigation/CustumNavigationInventory';

export type ScannerNavigationStackParamList = {
    "[ScannerNavigation] - camera": undefined,
    "[ScannerNavigation] - inventory": undefined;
};

export const ScannerNavigation = ({ route }: any) => {

    const TopTabs = createMaterialTopTabNavigator<ScannerNavigationStackParamList>();
    const initialScreen = route?.params?.screen || '[ScannerNavigation] - camera';

    return (
        <View style={{ flex: 1 }} >
            <TopTabs.Navigator
                tabBar={
                    (props: MaterialTopTabBarProps) =>
                        <CustumNavigationInventory
                            state={props.state}
                            descriptors={props.descriptors}
                            navigation={props.navigation}
                            absolute={true}
                        />
                }
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