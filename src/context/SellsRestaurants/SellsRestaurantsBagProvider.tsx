import React, { ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsRestaurantsBagReducer } from './SellsRestaurantsBagReducer';
import {EnlacemobInterface} from '../../interface/enlacemob';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { SellsRestaurantBagContext } from './SellsRestaurantsBagContext';
import { UnitType, updateProductInBagInterface } from '../../interface';

export type SellsRestaurantDataFormType = {
    cvefamilia?: string;
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
    numberOfItemsSells: string;
};

export const SellsBagInitialState: SellsRestaurantsBagInterface = {
    numberOfItemsSells: "0"
};

export const SellsRestaurantsProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(SellsRestaurantsBagReducer, SellsBagInitialState);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();

    const [productAdded, setProductAdded] = useState(false);
    const [formSellsData, setFormSellsData] = useState<SellsRestaurantDataFormType>({});


    const handleUpdateSummary = async () => {
        if (status !== 'authenticated') return;
        try {
            const total = await getTotalProductsInBag({ opcion: 4 });
            if (total?.error) return handleError(total.error);
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
    };

    const addProductSell = async (sellBody: EnlacemobInterface) => {
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

    const editProductSell = async (body: updateProductInBagInterface) => {
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

    const updateFormData = (data: SellsRestaurantDataFormType) => {
        setFormSellsData((prev) => ({ ...prev, ...data }));
    };

    const cleanFormData = () => {
        setFormSellsData({});
    };


    const handleCleanState = () => {
        dispatch({ type: '[SellsRestaurantBag] - LogOut' })
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
    )

}