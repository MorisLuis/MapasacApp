import { createContext } from 'react';

import { Theme, lightTheme } from '../../theme/appTheme';
import { ThemeColor } from './ThemeProvider';
import { NUMBER_0 } from '../../utils/globalConstants';

export interface ContextProps {
    theme: Theme;
    typeTheme: ThemeColor;
    toggleTheme: () => void;
    size:  (_value: string) => number;
}

// Crear el contexto con un valor inicial
export const ThemeContext = createContext<ContextProps>({
    theme: lightTheme,
    typeTheme: 'light',
    toggleTheme: () => { },
    size: () => NUMBER_0
} as ContextProps );

