import { createContext } from "react";

import { EnlacemobInterface } from "../../interface/enlacemob";
import { updateProductInBagInterface } from "../../interface";
import { SellsBagRestaurantConfirmationForm, SellsRestaurantBagForm } from "./SellsRestaurantsBagProvider.interface";
import { UseFormReturn } from "react-hook-form";

interface ContextProps {
    addProductToBagSellsRestaurants: (_sellBody: EnlacemobInterface) => void;
    deleteProductToBagSellsRestaurants: (_idenlacemob: number) => void;
    updateProductToBagSellsRestaurants: ( _body: updateProductInBagInterface ) => void;
    resetBagAfterSaleRestaurants: () => void;
    clearBagSellsRestaurantsStateOnLogout: () => void;

    updateFormData: (_data: SellsRestaurantBagForm) => void;
    cleanFormData: () => void;
    updateConfirmationForm: (_data: Partial<SellsBagRestaurantConfirmationForm>) => void;
    
    numberOfItemsSellsRestaurant: number;
    sumPriceOfItemsSellsRestaurant:  number;
    formSellsData: SellsRestaurantBagForm;
    productAdded: boolean;
    confirmationForm: SellsBagRestaurantConfirmationForm

    methods: UseFormReturn<SellsRestaurantBagForm>;
}

export const SellsRestaurantBagContext = createContext({} as ContextProps)