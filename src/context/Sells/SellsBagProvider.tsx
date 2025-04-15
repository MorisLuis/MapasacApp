import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsBagContext } from './SellsBagContext';
import { sellsBagReducer } from './SellsBagReducer';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { EnlacemobInterface, FormSellsType } from '../../interface';
import { FormProvider, useForm } from 'react-hook-form';


export interface SellsBagInterface {
    numberOfItemsSells: number;
};

export const SellsBagInitialState: SellsBagInterface = {
    numberOfItemsSells: 0
};


const INITIAL_STATE_FORM: FormSellsType = {
    pieces: '',
    price: '',
    units: {
        value: '',
        id: 0
    },
    capa: '',
    idinvearts: 0,
    idinveclas: 0
}

export const SellsProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(sellsBagReducer, SellsBagInitialState);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();
    const [productAdded, setProductAdded] = useState(false);
    const methods = useForm<FormSellsType>({ defaultValues: INITIAL_STATE_FORM });

    const handleUpdateSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        try {
            const { total } = await getTotalProductsInBag({ opcion: 2 });
            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            };
            dispatch({ type: '[SellsBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
        } finally {
            setProductAdded(false);
            methods.reset(INITIAL_STATE_FORM);
        }
    }, [methods, status, handleError]);

    const addProductSell = async (sellBody: EnlacemobInterface): Promise<void> => {
        try {
            await addProductInBag({ product: sellBody, opcion: 2 });
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const deleteProductSell = async (idenlacemob: number): Promise<void> => {
        try {
            await deleteProductInBag({ idenlacemob });
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const editProductSell = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }): Promise<void> => {
        try {
            await updateProductInBag({ idenlacemob, cantidad });
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    };

    const handleCleanState = (): void => {
        dispatch({ type: '[SellsBag] - LogOut' })
    }

    const resetAfterPost = (): void => {
        handleUpdateSummary()
    };

    useEffect(() => {
        handleUpdateSummary();
    }, [productAdded, state.numberOfItemsSells, handleUpdateSummary]);

    return (
        <SellsBagContext.Provider value={{
            ...state,
            addProductSell,
            deleteProductSell,
            editProductSell,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState,
            productAdded,
            methods
        }}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </SellsBagContext.Provider>
    )
}
