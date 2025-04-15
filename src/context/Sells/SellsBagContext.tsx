import { createContext } from "react";

import { EnlacemobInterface, FormSellsType } from "../../interface";
import { UseFormReturn } from "react-hook-form";

interface ContextProps {
    addProductSell: (_sellBody: EnlacemobInterface) => void;
    deleteProductSell: (_idenlacemob: number) => void;
    editProductSell: (_info : { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;

    methods: UseFormReturn<FormSellsType>;
    
    numberOfItemsSells: number;
    productAdded: boolean;
}

export const SellsBagContext = createContext({} as ContextProps)