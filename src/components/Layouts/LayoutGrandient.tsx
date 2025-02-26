import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import useActionsForModules from '../../hooks/useActionsForModules';
import { SettingsContext } from '../../context/settings/SettingsContext';

interface LayoutGrandientInterface {
    children: React.ReactNode;
    color: 'green' | 'purple' | 'red';
    locations?: number[]
}

const LayoutGrandient = ({ children, color, locations }: LayoutGrandientInterface) => {

    const { theme, typeTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules()
    const { actualModule } = useContext(SettingsContext);

    const handleBackgroundColor = () => {
        let rgbColor;
        if( actualModule === 'Inventory'){
            rgbColor = hexToRgb(adjustColor(handleColorWithModule.primary, 100));
        } else {
            rgbColor = hexToRgb(adjustColor(handleColorWithModule.primary, 0));
        }
        const rgbaColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`
        const colorReturned = typeTheme === 'dark' ? theme.background_color : rgbaColor
        return colorReturned;
    };

    return (
        <LinearGradient
            colors={[handleBackgroundColor(), theme.background_color]}
            locations={locations ?? [0, 0.5]}
        >
            {children}
        </LinearGradient>
    );
};

export default LayoutGrandient;




// Función para ajustar la luminosidad de un color hexadecimal
const adjustColor = (hex: string, amount: number) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Función para convertir hex a rgb
const hexToRgb = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};
