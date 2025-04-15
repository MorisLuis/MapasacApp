import { useContext, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/ThemeContext";
import { SettingsContext } from "../context/settings/SettingsContext";
import { InventoryBagContext } from "../context/Inventory/InventoryBagContext";
import { SellsBagContext } from "../context/Sells/SellsBagContext";
import { SellsRestaurantBagContext } from "../context/SellsRestaurants/SellsRestaurantsBagContext";
import { CombineNavigationProp } from "../interface/navigation";

// Tipos para la acción de la bolsa
interface ActionBag {
    openBag: () => void;
    openConfirmation: () => void;
    resetAfterPost: () => void;
    numberOfItems: number;
}

// Tipos para los colores del módulo
export interface ColorWithModule {
    primary: string;
    secondary: string;
}

export const useActionsForModules = (): {
    handleActionBag: ActionBag;
    handleColorWithModule: ColorWithModule;
} => {
    const { actualModule } = useContext(SettingsContext);
    const { navigate } = useNavigation<CombineNavigationProp>();
    const { resetAfterPost: resetAfterPostInventory, numberOfItems: numberOfItemsInventory } = useContext(InventoryBagContext);
    const { resetAfterPost: resetAfterPostMarket, numberOfItemsSells: numberOfItemsSells } = useContext(SellsBagContext);
    const { resetAfterPost: resetAfterPostSellsRestaurant, numberOfItemsSells: numberOfItemsSellsRestaurant } = useContext(SellsRestaurantBagContext);

    const { theme } = useTheme();

    /**
     * Función para manejar las acciones según el módulo activo
     */
    const handleActionBag = useMemo<{
        openBag: () => void;
        openConfirmation: () => void;
        resetAfterPost: () => void;
        numberOfItems: number;
    }>((): ActionBag => {

        const defaultActions = {
            openBag: (): void => navigate("bagInventoryScreen"),
            openConfirmation: (): void => navigate("confirmationScreen"),
            resetAfterPost: resetAfterPostInventory,
            numberOfItems: numberOfItemsInventory,
        };

        switch (actualModule) {
            case "Sells":
                return {
                    openBag: () => navigate("BagSellsScreen"),
                    openConfirmation: () => navigate("[Sells] - ConfirmationScreen"),
                    resetAfterPost: resetAfterPostMarket,
                    numberOfItems: numberOfItemsSells,
                };
            case "Sells-Restaurant":
                return {
                    openBag: () => navigate("BagSellsRestaurantsScreen"),
                    openConfirmation: () => navigate("[SellsRestaurants] - ConfirmationScreen"),
                    resetAfterPost: resetAfterPostSellsRestaurant,
                    numberOfItems: numberOfItemsSellsRestaurant,
                };
            default:
                return defaultActions;
        }
    }, [actualModule, navigate, resetAfterPostInventory, numberOfItemsInventory, resetAfterPostMarket, numberOfItemsSells, resetAfterPostSellsRestaurant, numberOfItemsSellsRestaurant]);

    /**
     * Función para manejar los colores según el módulo activo
     */
    const handleColorWithModule = useMemo<{
        primary: string;
        secondary: string;
    }>((): ColorWithModule => {
        const defaultColors = {
            primary: theme.color_tertiary,
            secondary: theme.color_green,
        };

        switch (actualModule) {
            case "Sells":
                return {
                    primary: theme.color_purple,
                    secondary: theme.color_purple,
                };
            case "Sells-Restaurant":
                return {
                    primary: theme.color_red,
                    secondary: theme.color_red,
                };
            default:
                return defaultColors;
        }
    }, [actualModule, theme]);

    return {
        handleActionBag,
        handleColorWithModule,
    };
};

export default useActionsForModules;
