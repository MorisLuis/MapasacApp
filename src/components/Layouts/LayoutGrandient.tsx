import React, { JSX, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import useActionsForModules from '../../hooks/useActionsForModules';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { NUMBER_0 } from '../../utils/globalConstants';
import { useTheme } from '../../hooks/styles/useTheme';

// Constantes para evitar "números mágicos"
const LIGHTNESS_INVENTORY = 100;
const LIGHTNESS_DEFAULT = 0;
const DEFAULT_ALPHA = 0.5;
const DEFAULT_LOCATIONS: number[] = [NUMBER_0, DEFAULT_ALPHA];

const HEX_RED_CHANNEL = 1;
const HEX_GREEN_CHANNEL = 3;
const HEX_BLUE_CHANNEL = 5;
const HEX_CHAR_LENGTH = 2;

const HEX_TOTAL_BITS = 24;
const HEX_RED_SHIFT = 16;
const HEX_GREEN_SHIFT = 8;
const HEX_BLUE_SHIFT = 0;

const MAX_RGB_VALUE = 255;
const MIN_RGB_VALUE = 0;
const HEX_BASE = 16;
const HEX_PREFIX = 1;

interface LayoutGrandientInterface {
    children: React.ReactNode;
    color: 'green' | 'purple' | 'red';
    locations?: number[];
}

const LayoutGrandient = ({ children, locations }: LayoutGrandientInterface): JSX.Element => {
    const { theme, typeTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules();
    const { actualModule } = useContext(SettingsContext);

    const handleBackgroundColor = (): string => {
        let rgbColor;
        if (actualModule === 'Inventory') {
            rgbColor = hexToRgb(adjustColor(handleColorWithModule.primary, LIGHTNESS_INVENTORY));
        } else {
            rgbColor = hexToRgb(adjustColor(handleColorWithModule.primary, LIGHTNESS_DEFAULT));
        }
        const rgbaColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${DEFAULT_ALPHA})`;
        return typeTheme === 'dark' ? theme.background_color : rgbaColor;
    };

    return (
        <LinearGradient
            colors={[handleBackgroundColor(), theme.background_color]}
            locations={locations ?? DEFAULT_LOCATIONS}
        >
                {children}
            </LinearGradient>
    );
};

export default LayoutGrandient;

// Función para ajustar la luminosidad de un color hexadecimal
const adjustColor = (hex: string, amount: number): string => {
    let r = parseInt(hex.slice(HEX_RED_CHANNEL, HEX_GREEN_CHANNEL), HEX_BASE);
    let g = parseInt(hex.slice(HEX_GREEN_CHANNEL, HEX_BLUE_CHANNEL), HEX_BASE);
    let b = parseInt(hex.slice(HEX_BLUE_CHANNEL, HEX_BLUE_CHANNEL + HEX_CHAR_LENGTH), HEX_BASE);

    r = Math.min(MAX_RGB_VALUE, Math.max(MIN_RGB_VALUE, r + amount));
    g = Math.min(MAX_RGB_VALUE, Math.max(MIN_RGB_VALUE, g + amount));
    b = Math.min(MAX_RGB_VALUE, Math.max(MIN_RGB_VALUE, b + amount));

    return `#${((HEX_PREFIX << HEX_TOTAL_BITS) + (r << HEX_RED_SHIFT) + (g << HEX_GREEN_SHIFT) + (b << HEX_BLUE_SHIFT))
        .toString(HEX_BASE)
        .slice(HEX_PREFIX)}`;
};

// Función para convertir hex a rgb
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const r = parseInt(hex.slice(HEX_RED_CHANNEL, HEX_GREEN_CHANNEL), HEX_BASE);
    const g = parseInt(hex.slice(HEX_GREEN_CHANNEL, HEX_BLUE_CHANNEL), HEX_BASE);
    const b = parseInt(hex.slice(HEX_BLUE_CHANNEL, HEX_BLUE_CHANNEL + HEX_CHAR_LENGTH), HEX_BASE);
    return { r, g, b };
};
