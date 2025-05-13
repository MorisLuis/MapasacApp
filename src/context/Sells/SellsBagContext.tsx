import { createContext } from "react";

import { EnlacemobInterface } from "../../interface";
import { UseFormReturn } from "react-hook-form";
import { SellsBagForm } from "./SellsBagProvider.interface";

interface ContextProps {
    addProductToBagSells: (_sellBody: EnlacemobInterface) => void;
    updateProductToBagSells: (_info : { idenlacemob: number, cantidad: number }) => void;
    deleteProductToBagSells: (_idenlacemob: number) => void;

    resetBagAfterSale: () => void;
    clearBagStateOnLogout: () => void;

    methods: UseFormReturn<SellsBagForm>;
    numberOfItemsSells: number;
    sumPriceOfItemsSells: number;
    productAdded: boolean;
}

export const SellsBagContext = createContext({} as ContextProps)