import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SelectScreenTheme } from '../../theme/Screens/Sells/SelectScreenTheme';
import CustomText from '../../components/UI/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { ProductSellsRestaurantInterface, SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';
import { getProductDetailsRestaurantSells } from '../../services/restaurants/productsRestaurantSells';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { globalStyles } from '../../theme/appTheme';
import { SellsRestaurantBagForm } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider.interface';
import { useTheme } from '../../hooks/styles/useTheme';

type SelectRestaClassScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ClassScreen'>;

interface SelectRestaurantClassScreenInterface {
    route: SelectRestaClassScreenRouteProp
}

export const SelectRestaurantClassScreen = ({
    route
}: SelectRestaurantClassScreenInterface): React.ReactElement => {

    const { cvefamilia } = route.params;
    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { theme, size } = useTheme();
    const { updateFormData } = useContext(SellsRestaurantBagContext);

    const [value, setValue] = useState<ProductSellsRestaurantInterface>();
    const [valueDefaultLocal] = useState<number>()
    const [classes, setClasses] = useState<ProductSellsRestaurantInterface[]>();
    const buttondisabled = !value ? true : false;

    const handleGetClasess = useCallback(async (): Promise<void> => {
        const { product } = await getProductDetailsRestaurantSells(cvefamilia as number);
        setClasses(product)
    }, [cvefamilia]);

    const handleSelectClass = (value: ProductSellsRestaurantInterface): void => {
        setValue(value);
    };

    const handleSaveClass = (): void => {
        if (!value) return;
        const data: SellsRestaurantBagForm = {
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
        navigation.navigate('[SellsRestaurants] - SellsRestaurantsDetailsScreen');
    };


    const renderItem = ({ item }: { item: ProductSellsRestaurantInterface }): React.ReactElement => {
        return (
            <CardSelect
                onPress={() => handleSelectClass(item)}
                message={item.producto}
                sameValue={value ? item?.idinvearts === value?.idinvearts : item?.idinvearts === valueDefaultLocal}
            />
        )
    }

    useEffect(() => {
        handleGetClasess();
    }, [handleGetClasess]);

    if (!classes) {
        return <SelectClassSkeleton />
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }} >
            <View style={SelectScreenTheme(theme, size).SelectScreen}>
                <View style={SelectScreenTheme(theme, size).header}>
                    <CustomText style={SelectScreenTheme(theme, size).headerTitle}>Selecciona el producto.</CustomText>
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
                    buttonOnPress={handleSaveClass}
                    buttonDisabled={buttondisabled}
                />
            </View>
        </SafeAreaView>
    )
};
