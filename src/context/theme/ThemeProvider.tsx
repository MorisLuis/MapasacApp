import React, { JSX, useEffect, useMemo, useReducer } from "react";
import useErrorHandler from "../../hooks/useErrorHandler";
import { darkTheme, lightTheme } from "../../theme/appTheme";
import { themeReducer } from "./ThemeRedcuer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "./ThemeContext";
import { Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// Tipos de Theme y color (light/dark)
export type ThemeColor = 'dark' | 'light';


// Proveedor de Tema
export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {

    const { handleError } = useErrorHandler();

    const [state, dispatch] = useReducer(themeReducer, {
        theme: lightTheme,
        typeTheme: 'light',
    });

    // Alternar el tema entre light y dark
    const toggleTheme = async (): Promise<void> => {
        try {
            const newTypeTheme = state.typeTheme === 'light' ? 'dark' : 'light';
            dispatch({ type: 'TOGGLE_THEME' });
            await AsyncStorage.setItem('theme', newTypeTheme);
        } catch (error) {
            handleError(error);
        }
    };

    const size = useMemo(() => {
        const { width, height } = Dimensions.get('window');
        const isPortrait = height >= width;
        const fn = isPortrait ? hp : wp;
        return (value: string) : number => fn(value);
    }, []);

    // Cargar el tema de AsyncStorage al iniciar
    useEffect(() => {
        const loadTheme = async (): Promise<void> => {
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
    }, [handleError]); // Añadido handleError como dependencia


    return (
        <ThemeContext.Provider value={{
            theme: state.theme,
            typeTheme: state.typeTheme,
            toggleTheme,
            size
        }}>
            {children}
        </ThemeContext.Provider>
    );
};