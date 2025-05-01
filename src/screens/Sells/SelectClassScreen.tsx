import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import { useTheme } from '../../context/ThemeContext';
import { SelectScreenTheme } from '../../theme/Screens/Sells/SelectScreenTheme';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import ClassInterface from '../../interface/class';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import CustomText from '../../components/UI/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { SellsNavigationProp } from '../../interface/navigation';
import { globalStyles } from '../../theme/appTheme';
import { NUMBER_0 } from '../../utils/globalConstants';


type SelectClassScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - ClassScreen'>;

interface SelectClassScreenInterface {
    route: SelectClassScreenRouteProp
};

export const SelectClassScreen = ({
    route
}: SelectClassScreenInterface): React.ReactElement => {

    const { classValue, cvefamilia, descripcio, image, totalClasses } = route.params;
    const navigation = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const { methods: { setValue } } = useContext(SellsBagContext);

    const [classes, setClasses] = useState<ClassInterface[]>();
    const [optionSelected, setOptionSelected] = useState<ClassInterface>();
    const isCapa = classes?.[NUMBER_0]?.rcapa?.trim() !== "";
    //const buttondisabled = !value ? true : false;
    const buttondisabled = false;

    const insets = useSafeAreaInsets();

    const handleSelectClass = (classValue: ClassInterface): void => {
        setOptionSelected({
            ridinvearts: classValue.ridinvearts,
            rcapa: classValue.rcapa?.trim(),
            rproducto: classValue.rproducto,
            ridinveclas: classValue.ridinveclas,
            clase: classValue.clase
        })
    };

    const handleSaveClass = (): void => {

        if (!optionSelected) {
            return;
        };

        setValue('idinvearts', optionSelected.ridinvearts);
        setValue('idinveclas', optionSelected.ridinveclas);
        setValue('capa', optionSelected.rcapa ? optionSelected.rcapa.trim() : optionSelected.clase.trim());

        navigation.goBack();
        navigation.navigate('[Sells] - ProductDetailsSells',
            {
                descripcio,
                image,
                totalClasses,
                cvefamilia,
                classValue: optionSelected
            }
        );
    };

    const handleGetClasess = useCallback(async (): Promise<void> => {
        const { classes } = await getProductsSellsFromFamily(cvefamilia);
        setClasses(classes)
    }, [cvefamilia]);

    const renderItem = ({ item }: { item: ClassInterface }): React.ReactElement => {
        const sameValue = (item.rcapa && item?.rcapa?.trim() !== "") ? item?.rcapa?.trim() === optionSelected?.rcapa?.trim() : item.ridinveclas === optionSelected?.ridinveclas;
        return (
            <CardSelect
                onPress={() => handleSelectClass(item)}
                message={(item.rcapa && item?.rcapa?.trim() !== "") ? item?.rcapa?.trim() : item.clase}
                sameValue={sameValue}
            />
        )
    }

    useEffect(() => {
        handleGetClasess();
    }, [handleGetClasess]);

    useEffect(() => {
        if (!classValue) return;
        setOptionSelected(classValue)
    }, [classValue]);


    if (!classes) {
        return <SelectClassSkeleton />
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SelectScreenTheme(theme).SelectScreen}>
                <View style={SelectScreenTheme(theme).header}>
                    <CustomText style={SelectScreenTheme(theme).headerTitle}>Selecciona {isCapa ? "la capa" : "el tipo"}.</CustomText>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={product => `${(product.rcapa && product.rcapa.trim() !== "") ? product.rcapa : product.ridinveclas}`}
                    onEndReachedThreshold={0}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + heightPercentageToDP('5%'),
                    }}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                />

                <FooterScreen
                    buttonTitle="Agregar"
                    buttonOnPress={handleSaveClass}
                    buttonDisabled={buttondisabled}
                />
            </View>
        </SafeAreaView>
    )
};
