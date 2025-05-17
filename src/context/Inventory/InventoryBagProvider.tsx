import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag/bag';
import { AuthContext } from '../auth/AuthContext';
import { EnlacemobInterface } from '../../interface';

export interface InventoryBagInterface {
    numberOfItems: number;
}

export const InventoryBagInitialState: InventoryBagInterface = {
    numberOfItems: 0
}

export const InventoryProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(innventoryBagReducer, InventoryBagInitialState);
    const [productAdded, setProductAdded] = useState(false);
    const { status } = useContext(AuthContext);

    const handleUpdateSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        const { total } = await getTotalProductsInBag({ opcion: 0 });

        const numberOfItems = total;
        const orderSummary = {
            numberOfItems
        };

        dispatch({ type: '[InventoryBag] - Update Summary', payload: orderSummary });
        setProductAdded(false);
    }, [status]);

    const addProduct = async (inventoryBody: EnlacemobInterface): Promise<void> => {
        await addProductInBag({ product: inventoryBody, opcion: 0 });
        setProductAdded(true);
    }

    const deleteProduct = async (idenlacemob: number): Promise<void> => {
        await deleteProductInBag({ idenlacemob });
        setProductAdded(true);
    }

    const editProduct = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }): Promise<void> => {
        await updateProductInBag({ idenlacemob, cantidad });
        setProductAdded(true);
    }

    const handleCleanState = (): void => {
        dispatch({ type: '[InventoryBag] - LogOut' });
    }

    const resetAfterPost = (): void => {
        handleUpdateSummary();
    }

    useEffect(() => {
        handleUpdateSummary();
    }, [handleUpdateSummary, productAdded, state.numberOfItems]);

    return (
        <InventoryBagContext.Provider value={{
            ...state,
            addProduct,
            deleteProduct,
            editProduct,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState,
            productAdded
        }}>
            {children}
        </InventoryBagContext.Provider>
    )
}
