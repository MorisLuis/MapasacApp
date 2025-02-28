import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { InventoryNavigation } from './InventoryNavigation';
import { OnboardingScreen } from '../screens/Onboarding/Onboarding';
import { ProfileNavigation } from './ProfileNavigation';
import { SellsNavigation } from './SellsNavigation';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';
import { ClosingScreen } from '../screens/ClosingScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { LoadingScreen } from '../screens/LoadingScreen';
import { ModuleInterface } from '../interface/utils';
import { SessionExpiredScreen } from '../screens/SessionExpired';
import { SellsRestaurantsNavigation } from './SellsRestaurantsNavigation';

export type AppNavigationStackParamList = {
    //test: undefined;
    OnboardingScreen: undefined;
    ClosingPage: undefined;
    SessionExpiredScreen: undefined;
    LoadingPage?: { message?: string, loading?: boolean };

    // Login
    LoginPage: undefined;
    StartupScreen: undefined;

    // Navigation
    InventoryNavigation: undefined;
    ProfileNavigation: undefined;
    SellsNavigation: undefined;
    SellsRestaurantNavigation: undefined;

    succesMessageScreen: {
        redirection: keyof AppNavigationStackParamList,
        from: ModuleInterface['module'],
        numberOfProducts: string;
        importe?: number,
        folio?: string
    };
};

const Stack = createNativeStackNavigator<AppNavigationStackParamList>();

export const AppNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="StartupScreen"
                component={StartupScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='SessionExpiredScreen'
                component={SessionExpiredScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="LoginPage"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='LoadingPage'
                component={LoadingScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SellsNavigation"
                component={SellsNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='SellsRestaurantNavigation'
                component={SellsRestaurantsNavigation}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name="InventoryNavigation"
                component={InventoryNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ProfileNavigation"
                component={ProfileNavigation}
                options={{
                    headerShown: false,
                    presentation: "modal"
                }}
            />

            <Stack.Screen
                name="ClosingPage"
                component={ClosingScreen}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            />

            <Stack.Screen
                name="succesMessageScreen"
                component={SuccesMessage}
                options={{ headerShown: false }}
            />

        </>
    ), [handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
