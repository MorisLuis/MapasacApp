import React, { ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import ProductInterface from '../../interface/product';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';

export interface InventoryBagInterface {
    numberOfItems: string;
}

export const InventoryBagInitialState: InventoryBagInterface = {
    numberOfItems: "0"
}

export const InventoryProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(innventoryBagReducer, InventoryBagInitialState);
    const [productAdded, setProductAdded] = useState(false);
    const { handleError } = useErrorHandler();
    const { status } = useContext(AuthContext);


    const handleUpdateSummary = async () => {
        if (status !== 'authenticated') return;
        try {
            const total = await getTotalProductsInBag({ opcion: 0 });
            if (total?.error) return handleError(total.error);

            const numberOfItems = total;
            const orderSummary = {
                numberOfItems
            };
            dispatch({ type: '[InventoryBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            return handleError(error);
        } finally {
            setProductAdded(false);
        }
    };

    const addProduct = async (inventoryBody: ProductInterface) => {
        try {
            const product = await addProductInBag({ product: inventoryBody, opcion: 0 });

            if ('error' in product) {
                return handleError(product);
            }

            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const deleteProduct = async (idenlacemob: number) => {
        try {
            const product = await deleteProductInBag({ idenlacemob });
            if (product?.error) return handleError(product.error);
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const editProduct = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => {
        try {
            const product = await updateProductInBag({ idenlacemob, cantidad });
            if ('error' in product) {
                return handleError(product);
            }

            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const handleCleanState = () => {
        dispatch({ type: '[InventoryBag] - LogOut' })
    }

    const resetAfterPost = () => {
        handleUpdateSummary()
    }

    useEffect(() => {
        handleUpdateSummary();
    }, [productAdded, state.numberOfItems]);

    return (
        <InventoryBagContext.Provider value={{
            ...state,
            addProduct,
            deleteProduct,
            editProduct,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState
        }}>
            {children}
        </InventoryBagContext.Provider>
    )

}