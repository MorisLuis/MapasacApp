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

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppState>
        <AppNavigation />
      </AppState>
    </NavigationContainer>
  )
};

const AppState = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>

          {children}

        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
