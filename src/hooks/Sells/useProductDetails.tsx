import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { EnlacemobInterface, SellsNavigationProp } from "../../interface";
import { ExtraProductData, Route, useProductDetailsResponse } from "./useProductDetails.interface";
import { NUMBER_0 } from "../../utils/globalConstants";
import { SellsBagContext } from "../../context/Sells/SellsBagContext";
import { getIdinveartsProduct, getProductByEnlacemob, getProductsSellsFromFamily } from "../../services";

type ProductSellDataType = {
    idinvearts: number;
    capa: string;
    idinveclas: number;
};

const DEFAULT_VALUE_TOTALCLASSES = 0;
const DEFAULT_VALUE_CVEFAMILIA = 0;
const ONE_CLASS = 1;

export function useProductDetails(route: { params: Route['params'] }): useProductDetailsResponse {

    const params = route.params ?? {};
    const {
        classValue,
        descripcio = '',
        image = '',
        totalClasses = DEFAULT_VALUE_TOTALCLASSES,
        cvefamilia = DEFAULT_VALUE_CVEFAMILIA
    } = params;

    // Contexts
    const { addProductToBagSells, methods: { watch, getValues, setValue } } = useContext(SellsBagContext);
    const { goBack, navigate } = useNavigation<SellsNavigationProp>();

    // State local
    const [extraData, setExtraData] = useState<ExtraProductData>({
        image: '',
        descripcio: '',
        totalClasses: 0,
        cvefamilia: 0,
        classValue: {
            clase: "",
            rcapa: "",
            ridinvearts: 0,
            ridinveclas: 0,
            rproducto: ''
        }
    });

    
    const watchedValues = watch();
    const formCompleted = Boolean(watchedValues.price && watchedValues.pieces && watchedValues.units.value);
    const buttonDisabled = !formCompleted;

    // Actions
    const submitBagProduct = useCallback(async () => {
        const values = getValues();
        const product: EnlacemobInterface = {
            unidad: values.units.id,
            idinvearts: values.idinvearts,
            idinveclas: values.idinveclas,
            precio: parseFloat(values.price),
            cantidad: parseFloat(values.pieces),
            capa: values.capa
        };

        await addProductToBagSells(product);

        goBack();
    }, [getValues, addProductToBagSells, goBack]);

    const navigateToClass = useCallback(() => {
        if (extraData.totalClasses < ONE_CLASS) return;
        navigate('[Sells] - ClassScreen', {
            cvefamilia: extraData.cvefamilia,
            descripcio: extraData.descripcio,
            image: extraData.image,
            totalClasses: extraData.totalClasses,
            classValue: extraData.classValue,
        });
    }, [navigate, extraData.totalClasses, extraData.cvefamilia, extraData.image, extraData.descripcio, extraData.classValue]);

    const getProductDetails = useCallback(async ({ idinvearts, capa, idinveclas }: ProductSellDataType) => {

        const { products } = await getProductByEnlacemob({ idinvearts, capa, idinveclas });
        const { unidad_nombre, unidad, precio } = products ?? {};

        setValue('idinvearts', idinvearts);
        setValue('idinveclas', idinveclas);

        if (!products) return;

        if (precio) {
            setValue('price', precio.toString());
        }

        if (unidad_nombre && unidad) {
            setValue('units', { value: unidad_nombre.trim(), id: unidad });
        }

    }, [setValue]);

    const getClasses = useCallback(async (): Promise<void> => {

        if (extraData.totalClasses === ONE_CLASS) {
            const { classes } = await getProductsSellsFromFamily(extraData.cvefamilia);
            const classData = classes[NUMBER_0];
            const { ridinvearts, rcapa, ridinveclas, clase } = classData;
            setValue('capa', rcapa.trim() ? rcapa.trim() : clase.trim());
            await getProductDetails({ idinvearts: ridinvearts, capa: rcapa, idinveclas: ridinveclas })
        } else {
            const { idinvearts } = await getIdinveartsProduct(extraData.cvefamilia);
            setValue('idinvearts', idinvearts)
        }
    }, [extraData.cvefamilia, getProductDetails, setValue, extraData.totalClasses])

    useEffect(() => {
        setExtraData(prev => ({
            image: image?.trim() ? image : prev.image,
            descripcio: descripcio?.trim() ? descripcio : prev.descripcio,
            totalClasses: (totalClasses !== undefined) && (totalClasses !== NUMBER_0) ? totalClasses : prev.totalClasses,
            cvefamilia: (cvefamilia !== undefined) && (cvefamilia !== NUMBER_0) ? cvefamilia : prev.cvefamilia,
            classValue: classValue !== undefined ? classValue : prev.classValue,
        }));

        if (totalClasses <= ONE_CLASS) getClasses();
    }, [getClasses, classValue, image, descripcio, totalClasses, cvefamilia]);

    return {
        extraData,
        watchedValues,
        submitBagProduct,
        navigateToClass,
        buttonDisabled
    };
}