import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsRestaurantsBagReducer } from './SellsRestaurantsBagReducer';
import { EnlacemobInterface } from '../../interface/enlacemob';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { SellsRestaurantBagContext } from './SellsRestaurantsBagContext';
import { UnitType, updateProductInBagInterface } from '../../interface';

export type SellsRestaurantDataFormType = {
    cvefamilia?: number;
    pieces?: string;
    price?: number;
    typeClass?: UnitType;
    comments?: string;
    units?: number;
    capa?: string;
    idinvearts?: number;

    descripcio?: string;
    image?: string;
    totalClasses?: number;
};

export interface SellsRestaurantsBagInterface {
    numberOfItemsSells: number;
};

export const SellsBagInitialState: SellsRestaurantsBagInterface = {
    numberOfItemsSells: 0
};

export const SellsRestaurantsProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(SellsRestaurantsBagReducer, SellsBagInitialState);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();

    const [productAdded, setProductAdded] = useState(false);
    const [formSellsData, setFormSellsData] = useState<SellsRestaurantDataFormType>({});

    const handleUpdateSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        try {
            const { total } = await getTotalProductsInBag({ opcion: 4 });
            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            };
            dispatch({ type: '[SellsRestaurantBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
            return;
        } finally {
            setProductAdded(false);
        }
    }, [handleError, status]);

    const addProductSell = async (sellBody: EnlacemobInterface): Promise<void> => {
        try {
            const product = await addProductInBag({ product: sellBody, opcion: 4 });
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

    const deleteProductSell = async (idenlacemob: number): Promise<void> => {
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
    };

    const editProductSell = async (body: updateProductInBagInterface): Promise<void> => {
        try {
            const product = await updateProductInBag(body);
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

    const updateFormData = useCallback((data: SellsRestaurantDataFormType): void => {
        setFormSellsData((prev) => ({ ...prev, ...data }));
    }, []);

    const cleanFormData = useCallback((): void => {
        setFormSellsData({});
    }, []);

    const handleCleanState = (): void => {
        dispatch({ type: '[SellsRestaurantBag] - LogOut' });
    };

    const resetAfterPost = (): void => {
        handleUpdateSummary();
    };

    useEffect(() => {
        handleUpdateSummary();
    }, [handleUpdateSummary, productAdded, state.numberOfItemsSells]);

    return (
        <SellsRestaurantBagContext.Provider value={{
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
        </SellsRestaurantBagContext.Provider>
    );
};
