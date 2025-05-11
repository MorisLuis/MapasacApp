import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsRestaurantsBagReducer } from './SellsRestaurantsBagReducer';
import { EnlacemobInterface } from '../../interface/enlacemob';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { SellsRestaurantBagContext } from './SellsRestaurantsBagContext';
import { updateProductInBagInterface } from '../../interface';
import { FormProvider, useForm } from 'react-hook-form';
import { SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE, SELLS_BAG_RESTAURANT_INITIAL_STATE, SellsRestaurantBagForm } from './SellsRestaurantsBagProvider.interface';

export const SellsRestaurantsProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(SellsRestaurantsBagReducer, SELLS_BAG_RESTAURANT_INITIAL_STATE);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();
    const methods = useForm<SellsRestaurantBagForm>({ defaultValues: SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE });

    const [productAdded, setProductAdded] = useState(false);
    const [formSellsData, setFormSellsData] = useState<SellsRestaurantBagForm>({});

    const updateBagSellsRestaurantsSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        try {
            const { total } = await getTotalProductsInBag({ opcion: 4 });
            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            }
            dispatch({ type: '[SellsRestaurantBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
        } finally {
            setProductAdded(false);
        }
    }, [handleError, status]);

    const addProductToBagSellsRestaurants = async (sellBody: EnlacemobInterface): Promise<void> => {
        try {
            const product = await addProductInBag({ product: sellBody, opcion: 4 });
            if ('error' in product) {
                return handleError(product);
            };
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            updateBagSellsRestaurantsSummary()
        }
    };

    const deleteProductToBagSellsRestaurants = async (idenlacemob: number): Promise<void> => {
        try {
            const product = await deleteProductInBag({ idenlacemob });
            if ('error' in product) {
                return handleError(product);
            };
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            updateBagSellsRestaurantsSummary()
        }
    };

    const updateProductToBagSellsRestaurants = async (body: updateProductInBagInterface): Promise<void> => {
        try {
            const product = await updateProductInBag(body);
            if ('error' in product) {
                return handleError(product);
            };
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            updateBagSellsRestaurantsSummary()
        }
    };

    const updateFormData = useCallback((data: SellsRestaurantBagForm): void => {
        setFormSellsData((prev) => ({ ...prev, ...data }));
    }, []);

    const cleanFormData = useCallback((): void => {
        setFormSellsData({});
    }, []);

    const clearBagSellsRestaurantsStateOnLogout = (): void => {
        dispatch({ type: '[SellsRestaurantBag] - LogOut' });
    };

    const resetBagAfterSaleRestaurants = (): void => {
        updateBagSellsRestaurantsSummary();
    };

    useEffect(() => {
        updateBagSellsRestaurantsSummary();
    }, [updateBagSellsRestaurantsSummary, productAdded, state.numberOfItemsSells]);

    return (
        <SellsRestaurantBagContext.Provider value={{
            ...state,
            addProductToBagSellsRestaurants,
            deleteProductToBagSellsRestaurants,
            updateProductToBagSellsRestaurants,
            resetBagAfterSaleRestaurants,
            updateBagSellsRestaurantsSummary,
            clearBagSellsRestaurantsStateOnLogout,
            updateFormData,
            cleanFormData,
            formSellsData,
            productAdded,
            methods
        }}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </SellsRestaurantBagContext.Provider>
    );
};
