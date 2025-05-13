import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { SellsRestaurantBagContext } from "../../context/SellsRestaurants/SellsRestaurantsBagContext";
import {
    EnlacemobInterface,
    SellsRestaurantNavigationProp
} from "../../interface";
import {
    DEFAULT_VALUE,
    MINIMUM_CLASSES,
    Route,
    useProductDetailsResponse
} from "./useProductRestaurantDetails.interface";
import { SellsRestaurantBagForm } from "../../context/SellsRestaurants/SellsRestaurantsBagProvider.interface";
import { NUMBER_0 } from "../../utils/globalConstants";

const DEFAULT_VALUE_TOTALCLASSES = 0;
const DEFAULT_VALUE_CVEFAMILIA = 0;

export function useProductRestaurantDetails(route: { params: Route['params'] }): useProductDetailsResponse {
    const {
        idinvearts: initialIdinvearts = DEFAULT_VALUE,
        price: initialPrice,
        typeClass: initialTypeClass,
        units: initialUnits = DEFAULT_VALUE,
        descripcio = '',
        image = '',
        totalClasses = DEFAULT_VALUE_TOTALCLASSES,
        cvefamilia = DEFAULT_VALUE_CVEFAMILIA
    } = route.params ?? {};

    const { user } = useContext(AuthContext);
    const {
        addProductToBagSellsRestaurants,
        methods: { watch, getValues, setValue }
    } = useContext(SellsRestaurantBagContext);
    const { goBack, navigate } = useNavigation<SellsRestaurantNavigationProp>();

    const [extraData, setExtraData] = useState({
        image,
        descripcio,
        totalClasses,
        cvefamilia
    });

    const watchedValues = watch();
    const formCompleted = Boolean(watchedValues.price && watchedValues.pieces);
    const buttonDisabled = !formCompleted;

    const submitBagRestaurantsProduct = useCallback(() => {
        const {
            pieces = '',
            price: formPrice = DEFAULT_VALUE,
            capa = '',
            comments = '',
            idinvearts: formIdinvearts,
            units = NUMBER_0
        } = getValues();

        const cantidad = parseFloat(pieces) || DEFAULT_VALUE;

        const productBagBody : EnlacemobInterface = {
            cantidad,
            precio: formPrice,
            idinvearts: Number(formIdinvearts),
            unidad: units,
            capa,
            idusrmob: user?.idusrmob,
            comentario: comments
        }

        addProductToBagSellsRestaurants(productBagBody);

        goBack();
    }, [getValues, addProductToBagSellsRestaurants, user, goBack]);

    const selectAmount = useCallback(() => {
        navigate('[SellsRestaurants] - PiecesScreen', {
            from: "pieces",
            valueDefault: getValues('pieces') ?? '',
            unit: 'PZA'
        });
    }, [navigate, getValues]);

    const navigateToClass = useCallback(() => {
        if (totalClasses <= MINIMUM_CLASSES || !cvefamilia) return;
        navigate('[SellsRestaurants] - ClassScreen', {
            cvefamilia,
            totalClasses: initialIdinvearts,
            image,
            descripcio
        });
    }, [navigate, totalClasses, cvefamilia, initialIdinvearts, image, descripcio]);

    const setSellsForm = useCallback((): void => {
        const initialValues: Partial<SellsRestaurantBagForm> = {
            idinvearts: initialIdinvearts,
            price: initialPrice,
            typeClass: initialTypeClass,
            units: initialUnits
        };

        const isValid = (value: unknown): boolean => {
            if (value === undefined || value === null) return false;
            if (typeof value === 'string' && value.trim() === '') return false;
            if (typeof value === 'number' && value === NUMBER_0) return false;

            return true;
        };

        Object.entries(initialValues).forEach(([key, value]) => {
            if (isValid(value)) {
                setValue(key as keyof SellsRestaurantBagForm, value);
            }
        });
    }, [initialUnits, initialIdinvearts, initialPrice, initialTypeClass, setValue]);

    useEffect(() => {
        setTimeout(() => {
            setSellsForm();
        }, NUMBER_0);
    }, [setSellsForm]);

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
