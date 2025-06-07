import { Theme, darkTheme, lightTheme } from "../../theme/appTheme";
import { ThemeColor } from "./ThemeProvider";


type ThemeAction =
    | { type: 'SET_THEME'; payload: { theme: Theme; typeTheme: ThemeColor } }
    | { type: 'TOGGLE_THEME' };

interface ThemeState {
    theme: Theme;
    typeTheme: ThemeColor;
}

// Reducer para manejar las acciones de tema
export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case 'SET_THEME': {
            const { theme, typeTheme } = action.payload;
            return {
                ...state,
                theme,
                typeTheme
            };
        }
        case 'TOGGLE_THEME': {
            const newTheme = state.theme === lightTheme ? darkTheme : lightTheme;
            const newTypeTheme = state.typeTheme === 'light' ? 'dark' : 'light';
            return {
                ...state,
                theme: newTheme,
                typeTheme: newTypeTheme
            };
        }
        default:
            return state;
    }
};
