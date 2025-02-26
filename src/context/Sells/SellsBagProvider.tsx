import React, { ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsBagContext } from './SellsBagContext';
import { sellsBagReducer } from './SellsBagReducer';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { EnlacemobInterface, UnitType } from '../../interface';

export type SellsDataFormType = {
    cvefamilia?: number;
    pieces?: string;
    price?: string;
    typeClass?: UnitType;
    units?: UnitType;
    productSellData?: { idinvearts: number, capa: string, idinveclas: number };

    totalClasses?: number;
    descripcio?: string;
    image?: string;
};


export interface SellsBagInterface {
    numberOfItemsSells: string;
};

export const SellsBagInitialState: SellsBagInterface = {
    numberOfItemsSells: "0"
};

export const SellsProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(sellsBagReducer, SellsBagInitialState);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();

    const [productAdded, setProductAdded] = useState(false);
    const [formSellsData, setFormSellsData] = useState<SellsDataFormType>({});


    const handleUpdateSummary = async () => {
        if (status !== 'authenticated') return;
        try {
            const total = await getTotalProductsInBag({ opcion: 2 });
            if (total?.error) return handleError(total.error);

            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            };
            dispatch({ type: '[SellsBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
            return;
        } finally {
            setProductAdded(false);
        }
    };

    const addProductSell = async (sellBody: EnlacemobInterface) => {
        try {
            const product = await addProductInBag({ product: sellBody, opcion: 2 });

            if ('error' in product) {
                return handleError(product);
            };

            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const deleteProductSell = async (idenlacemob: number) => {
        try {
            const product = await deleteProductInBag({ idenlacemob });

            if ('error' in product) {
                return handleError(product);
            };

            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const editProductSell = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => {
        try {
            const product = await updateProductInBag({ idenlacemob, cantidad });

            if ('error' in product) {
                return handleError(product);
            };

            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    };

    const updateFormData = (data: SellsDataFormType) => {
        setFormSellsData((prev) => ({ ...prev, ...data }));
    };

    const cleanFormData = () => {
        setFormSellsData({});
    };


    const handleCleanState = () => {
        dispatch({ type: '[SellsBag] - LogOut' })
    }

    const resetAfterPost = () => {
        handleUpdateSummary()
    }

    useEffect(() => {
        handleUpdateSummary();
    }, [productAdded, state.numberOfItemsSells]);

    useEffect(() => {
        handleUpdateSummary();
    }, [])

    return (
        <SellsBagContext.Provider value={{
            ...state,
            addProductSell,
            deleteProductSell,
            editProductSell,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState,
            updateFormData,
            cleanFormData,
            formSellsData,
            productAdded
        }}>
            {children}
        </SellsBagContext.Provider>
    )

}