import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { useTheme } from '../../context/ThemeContext';
import { SelectScreenTheme } from '../../theme/Screens/Sells/SelectScreenTheme';
import CustomText from '../../components/UI/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { ProductSellsRestaurantInterface, SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';
import { getProductDetailsRestaurantSells } from '../../services/restaurants/productsRestaurantSells';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { SellsRestaurantDataFormType } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider';
import { globalStyles } from '../../theme/appTheme';

type SelectRestaClassScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ClassScreen'>;

interface SelectRestaurantClassScreenInterface {
    route: SelectRestaClassScreenRouteProp
}

export const SelectRestaurantClassScreen = ({
    route
}: SelectRestaurantClassScreenInterface) : React.ReactElement => {

    const { valueDefault, cvefamilia } = route.params ?? {};
    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { theme } = useTheme();
    const { updateFormData } = useContext(SellsRestaurantBagContext);

    const [value, setValue] = useState<ProductSellsRestaurantInterface>();
    const [valueDefaultLocal, setValueDefaultLocal] = useState<number>()
    const [classes, setClasses] = useState<ProductSellsRestaurantInterface[]>();
    const buttondisabled = !value ? true : false;

    const handleGetClasess =  useCallback(async () : Promise<void> => {
        const { product } = await getProductDetailsRestaurantSells(cvefamilia);
        setClasses(product)
    }, [cvefamilia]);

    const handleSelectOption = (value: ProductSellsRestaurantInterface) : void => {
        setValue(value);
    };

    const handleSave = () : void => {
        if (!value) return;
        const data: SellsRestaurantDataFormType = {
            descripcio: value.producto,
            image: value.imagen,
            price: value.precio,
            capa: value.capa,
            typeClass: { id: value.idinveclas, value: value.producto },
            units: value.unidad,
            idinvearts: value.idinvearts,
        };

        updateFormData(data)
        navigation.goBack();
        navigation.navigate('SellsRestaurantsDataScreen');
    };


    const renderItem = ({ item }: { item: ProductSellsRestaurantInterface }) : React.ReactElement => {
        return (
            <CardSelect
                onPress={() => handleSelectOption(item)}
                message={item.producto}
                sameValue={value ? item?.idinvearts === value?.idinvearts : item?.idinvearts === valueDefaultLocal}
            />
        )
    }

    useEffect(() => {
        if (valueDefault) setValueDefaultLocal(valueDefault);
    }, [valueDefault]);

    useEffect(() => {
        handleGetClasess();
    }, [handleGetClasess]);

    if (!classes) {
        return <SelectClassSkeleton />
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SelectScreenTheme(theme).SelectScreen}>
                <View style={SelectScreenTheme(theme).header}>
                    <CustomText style={SelectScreenTheme(theme).headerTitle}>Selecciona el producto.</CustomText>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.idinvearts}`}
                    onEndReachedThreshold={0}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                />

                <FooterScreen
                    buttonTitle="Agregar"
                    buttonOnPress={handleSave}
                    buttonDisabled={buttondisabled}
                />
            </View>
        </SafeAreaView>
    )
};
