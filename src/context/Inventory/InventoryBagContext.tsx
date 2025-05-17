import { createContext } from "react";
import { EnlacemobInterface } from "../../interface";

interface ContextProps {
    addProduct: (_inventoryBody: EnlacemobInterface) => void;
    deleteProduct: (_idenlacemob: number) => void;
    editProduct: (_info: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    numberOfItems: number;
    handleCleanState: () => void;

    handleUpdateSummary: () => void;
    productAdded: boolean
}

export const InventoryBagContext = createContext({} as ContextProps)