// NavigationService.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';

export const navigationRef = createNavigationContainerRef<AppNavigationStackParamList>();

export function resetToLogin() {
    if (navigationRef.isReady()) {
        navigationRef.navigate('LoginPage')
    }
}
