import React, { JSX, useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Tag from '../../components/UI/Tag';
import ImageContainerCustum from '../../components/UI/ImageContainerCustum';
import CardButtonSecondary from '../../components/Cards/CardButtonSecondary';
import { EnlacemobInterface, SellsNavigationProp } from '../../interface';
import ClassInterface from '../../interface/class';
import { getIdinveartsProduct, getProductByEnlacemob, getProductsSellsFromFamily } from '../../services';
import { NUMBER_0 } from '../../utils/globalConstants';

type ProductDetailsSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - ProductDetailsSells'>;

interface ProductDetailsSellsInterface {
    route: ProductDetailsSellsScreenRouteProp;
}

type ExtraProductData = {
    image: string;
    descripcio: string;
    totalClasses: number;
    cvefamilia: number;
    classValue: ClassInterface
};

type ProductSellDataType = {
    idinvearts: number;
    capa: string;
    idinveclas: number;
};

const ONE_CLASS = 1;

export const ProductDetailsSells = ({
    route
}: ProductDetailsSellsInterface): React.ReactElement => {

    const { classValue, descripcio, image, totalClasses, cvefamilia } = route.params ?? {};
    const { addProductSell, methods: { watch, getValues, setValue } } = useContext(SellsBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate, goBack } = useNavigation<SellsNavigationProp>();
    const watchedValues = watch();

    // Usar un solo estado para los datos extras
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

    const onSubmit = useCallback(async () => {

        const values = getValues();
        const product: EnlacemobInterface = {
            unidad: values.units.id,
            idinvearts: values.idinvearts,
            idinveclas: values.idinveclas,
            precio: parseInt(values.price),
            cantidad: parseInt(values.pieces),
            capa: values.capa
        }

        await addProductSell(product);

        goBack();
    }, [addProductSell, getValues, goBack]);

    const handleGetProduct = useCallback(async ({ idinvearts, capa, idinveclas }: ProductSellDataType) => {

        const { product } = await getProductByEnlacemob({ idinvearts, capa, idinveclas });
        const { unidad_nombre, unidad, precio } = product ?? {};

        setValue('idinvearts', idinvearts);
        setValue('idinveclas', idinveclas);

        if (!product) return;

        if (precio) {
            setValue('price', precio.toString());
        }

        if (unidad_nombre && unidad) {
            setValue('units', { value: unidad_nombre.trim(), id: unidad });
        }

    }, [setValue]);

    const handleGoToClassScreen = (): void => {
        if (extraData.totalClasses < ONE_CLASS) return;
        navigate('[Sells] - ClassScreen', {
            cvefamilia: extraData.cvefamilia,
            descripcio: extraData.descripcio,
            image: extraData.image,
            totalClasses: extraData.totalClasses,
            classValue: extraData.classValue,
        });
    };

    const renderHeader = (): JSX.Element => (
        <>
            <View style={SellsDataScreenTheme(theme, typeTheme).header}>
                <CustomText style={SellsDataScreenTheme(theme, typeTheme).title}>
                    {extraData.descripcio.trim()}
                </CustomText>
                <Tag
                    message={`${extraData.totalClasses} ${extraData.totalClasses === ONE_CLASS ? 'Clase' : 'Clases'}`}
                    color='purple'
                    extraStyles={SellsDataScreenTheme(theme, typeTheme).title_tag}
                />
            </View>
            <ImageContainerCustum
                imageValue={extraData.image}
                size="small"
            />
        </>
    );

    const handleGetClasses = useCallback(async (): Promise<void> => {

        if (totalClasses === ONE_CLASS) {
            const { classes } = await getProductsSellsFromFamily(cvefamilia);
            const classData = classes[NUMBER_0];
            const { ridinvearts, rcapa, ridinveclas, clase } = classData;
            setValue('capa', rcapa.trim() ? rcapa.trim() : clase.trim());
            await handleGetProduct({ idinvearts: ridinvearts, capa: rcapa, idinveclas: ridinveclas })
        } else {
            const { idinvearts } = await getIdinveartsProduct(cvefamilia);
            setValue('idinvearts', idinvearts)
        }
    }, [cvefamilia, handleGetProduct, setValue, totalClasses])

    useEffect(() => {
        setExtraData(prev => ({
            image: image !== undefined ? image : prev.image,
            descripcio: descripcio !== undefined ? descripcio : prev.descripcio,
            totalClasses: totalClasses !== undefined ? totalClasses : prev.totalClasses,
            cvefamilia: cvefamilia !== undefined ? cvefamilia : prev.cvefamilia,
            classValue: classValue !== undefined ? classValue : prev.classValue,
        }));

        if (totalClasses <= ONE_CLASS) handleGetClasses();
    }, [handleGetClasses, classValue, image, descripcio, totalClasses, cvefamilia]);


    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={[SellsDataScreenTheme(theme, typeTheme).SellsDataScreen]}>
                <ScrollView
                    contentContainerStyle={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen_content}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHeader()}

                    <CardButtonSecondary
                        onPress={handleGoToClassScreen}
                        value={watchedValues['capa']}
                        label='Clase:'
                        emptyValue='Seleccionar la clase'
                        color="blue"
                        icon='resize-outline'
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[Sells] - PiecesScreen', {
                            from: "pieces",
                            valueDefault: watchedValues['pieces'] || '',
                            unit: 'PZA'
                        })}
                        value={watchedValues?.pieces || ''}
                        label='Cantidad:'
                        emptyValue='Seleccionar la cantidad'
                        color="green"
                        icon="bag-handle"
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[Sells] - UnitScreen', { valueDefault: watchedValues['units'] })}
                        value={watchedValues['units'].value}
                        label='Unidad:'
                        emptyValue='Seleccionar Unidad'
                        color="red"
                        icon="shapes"
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[Sells] - PriceScreen', { from: "price", valueDefault: watchedValues['price'], unit: 'MXN' })}
                        value={watchedValues['price']}
                        label='Precio:'
                        emptyValue='Seleccionar precio'
                        color="purple"
                        icon="pricetags"
                    />

                </ScrollView>
                <FooterScreen
                    buttonTitle="Publicar"
                    buttonOnPress={onSubmit}
                    buttonDisabled={false}
                />
            </View>
        </SafeAreaView>
    );
};
