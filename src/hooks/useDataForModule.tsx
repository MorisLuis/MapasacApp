import { useContext } from "react";

import { SettingsContext } from "../context/settings/SettingsContext";
import { InventoryBagContext } from "../context/Inventory/InventoryBagContext";
import { SellsBagContext } from "../context/Sells/SellsBagContext";
import { SellsRestaurantBagContext } from "../context/SellsRestaurants/SellsRestaurantsBagContext";

export const useDataForModule = (): {
    numberOfItems: number;
    movementInfo: {
        title: string;
        text: string
    }
} => {
    const { actualModule } = useContext(SettingsContext);
    const { numberOfItems } = useContext(InventoryBagContext);
    const { numberOfItemsSells } = useContext(SellsBagContext);
    const { numberOfItemsSellsRestaurant: numberOfItemsSellsRestaurant } = useContext(SellsRestaurantBagContext);
    const numberOfItemsSells_DEFAULT = 0;

    // Number of items in bag ( used in CustomTabBar ).
    const numberOfItemsToDisplay =
        actualModule === "Sells" ? numberOfItemsSells ?? numberOfItemsSells_DEFAULT :
            actualModule === "Inventory" ? numberOfItems ?? numberOfItemsSells_DEFAULT :
                actualModule === 'Sells-Restaurant' ? numberOfItemsSellsRestaurant : numberOfItemsSells_DEFAULT

    // Data showed in 'SuccesMessage'.
    const { title, text } =
        actualModule === 'Inventory' ? { title: 'Inventario realizado', text: 'Inventario' } :
            actualModule === 'Sells-Restaurant' ? { title: 'Pedido realizada', text: 'Pedido' } :
                { title: 'Pedido realizado', text: 'Pedido' };

    // Retornar ambos valores calculados
    return {
        numberOfItems: numberOfItemsToDisplay,
        movementInfo: {
            title,
            text
        }
    };
};

export default useDataForModule;
