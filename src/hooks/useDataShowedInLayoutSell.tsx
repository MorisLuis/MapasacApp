import { useContext } from "react";
import { SettingsContext } from "../context/settings/SettingsContext";
import { SellsBagContext } from "../context/Sells/SellsBagContext";
import { SellsRestaurantBagContext } from "../context/SellsRestaurants/SellsRestaurantsBagContext";
import { ProductSellsInterface, ProductSellsRestaurantInterface } from "../interface/productSells";
import { CombinedSellsInterface } from "../components/Layouts/LayoutSell";

export const useDataShowedInLayoutSell = () => {
    const { actualModule } = useContext(SettingsContext);
    const { handleUpdateSummary: handleUpdateSummaryMarket, productAdded: productAddedMarket } = useContext(SellsBagContext);
    const { handleUpdateSummary: handleUpdateSummaryRestaurant, productAdded: productAddedRestaurant } = useContext(SellsRestaurantBagContext);

    const handleUpdateSummary = actualModule === "Sells"
        ? handleUpdateSummaryMarket
        : handleUpdateSummaryRestaurant;

    const productAdded = actualModule === "Sells"
        ? productAddedMarket
        : productAddedRestaurant;

    // Tipar correctamente item como CombinedSellsInterface
    const keyExtractor = (item: CombinedSellsInterface) =>
        `${(item as ProductSellsInterface).idinvefami || (item as ProductSellsRestaurantInterface).clave}`;

    return {
        handleUpdateSummary,
        productAdded,
        keyExtractor
    };
};

export default useDataShowedInLayoutSell;
