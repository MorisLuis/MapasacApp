import { useContext, useMemo } from "react";
import { SettingsContext } from "../context/settings/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { CombineNavigationProp } from "../interface/navigation";
import { InventoryBagContext } from "../context/Inventory/InventoryBagContext";
import { SellsBagContext } from "../context/Sells/SellsBagContext";
import { SellsRestaurantBagContext } from "../context/SellsRestaurants/SellsRestaurantsBagContext";

export const useActionsForModules = () => {
    const { actualModule } = useContext(SettingsContext);
    const { navigate } = useNavigation<CombineNavigationProp>();
    const { resetAfterPost: resetAfterPostInventory, numberOfItems: numberOfItemsInventory } = useContext(InventoryBagContext);
    const { resetAfterPost: resetAfterPostMarket, numberOfItemsSells: numberOfItemsSells } = useContext(SellsBagContext);
    const { resetAfterPost: resetAfterPostSellsRestaurant, numberOfItemsSells: numberOfItemsSellsRestaurant } = useContext(SellsRestaurantBagContext);

    const { theme } = useTheme();

    const handleActionBag = useMemo(() => {
        const defaultActions = {
            openBag: () => navigate('bagInventoryScreen'),
            openConfirmation: () => navigate('confirmationScreen'),
            resetAfterPost: resetAfterPostInventory,
            numberOfItems: numberOfItemsInventory
        };

        switch (actualModule) {
            case 'Sells':
                return {
                    openBag: () => navigate('BagSellsScreen'),
                    openConfirmation: () => navigate('[Sells] - ConfirmationScreen'),
                    resetAfterPost: resetAfterPostMarket,
                    numberOfItems: numberOfItemsSells
                };
            case 'Sells-Restaurant':
                return {
                    openBag: () => navigate('BagSellsRestaurantsScreen'),
                    openConfirmation: () => navigate('[SellsRestaurants] - ConfirmationScreen'),
                    resetAfterPost: resetAfterPostSellsRestaurant,
                    numberOfItems: numberOfItemsSellsRestaurant
                };
            default:
                return defaultActions;
        }
    }, [actualModule, navigate, resetAfterPostInventory, numberOfItemsInventory, resetAfterPostMarket, numberOfItemsSells, resetAfterPostSellsRestaurant, numberOfItemsSellsRestaurant]);

    const handleColorWithModule = useMemo(() => {
        const defaultColors = {
            primary: theme.color_tertiary,
            secondary: theme.color_green,
        };

        switch (actualModule) {
            case 'Sells':
                return {
                    primary: theme.color_purple,
                    secondary: theme.color_purple,
                };
            case 'Sells-Restaurant':
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
        handleColorWithModule
    };
};

export default useActionsForModules;
