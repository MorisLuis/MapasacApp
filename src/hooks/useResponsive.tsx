import { useWindowDimensions } from 'react-native';

const TABLET_BREAKPOINT = 768;

export const useResponsive = (): {
    width: number;
    height: number;
    isTablet: boolean;
    isLandscape: boolean;
    isPhone: boolean;
} => {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= TABLET_BREAKPOINT;
    const isLandscape = width > height;

    return {
        width,
        height,
        isTablet,
        isLandscape,
        isPhone: !isTablet,
    };
};
