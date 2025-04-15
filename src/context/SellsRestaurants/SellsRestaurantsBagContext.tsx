import { createContext } from "react";

import { EnlacemobInterface } from "../../interface/enlacemob";
import { updateProductInBagInterface } from "../../interface";
import { SellsRestaurantDataFormType } from "./SellsRestaurantsBagProvider";

interface ContextProps {
    addProductSell: (_sellBody: EnlacemobInterface) => void;
    deleteProductSell: (_idenlacemob: number) => void;
    editProductSell: ( _body: updateProductInBagInterface ) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    updateFormData: (_data: SellsRestaurantDataFormType) => void;
    cleanFormData: () => void;
    
    numberOfItemsSells: number;
    formSellsData: SellsRestaurantDataFormType;
    productAdded: boolean;
}

export const SellsRestaurantBagContext = createContext({} as ContextProps)