import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsBagContext } from './SellsBagContext';
import { sellsBagReducer } from './SellsBagReducer';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { EnlacemobInterface } from '../../interface';
import { FormProvider, useForm } from 'react-hook-form';
import { SELLS_BAG_FORM_INITIAL_STATE, SELLS_BAG_INITIAL_STATE, SellsBagForm } from './SellsBagProvider.interface';
import { NUMBER_0 } from '../../utils/globalConstants';

export const SellsProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(sellsBagReducer, SELLS_BAG_INITIAL_STATE);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();
    const [productAdded, setProductAdded] = useState(false);
    const methods = useForm<SellsBagForm>({ defaultValues: SELLS_BAG_FORM_INITIAL_STATE });

    const updateBagSellsSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        try {
            const { total } = await getTotalProductsInBag({ opcion: 2 });
            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells: numberOfItemsSells ?? NUMBER_0
            };
            dispatch({ type: '[SellsBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
        } finally {
            setProductAdded(false);
            methods.reset(SELLS_BAG_FORM_INITIAL_STATE);
        }
    }, [methods, status, handleError]);

    const addProductToBagSells = async (sellBody: EnlacemobInterface): Promise<void> => {
        try {
            await addProductInBag({ product: sellBody, opcion: 2 });
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            updateBagSellsSummary()
        }
    }

    const deleteProductToBagSells = async (idenlacemob: number): Promise<void> => {
        try {
            await deleteProductInBag({ idenlacemob });
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            updateBagSellsSummary()
        }
    }

    const updateProductToBagSells = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }): Promise<void> => {
        try {
            await updateProductInBag({ idenlacemob, cantidad });
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            updateBagSellsSummary()
        }
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
            updateBagSellsSummary,
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
