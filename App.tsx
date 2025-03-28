/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactNode, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigator/AppNavigation';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { ShowToastMessage } from './src/components/UI/ToastMesage';
import { SellsRestaurantsProvider } from './src/context/SellsRestaurants/SellsRestaurantsBagProvider';
import { SellsProvider } from './src/context/Sells/SellsBagProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import 'react-native-gesture-handler';
import { setUnauthorizedHandler } from './src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef, resetToLogin } from './src/hooks/useResetToLogin';

const App = () => {

  // Configuramos el callback para 401
  useEffect(() => {
    setUnauthorizedHandler(async () => {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      resetToLogin();
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppState>
        <AppNavigation />
      </AppState>
      <ShowToastMessage />
    </NavigationContainer>
  );
};

const AppState = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>
          <SellsRestaurantsProvider>
            <SellsProvider>
              <InventoryProvider>
                {children}
              </InventoryProvider>
            </SellsProvider>
          </SellsRestaurantsProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
