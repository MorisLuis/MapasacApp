import { useContext } from "react";

import { SettingsContext } from "../context/settings/SettingsContext";
import { SellsBagContext } from "../context/Sells/SellsBagContext";
import { SellsRestaurantBagContext } from "../context/SellsRestaurants/SellsRestaurantsBagContext";
import { CombinedSellsInterface } from "../components/Layouts/LayoutSell";
import { ProductSellsInterface, ProductSellsRestaurantInterface } from "../interface";

export const useDataShowedInLayoutSell = (): {
    handleUpdateSummary: () => void;
    productAdded: boolean;
    keyExtractor: (_item: CombinedSellsInterface) => string
} => {

    const { actualModule } = useContext(SettingsContext);
    const { updateBagSellsSummary: handleUpdateSummaryMarket, productAdded: productAddedMarket } = useContext(SellsBagContext);
    const { updateBagSellsRestaurantsSummary: handleUpdateSummaryRestaurant, productAdded: productAddedRestaurant } = useContext(SellsRestaurantBagContext);

    const handleUpdateSummary = actualModule === "Sells"
        ? handleUpdateSummaryMarket
        : handleUpdateSummaryRestaurant;

    const productAdded = actualModule === "Sells"
        ? productAddedMarket
        : productAddedRestaurant;

    // Tipar correctamente item como CombinedSellsInterface
    const keyExtractor = (item: CombinedSellsInterface) : string =>
        `${(item as ProductSellsInterface).idinvefami || (item as ProductSellsRestaurantInterface).clave}`;

    return {
        handleUpdateSummary,
        productAdded,
        keyExtractor
    };
};

export default useDataShowedInLayoutSell;
