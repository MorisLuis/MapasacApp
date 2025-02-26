import { createContext } from "react";
import { EnlacemobInterface } from "../../interface";
import { SellsDataFormType } from "./SellsBagProvider";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    updateFormData: (data: SellsDataFormType) => void;
    cleanFormData: () => void;
    
    numberOfItemsSells: string;
    formSellsData: SellsDataFormType;
    productAdded: boolean;
}

export const SellsBagContext = createContext({} as ContextProps)