import { createContext } from "react";
import { EnlacemobInterface } from "../../interface/enlacemob";
import { updateProductInBagInterface } from "../../interface";
import { SellsRestaurantDataFormType } from "./SellsRestaurantsBagProvider";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ( body: updateProductInBagInterface ) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    updateFormData: (data: SellsRestaurantDataFormType) => void;
    cleanFormData: () => void;
    
    numberOfItemsSells: string;
    formSellsData: SellsRestaurantDataFormType;
    productAdded: boolean;
}

export const SellsRestaurantBagContext = createContext({} as ContextProps)