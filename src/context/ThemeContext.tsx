import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Theme, darkTheme, lightTheme } from '../theme/appTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useErrorHandler from '../hooks/useErrorHandler';

// Tipos de Theme y color (light/dark)
export type ThemeColor = 'dark' | 'light';

interface ContextProps {
    theme: Theme;
    typeTheme: ThemeColor;
    toggleTheme: () => void;
}

// Crear el contexto con un valor inicial
const ThemeContext = createContext<ContextProps>({
    theme: lightTheme,
    typeTheme: 'light',
    toggleTheme: () => { },
});

type ThemeAction =
    | { type: 'SET_THEME'; payload: { theme: Theme; typeTheme: ThemeColor } }
    | { type: 'TOGGLE_THEME' };

interface ThemeState {
    theme: Theme;
    typeTheme: ThemeColor;
}

// Reducer para manejar las acciones de tema
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload.theme,
                typeTheme: action.payload.typeTheme,
            };
        case 'TOGGLE_THEME':
            const newTheme = state.theme === lightTheme ? darkTheme : lightTheme;
            const newTypeTheme = state.typeTheme === 'light' ? 'dark' : 'light';
            return {
                ...state,
                theme: newTheme,
                typeTheme: newTypeTheme,
            };
        default:
            return state;
    }
};

// Proveedor de Tema
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorHandler();

    const [state, dispatch] = useReducer(themeReducer, {
        theme: lightTheme,
        typeTheme: 'light',
    });

    // Cargar el tema de AsyncStorage al iniciar
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme') as ThemeColor;
                if (storedTheme) {
                    dispatch({
                        type: 'SET_THEME',
                        payload: {
                            theme: storedTheme === 'dark' ? darkTheme : lightTheme,
                            typeTheme: storedTheme,
                        },
                    });
                }
            } catch (error) {
                handleError(error);
            }
        };

        loadTheme();
    }, []);

    // Alternar el tema entre light y dark
    const toggleTheme = async () => {
        try {
            const newTypeTheme = state.typeTheme === 'light' ? 'dark' : 'light';
            dispatch({ type: 'TOGGLE_THEME' });
            await AsyncStorage.setItem('theme', newTypeTheme);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <ThemeContext.Provider value={{
            theme: state.theme,
            typeTheme: state.typeTheme,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook para acceder al tema
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe ser usado dentro de ThemeProvider');
    }
    return context;
};
