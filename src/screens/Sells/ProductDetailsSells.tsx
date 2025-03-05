import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { globalFont } from '../../theme/appTheme';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { getIdinveartsProduct, getProductByEnlacemob, getProductsSellsFromFamily, getTotalClassesSells } from '../../services/productsSells';
import { EnlacemobInterface } from '../../interface/enlacemob';
import { AuthContext } from '../../context/auth/AuthContext';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/UI/CustumText';
import ImageContainerCustum from '../../components/UI/ImageContainerCustum';
import FooterScreen from '../../components/Navigation/FooterScreen';
import Tag from '../../components/UI/Tag';
import CardButton from '../../components/Cards/CardButton';
import CardSelectSkeleton from '../../components/Skeletons/CardSelectSkeleton';
import { SellsNavigationProp, UnitType } from '../../interface/navigation';

export type FormType = {
    pieces: string;
    price: string;
    typeClass: UnitType;
    units: UnitType;
    capa: string;
    idinveclas: number;
};

type ProductSellDataType = {
    idinvearts: number;
    capa: string;
    idinveclas: number;
};

export const ProductDetailsSells = () => {

    const { user } = useContext(AuthContext);
    const { addProductSell, formSellsData } = useContext(SellsBagContext);

    const {
        pieces,
        price,
        typeClass,
        units,
        cvefamilia,
        productSellData,
        descripcio,
        image,
        totalClasses
    } = formSellsData;

    const { typeTheme, theme } = useTheme();
    const { goBack, navigate } = useNavigation<SellsNavigationProp>();
    const { handleError } = useErrorHandler();

    const [title, setTitle] = useState<string>();
    const [idInveartsValue, setIdInveartsValue] = useState<number>();
    const [cveFamiliaValue, setCveFamiliaValue] = useState<number>();

    const { control, handleSubmit, setValue, getValues, watch } = useForm<FormType, unknown>({
        defaultValues: {
            pieces: pieces,
            price: price,
            typeClass: typeClass,
            units: units,
            capa: typeClass?.value,
            idinveclas: undefined
        },
    });

    const hasClasses = (totalClasses ?? 0) > 0;
    const formCompleted = watch("typeClass") && watch('units') && watch('price') && watch('pieces');
    const buttonDisabled = !hasClasses ? !(watch('units') && watch('price') && watch('pieces')) : !formCompleted;

    const onSubmit = useCallback(() => {
        const { pieces, price, typeClass, units, capa, idinveclas } = getValues();

        // 1. Validation
        if (!idinveclas && hasClasses) return console.log("Information is missing");
        const parsedPieces = parseFloat(pieces);
        const parsedPrice = parseFloat(price);
        const parsedTypeClass = Number(typeClass?.id) || idInveartsValue;
        const parsedUnits = Number(units.id);
        const parsedIdinveclas = idinveclas;
        const userId = user?.idusrmob ?? 0;

        if (!parsedTypeClass) return console.log("parsedTypeClass is missing");

        const bagProduct: EnlacemobInterface = {
            cantidad: isNaN(parsedPieces) ? 0 : parsedPieces,
            precio: isNaN(parsedPrice) ? 0 : parsedPrice,
            idinvearts: isNaN(parsedTypeClass) ? 0 : parsedTypeClass,
            unidad: parsedUnits,
            capa: capa || '',
            idusrmob: userId,
            idinveclas: parsedIdinveclas
        };

        // 2. Submit
        addProductSell(bagProduct);

        // 3. Navigation
        goBack();
    }, [getValues, hasClasses, idInveartsValue, goBack, addProductSell, user?.idusrmob]);

    const handleGetProduct = useCallback(async ({ idinvearts, capa, idinveclas }: ProductSellDataType) => {
        try {
            const product = await getProductByEnlacemob({ idinvearts, capa, idinveclas });

            setValue('capa', capa);
            setValue("idinveclas", idinveclas);
            if (!product) return
            if (product.error) return handleError(product.error);
            setValue('price', product?.precio.toString());
            setValue('units', { value: product?.unidad_nombre?.trim(), id: product?.unidad });
            if (typeClass) setValue('typeClass', { id: typeClass.id, value: typeClass.value });

        } catch (error) {
            handleError(error);
        }
    }, [setValue, typeClass]);

    const handleGetIdInvearts = useCallback(async () => {
        /* IdInvearts Es el id del consecutivo de a tabla de productos llamada invearts. */

        if (!cvefamilia) return;

        try {
            // 1. Get total classes ( or capas )
            const totalClassesData = await getTotalClassesSells(cvefamilia);
            if (totalClassesData.error) return handleError(totalClassesData.error);

            // If has classes.
            if (totalClassesData == "1") {

                // 2. Get classes ( or capas )
                const classesData = await getProductsSellsFromFamily(cvefamilia);
                if (classesData.error) return handleError(classesData.error);
                const clases = classesData[0];

                // 3. Set value of typeClass.
                // This would be used to in idinvearts to post in bagProduct: EnlacemobInterface.
                const { ridinvearts: idinvearts, rcapa: capa, ridinveclas: idinveclas } = clases ?? {};
                setValue('typeClass', { id: clases.ridinvearts, value: clases.rproducto });

                // 4. Get product details
                handleGetProduct({ idinvearts, capa, idinveclas });
            } else if (totalClassesData == "0") {

                // 5. Get idinvearts to post in bagProduct: EnlacemobInterface.
                const product = await getIdinveartsProduct(cvefamilia);
                if (product.error) return handleError(product.error);
                setIdInveartsValue(product.idinvearts);
            }
        } catch (error) {
            handleError(error);
        }

    }, [cvefamilia, setValue]);

    const handleGoToClassScreen = () => {

        // If they has classes.
        if ((totalClasses ?? 0) > 1) {
            if (!productSellData?.capa) return;
            navigate('[Sells] - ClassScreen',
                {
                    valueDefault: {
                        clase: getValues('typeClass').value,
                        rcapa: productSellData?.capa,
                        ridinvearts: productSellData?.idinvearts,
                        ridinveclas: productSellData?.idinveclas,
                        rproducto: getValues('typeClass').value
                    },
                    cvefamilia: cveFamiliaValue
                });
        }
    };

    // Reset Values
    useEffect(() => {
        // The data comes from props.
        // To Form
        if (pieces) setValue('pieces', pieces);
        if (price) setValue('price', price);
        if (typeClass) setValue('typeClass', typeClass);
        if (units) setValue('units', units);

        // To Page
        if (cvefamilia) setCveFamiliaValue(cvefamilia);
        if (descripcio) setTitle(descripcio);

        // Get idinvearts just when dont have it.
        if (!watch('typeClass') && !idInveartsValue) {
            handleGetIdInvearts();
        }

    }, [pieces, price, typeClass, units, cvefamilia, descripcio, image]);

    // Get product when came from 'SelectClassScreen'.
    useEffect(() => {
        if (!productSellData) return;
        const { idinvearts, capa, idinveclas } = productSellData ?? {};
        handleGetProduct({ idinvearts, capa, idinveclas });
    }, [productSellData]);

    const renderHeader = () => {
        return (
            <>
                <View style={SellsDataScreenTheme(theme, typeTheme).header}>
                    <CustomText style={SellsDataScreenTheme(theme, typeTheme).title}>
                        {title?.trim()}
                    </CustomText>
                    <Tag
                        message={`${totalClasses} ${totalClasses == 1 ? 'Clase' : 'Clases'}`}
                        color='purple'
                        extraStyles={{ marginBottom: globalFont.font_sm / 2 }}
                    />
                </View>
                <ImageContainerCustum
                    imageValue={image}
                    size="small"
                />
            </>
        )
    }

    if (!watch('typeClass') && !idInveartsValue) {
        return (
            <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
                {renderHeader()}
                <FlatList
                    data={Array(4).fill({})}
                    renderItem={() => <CardSelectSkeleton />}
                    keyExtractor={(_, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
                <ScrollView>
                    {renderHeader()}

                    <CardButton
                        onPress={handleGoToClassScreen}
                        label='Clase:'
                        valueDefault='Seleccionar la clase'
                        color='blue'
                        control={control}
                        controlValue='typeClass'
                        icon='resize-outline'
                        specialValue={getValues('typeClass') === undefined ? "NO TIENE CLASE" : undefined}
                    />
                    <CardButton
                        onPress={() => navigate('[Sells] - PiecesScreen', { from: "pieces", valueDefault: getValues('pieces'), unit: 'PZA' })}
                        label='Cantidad:'
                        valueDefault='Seleccionar cantidad'
                        color='green'
                        control={control}
                        controlValue='pieces'
                        icon="bag-handle"
                    />
                    <CardButton
                        onPress={() => navigate('[Sells] - UnitScreen', { valueDefault: getValues('units') })}
                        label='Unidad:'
                        valueDefault='Seleccionar Unidad'
                        color='red'
                        control={control}
                        controlValue='units'
                        icon="shapes"
                    />
                    <CardButton
                        onPress={() => navigate('[Sells] - PriceScreen', { from: "price", valueDefault: getValues('price'), unit: 'MXN' })}
                        label='Precio:'
                        valueDefault='Seleccionar precio'
                        color='purple'
                        control={control}
                        controlValue='price'
                        icon="pricetags"
                        isPrice={true}
                    />
                </ScrollView>
                <FooterScreen
                    buttonTitle="Publicar"
                    buttonOnPress={handleSubmit(onSubmit)}
                    buttonDisabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
};