/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactNode } from 'react';
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

const App = () => {
  return (
    <NavigationContainer>
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
