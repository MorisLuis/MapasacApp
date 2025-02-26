import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { CombinedSellsAndInventoryNavigationStackParamList } from '../interface';

interface UseProtectPageProps {
    numberOfItems?: string;
    protectionCondition?: boolean;
    loading?: boolean;
    navigatePage: keyof CombinedSellsAndInventoryNavigationStackParamList | 'back';
}

export const useProtectPage = ({
    numberOfItems,
    protectionCondition,
    loading,
    navigatePage
}: UseProtectPageProps) => {
    const { navigate, canGoBack } = useNavigation<any>();

    const protectThisPage = numberOfItems && parseFloat(numberOfItems) <= 0 && !loading;
    const protectThisPage2 = protectionCondition;

    useFocusEffect(
        useCallback(() => {
            const checkAccess = async () => {
                if (navigatePage === 'back') {
                    return canGoBack() ? canGoBack() : navigate('OnboardingScreen');
                }

                if (protectThisPage || protectThisPage2) {
                    return navigate(navigatePage);
                }
            };
            checkAccess();
        }, [protectThisPage, protectThisPage2, navigatePage, navigate, canGoBack])
    );

    return {
        protectThisPage: protectThisPage || protectThisPage2,
    };
};
