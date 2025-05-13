import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { addProductInBag, deleteProductInBag, getTotalPriceBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsBagContext } from './SellsBagContext';
import { sellsBagReducer } from './SellsBagReducer';
import { AuthContext } from '../auth/AuthContext';
import { EnlacemobInterface } from '../../interface';
import { FormProvider, useForm } from 'react-hook-form';
import { SELLS_BAG_FORM_INITIAL_STATE, SELLS_BAG_INITIAL_STATE, SellsBagForm } from './SellsBagProvider.interface';
import { NUMBER_0 } from '../../utils/globalConstants';

export const SellsProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(sellsBagReducer, SELLS_BAG_INITIAL_STATE);
    const { status } = useContext(AuthContext);
    const [productAdded, setProductAdded] = useState(false);
    const methods = useForm<SellsBagForm>({ defaultValues: SELLS_BAG_FORM_INITIAL_STATE });

    const updateBagSellsSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        const { total } = await getTotalProductsInBag({ opcion: 2 });
        const { total:  totalPrice } = await getTotalPriceBag({ opcion: 2 });

        const numberOfItemsSells = total;
        const priceOfItemsSells = totalPrice;

        const orderSummary = {
            numberOfItemsSells: numberOfItemsSells ?? NUMBER_0,
            sumPriceOfItemsSells: priceOfItemsSells ?? NUMBER_0
        };

        dispatch({ type: '[SellsBag] - Update Summary', payload: orderSummary });
        setProductAdded(false);
        methods.reset(SELLS_BAG_FORM_INITIAL_STATE);

    }, [methods, status]);

    const addProductToBagSells = async (sellBody: EnlacemobInterface): Promise<void> => {

        await addProductInBag({ product: sellBody, opcion: 2 });
        setProductAdded(true);

    }

    const deleteProductToBagSells = async (idenlacemob: number): Promise<void> => {
        await deleteProductInBag({ idenlacemob });
        setProductAdded(true);
    }

    const updateProductToBagSells = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }): Promise<void> => {
        await updateProductInBag({ idenlacemob, cantidad });
        setProductAdded(true);
    };

    const clearBagStateOnLogout = (): void => {
        dispatch({ type: '[SellsBag] - LogOut' })
    }

    const resetBagAfterSale = (): void => {
        updateBagSellsSummary()
    };

    useEffect(() => {
        updateBagSellsSummary();
    }, [productAdded, state.numberOfItemsSells, updateBagSellsSummary]);

    return (
        <SellsBagContext.Provider value={{
            ...state,
            addProductToBagSells,
            deleteProductToBagSells,
            updateProductToBagSells,
            resetBagAfterSale,
            clearBagStateOnLogout,
            productAdded,
            methods
        }}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </SellsBagContext.Provider>
    )
}
