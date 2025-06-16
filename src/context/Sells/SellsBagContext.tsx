import { createContext } from "react";

import { EnlacemobInterface } from "../../interface";
import { UseFormReturn } from "react-hook-form";
import { SellsBagConfirmationForm, SellsBagForm } from "./SellsBagProvider.interface";

interface ContextProps {
    addProductToBagSells: (_sellBody: EnlacemobInterface) => void;
    updateProductToBagSells: (_info : { idenlacemob: number, cantidad: number }) => void;
    deleteProductToBagSells: (_idenlacemob: number) => void;

    resetBagAfterSale: () => void;
    clearBagStateOnLogout: () => void;

    updateConfirmationForm: (_data: Partial<SellsBagConfirmationForm>) => void;

    methods: UseFormReturn<SellsBagForm>;
    confirmationForm: SellsBagConfirmationForm,
    numberOfItemsSells: number;
    sumPriceOfItemsSells: number;
    productAdded: boolean;
}

export const SellsBagContext = createContext({} as ContextProps)