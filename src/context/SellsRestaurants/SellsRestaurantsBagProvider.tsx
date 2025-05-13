import React, { JSX, ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalPriceBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsRestaurantsBagReducer } from './SellsRestaurantsBagReducer';
import { EnlacemobInterface } from '../../interface/enlacemob';
import { AuthContext } from '../auth/AuthContext';
import { SellsRestaurantBagContext } from './SellsRestaurantsBagContext';
import { updateProductInBagInterface } from '../../interface';
import { FormProvider, useForm } from 'react-hook-form';
import { SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE, SELLS_BAG_RESTAURANT_INITIAL_STATE, SellsRestaurantBagForm, SellsRestaurantBagInterface } from './SellsRestaurantsBagProvider.interface';
import { NUMBER_0 } from '../../utils/globalConstants';

export const SellsRestaurantsProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(SellsRestaurantsBagReducer, SELLS_BAG_RESTAURANT_INITIAL_STATE);
    const { status } = useContext(AuthContext);
    const methods = useForm<SellsRestaurantBagForm>({ defaultValues: SELLS_BAG_RESTAURANT_FORM_INITIAL_STATE });

    const [productAdded, setProductAdded] = useState(false);
    const [formSellsData, setFormSellsData] = useState<SellsRestaurantBagForm>({});

    const updateBagSellsRestaurantsSummary = useCallback(async (): Promise<void> => {
        if (status !== 'authenticated') return;
        const { total } = await getTotalProductsInBag({ opcion: 4 });
        const { total:  totalPrice } = await getTotalPriceBag({ opcion: 4 });


        const numberOfItemsSellsRestaurant = total;
        const priceOfItemsSellsRestaurant = totalPrice;

        const orderSummary : SellsRestaurantBagInterface = {
            numberOfItemsSellsRestaurant: numberOfItemsSellsRestaurant ?? NUMBER_0,
            sumPriceOfItemsSellsRestaurant: priceOfItemsSellsRestaurant ?? NUMBER_0
        };

        dispatch({ type: '[SellsRestaurantBag] - Update Summary', payload: orderSummary });
        setProductAdded(false);
    }, [status]);

    const addProductToBagSellsRestaurants = async (sellBody: EnlacemobInterface): Promise<void> => {
        await addProductInBag({ product: sellBody, opcion: 4 });
        setProductAdded(true);
    };

    const deleteProductToBagSellsRestaurants = async (idenlacemob: number): Promise<void> => {
        await deleteProductInBag({ idenlacemob });
        setProductAdded(true);
    };

    const updateProductToBagSellsRestaurants = async (body: updateProductInBagInterface): Promise<void> => {
        await updateProductInBag(body);
        setProductAdded(true);
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
    }, [updateBagSellsRestaurantsSummary, productAdded, state.numberOfItemsSellsRestaurant]);

    return (
        <SellsRestaurantBagContext.Provider value={{
            ...state,
            addProductToBagSellsRestaurants,
            deleteProductToBagSellsRestaurants,
            updateProductToBagSellsRestaurants,
            resetBagAfterSaleRestaurants,
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
