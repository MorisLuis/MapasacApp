import { useContext } from "react";
import { ContextProps, ThemeContext } from "../../context/theme/ThemeContext";


// Hook para acceder al tema
export const useTheme = (): ContextProps => {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme debe ser usado dentro de ThemeProvider');
    };

    return context;
};
