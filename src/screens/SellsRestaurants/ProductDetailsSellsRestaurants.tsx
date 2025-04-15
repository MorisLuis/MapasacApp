import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../context/ThemeContext';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import CustomText from '../../components/UI/CustumText';
import ImageContainerCustum from '../../components/UI/ImageContainerCustum';
import FooterScreen from '../../components/Navigation/FooterScreen';
import CardButton from '../../components/Cards/CardButton';
import { EnlacemobInterface, SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { SellsRestaurantDataFormType } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider';


const DEFAULT_VALUE = 0;
const MINIMUM_CLASSES = 1;

export const ProductDetailsSellsRestaurants = () : React.ReactElement => {

    const { user } = useContext(AuthContext);
    const { addProductSell, formSellsData } = useContext(SellsRestaurantBagContext);

    const {
        pieces,
        price,
        typeClass,
        units,
        descripcio,
        image,
        capa,
        idinvearts,
        comments,
        totalClasses,
        cvefamilia
    } = formSellsData;

    const { typeTheme, theme } = useTheme();
    const { goBack, navigate } = useNavigation<SellsRestaurantNavigationProp>();
    const [title, setTitle] = useState<string>();

    const { control, handleSubmit, setValue, getValues, watch } = useForm<SellsRestaurantDataFormType>({
        defaultValues: {
            pieces: pieces,
            price: price,
            capa: capa,
            typeClass: typeClass,
            comments: comments
        },
    });

    const formCompleted = watch('price') && watch('pieces');
    const buttonDisabled = !formCompleted;

    const onSubmit = () : void => {
        const { pieces, price, capa, comments } = getValues();

        const parsedPieces = parseFloat(pieces ?? '');
        const parsedidinvearts = Number(idinvearts)
        const userId = user?.idusrmob;

        const bagProduct: EnlacemobInterface = {
            cantidad: isNaN(parsedPieces) ? DEFAULT_VALUE : parsedPieces,
            precio: price ?? DEFAULT_VALUE,
            idinvearts: parsedidinvearts ?? DEFAULT_VALUE,
            unidad: units ?? DEFAULT_VALUE,
            capa: capa ?? '',
            idusrmob: userId,
            comentario: comments
        };

        goBack();
        addProductSell(bagProduct);
    };

    const selectAmount = () : void => {
        navigate('[SellsRestaurants] - PiecesScreen', { from: "pieces", valueDefault: getValues('pieces') ?? '', unit: 'PZA' })
    };

    const handleNavigateToClass = () : void => {
        if (totalClasses && totalClasses <= MINIMUM_CLASSES) return;
        if (!cvefamilia) return;
        navigate('[SellsRestaurants] - ClassScreen', { cvefamilia: cvefamilia, valueDefault: idinvearts });
    }

    // Reset Values
    useEffect(() => {
        // The data comes from props.
        if (pieces) setValue('pieces', pieces);
        if (price) setValue('price', price);
        if (descripcio) setTitle(descripcio);
        if (comments) setValue('comments', comments);
        if (typeClass) setValue('typeClass', typeClass);

    }, [pieces, price, descripcio, comments, typeClass, setValue]);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
                <ScrollView>
                    <View style={SellsDataScreenTheme(theme, typeTheme).header}>
                        <CustomText style={SellsDataScreenTheme(theme, typeTheme).title}>
                            {title?.trim()}
                        </CustomText>
                    </View>

                    <ImageContainerCustum
                        imageValue={image}
                        size="small"
                    />

                    <>
                        <CardButton
                            onPress={handleNavigateToClass}
                            label='Clase:'
                            valueDefault='Seleccionar la clase'
                            color='blue'
                            control={control}
                            controlValue='typeClass'
                            icon='resize-outline'
                        />

                        <CardButton
                            //onPress={() => console.log("")}
                            label='Precio:'
                            valueDefault='Seleccionar precio'
                            color='purple'
                            control={control}
                            controlValue='price'
                            icon="pricetags"
                            isPrice={true}
                        />

                        <CardButton
                            onPress={selectAmount}
                            label='Cantidad:'
                            valueDefault='Seleccionar cantidad'
                            color='green'
                            control={control}
                            controlValue='pieces'
                            icon="bag-handle"
                        />

                        <CardButton
                            onPress={() => navigate('[SellsRestaurants] - CommentInProduct')}
                            label='Comentarios:'
                            valueDefault='Escribir comentario'
                            color='red'
                            control={control}
                            controlValue='comments'
                            icon="chatbox"
                        />
                    </>
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