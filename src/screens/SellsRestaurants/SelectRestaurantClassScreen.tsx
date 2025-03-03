import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/Screens/Sells/SelectScreenTheme';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/UI/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { ProductSellsRestaurantInterface, SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';
import { getProductDetailsRestaurantSells } from '../../services/productsRestaurantSells';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { SellsRestaurantDataFormType } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider';

type SelectRestaClassScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ClassScreen'>;

interface SelectRestaurantClassScreenInterface {
    route: SelectRestaClassScreenRouteProp
}

export const SelectRestaurantClassScreen = ({
    route
}: SelectRestaurantClassScreenInterface) => {

    const { valueDefault, cvefamilia } = route.params ?? {};
    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { updateFormData } = useContext(SellsRestaurantBagContext);
    const { handleError } = useErrorHandler()

    const [value, setValue] = useState<ProductSellsRestaurantInterface>();
    const [valueDefaultLocal, setValueDefaultLocal] = useState<number>()
    const [classes, setClasses] = useState<ProductSellsRestaurantInterface[]>();
    const buttondisabled = !value ? true : false;

    const handleGetClasess = async () => {
        const productData = await getProductDetailsRestaurantSells(cvefamilia);
        if (productData.error) return handleError(productData.error);
        setClasses(productData)
    };

    const handleSelectOption = (value: ProductSellsRestaurantInterface) => {
        setValue(value);
    };

    const handleSave = () => {
        if(!value) return;
        const data : SellsRestaurantDataFormType = {
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


    const renderItem = ({ item }: { item: ProductSellsRestaurantInterface }) => {
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
    }, []);

    useEffect(() => {
        handleGetClasess();
    }, []);

    if (!classes) {
        return <SelectClassSkeleton />
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
                <View style={SelectScreenTheme(theme, typeTheme).header}>
                    <CustomText style={SelectScreenTheme(theme, typeTheme).headerTitle}>Selecciona el producto.</CustomText>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.idinvearts}`}
                    onEndReachedThreshold={0}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
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
