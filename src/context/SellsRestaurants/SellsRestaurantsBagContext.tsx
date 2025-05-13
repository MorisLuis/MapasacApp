import { createContext } from "react";

import { EnlacemobInterface } from "../../interface/enlacemob";
import { updateProductInBagInterface } from "../../interface";
import { SellsRestaurantBagForm } from "./SellsRestaurantsBagProvider.interface";
import { UseFormReturn } from "react-hook-form";

interface ContextProps {
    addProductToBagSellsRestaurants: (_sellBody: EnlacemobInterface) => void;
    deleteProductToBagSellsRestaurants: (_idenlacemob: number) => void;
    updateProductToBagSellsRestaurants: ( _body: updateProductInBagInterface ) => void;
    resetBagAfterSaleRestaurants: () => void;
    clearBagSellsRestaurantsStateOnLogout: () => void;

    updateFormData: (_data: SellsRestaurantBagForm) => void;
    cleanFormData: () => void;
    
    numberOfItemsSellsRestaurant: number;
    sumPriceOfItemsSellsRestaurant:  number;
    formSellsData: SellsRestaurantBagForm;
    productAdded: boolean;

    methods: UseFormReturn<SellsRestaurantBagForm>;
}

export const SellsRestaurantBagContext = createContext({} as ContextProps)