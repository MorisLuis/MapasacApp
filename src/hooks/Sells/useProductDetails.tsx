import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { SellsRestaurantBagContext } from "../../context/SellsRestaurants/SellsRestaurantsBagContext";
import { EnlacemobInterface, SellsRestaurantNavigationProp } from "../../interface";
import { DEFAULT_VALUE, MINIMUM_CLASSES, Route, useProductDetailsResponse } from "./useProductDetails.interface";
import { SellsRestaurantBagForm } from "../../context/SellsRestaurants/SellsRestaurantsBagProvider.interface";
import { NUMBER_0 } from "../../utils/globalConstants";

/**
 * Maneja la lógica del detalle de producto en ventas para restaurantes.
 * Retorna datos del producto, estado del formulario y acciones de navegación.
 * - extraData: Información visual del producto (imagen, descripción, etc.), no necesario en submitBagRestaurantsProduct.
 * - submitBagRestaurantsProduct: Función para agregar el producto al carrito y regresar.
 */

const DEFAULT_VALUE_TOTALCLASSES = 0;
const DEFAULT_VALUE_CVEFAMILIA = 0;

export function useProductDetails(route: { params: Route['params'] }): useProductDetailsResponse {

    const params = route.params ?? {};
    const {
        idinvearts = DEFAULT_VALUE,
        price,
        typeClass,
        units = DEFAULT_VALUE,
        descripcio = '',
        image = '',
        totalClasses = DEFAULT_VALUE_TOTALCLASSES,
        cvefamilia = DEFAULT_VALUE_CVEFAMILIA
    } = params;

    // Contexts
    const { user } = useContext(AuthContext);
    const { addProductToBagSellsRestaurants, methods: { watch, getValues, setValue } } = useContext(SellsRestaurantBagContext);
    const { goBack, navigate } = useNavigation<SellsRestaurantNavigationProp>();

    // State local
    const [extraData, setExtraData] = useState({
        image,
        descripcio,
        totalClasses,
        cvefamilia
    });

    const watchedValues = watch();
    const formCompleted = Boolean(watchedValues.price && watchedValues.pieces);
    const buttonDisabled = !formCompleted;

    // Actions
    const submitBagRestaurantsProduct = useCallback(() => {
        const { pieces = '', price: p = DEFAULT_VALUE, capa = '', comments = '' } = getValues();
        const cantidad = parseFloat(pieces) || DEFAULT_VALUE;

        addProductToBagSellsRestaurants({
            cantidad,
            precio: p,
            idinvearts: Number(idinvearts),
            unidad: units,
            capa,
            idusrmob: user?.idusrmob,
            comentario: comments
        } as EnlacemobInterface);

        goBack();
    }, [getValues, addProductToBagSellsRestaurants, idinvearts, units, user, goBack]);

    const selectAmount = useCallback(() => {
        navigate('[SellsRestaurants] - PiecesScreen',
            {
                from: "pieces",
                valueDefault: getValues('pieces') ?? '',
                unit: 'PZA'
            }
        )
    }, [navigate, getValues]);

    const navigateToClass = useCallback(() => {
        if (totalClasses <= MINIMUM_CLASSES || !cvefamilia) return;
        navigate('[SellsRestaurants] - ClassScreen', {
            cvefamilia,
            totalClasses: idinvearts,
            image,
            descripcio
        });
    }, [navigate, totalClasses, cvefamilia, idinvearts, image, descripcio]);

    // Local Actions
    const setSellsForm = useCallback((): void => {
        const initialValues: Partial<SellsRestaurantBagForm> = { idinvearts, price, typeClass };

        const isValid = (value: unknown): boolean => {
            if (value === undefined || value === null) return false;
            if (typeof value === 'string' && value.trim() === '') return false;
            return true;
        };

        Object.entries(initialValues).forEach(([key, value]) => {
            if (isValid(value)) {
                setValue(key as keyof SellsRestaurantBagForm, value);
            }
        });
    }, [idinvearts, price, typeClass, setValue])


    useEffect(() => {
        setTimeout(() => {
            setSellsForm();
        }, NUMBER_0);
    }, [setSellsForm]);


    // Sync extraData if params change
    useEffect(() => {
        setExtraData(prev => ({
            image: image?.trim() ? image : prev.image,
            descripcio: descripcio?.trim() ? descripcio : prev.descripcio,
            totalClasses: totalClasses ?? prev.totalClasses,
            cvefamilia: cvefamilia ?? prev.cvefamilia
        }));
    }, [image, descripcio, totalClasses, cvefamilia]);

    return {
        extraData,
        watchedValues,
        submitBagRestaurantsProduct,
        selectAmount,
        navigateToClass,
        buttonDisabled
    };
}