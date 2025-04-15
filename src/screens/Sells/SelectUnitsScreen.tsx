import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import { View, TextInput, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { useTheme } from '../../context/ThemeContext';
import { SelectScreenTheme } from '../../theme/Screens/Sells/SelectScreenTheme';
import { getUnits } from '../../services/productsSells';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import CustomText from '../../components/UI/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { SellsNavigationProp, UnitType } from '../../interface/navigation';
import { UnitsInterface } from '../../interface/other';
import { globalStyles } from '../../theme/appTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';

type SelectUnitScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - UnitScreen'>;


interface SelectAmountScreenInterface {
    route: SelectUnitScreenRouteProp;
}

const handleSelectItem = (
    item: UnitsInterface,
    setValue: React.Dispatch<React.SetStateAction<UnitType>>,
    setOptionSelected: React.Dispatch<React.SetStateAction<UnitType>>
): void => {
    const selectedItem: UnitType = { id: item.unidad, value: item.descripcio };

    setValue(selectedItem);
    setOptionSelected(selectedItem);
};

export const SelectUnitScreen = ({ route }: SelectAmountScreenInterface): React.ReactElement => {

    const { valueDefault } = route?.params ?? {};
    const { theme } = useTheme();
    const navigation = useNavigation<SellsNavigationProp>();
    const { methods: { setValue } } = useContext(SellsBagContext);

    const inputRef = useRef<TextInput>(null);
    const [units, setUnits] = useState<UnitsInterface[] | null>(null);
    const [selectedOption, setSelectedOption] = useState<UnitType>({
        id: valueDefault?.id,
        value: valueDefault?.value
    });

    const buttonDisabled = selectedOption.id === undefined ? true : false

    const handleSaveUnit = useCallback(() => {
        setValue('units',
            {
                id: selectedOption.id,
                value: selectedOption.value.trim()
            }
        );
        navigation.goBack();
        navigation.navigate('[Sells] - ProductDetailsSells');
    }, [navigation, selectedOption, setValue]);

    const handleGetUnits = useCallback(async (): Promise<void> => {
        const { units } = await getUnits();
        setUnits(units);
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
        handleGetUnits();
    }, [handleGetUnits]);

    const renderItem = useCallback(({ item }: { item: UnitsInterface }) => (
        <CardSelect
            onPress={() => handleSelectItem(item, setSelectedOption, setSelectedOption)}
            message={`${item.descripcio.trim()} / ${item?.abrevia}`}
            sameValue={selectedOption?.id == item.idinveunid}
        />
    ), [selectedOption]);

    if (!units) {
        return <SelectClassSkeleton />
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SelectScreenTheme(theme).SelectScreen}>
                <View style={SelectScreenTheme(theme).header}>
                    <CustomText style={SelectScreenTheme(theme).headerTitle}>
                        Selecciona la unidad.
                    </CustomText>
                </View>

                <FlatList
                    data={units}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.idinveunid}`}
                    onEndReachedThreshold={0}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                />

                <FooterScreen
                    buttonTitle='Agregar'
                    buttonOnPress={handleSaveUnit}
                    buttonDisabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
};
