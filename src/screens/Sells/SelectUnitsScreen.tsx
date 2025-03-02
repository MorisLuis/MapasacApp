import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import { View, TextInput, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/Screens/Sells/SelectScreenTheme';
import { getUnits } from '../../services/productsSells';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/UI/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { SellsNavigationProp, UnitType } from '../../interface/navigation';
import UnitInterface from '../../interface/units';

type SelectUnitScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - UnitScreen'>;


interface SelectAmountScreenInterface {
    route: SelectUnitScreenRouteProp;
}

const handleSelectItem = (
    item: UnitInterface,
    setValue: React.Dispatch<React.SetStateAction<UnitType>>,
    setOptionSelected: React.Dispatch<React.SetStateAction<UnitType>>
) => {
    const selectedItem = { id: item.unidad, value: item.descripcio };
    setValue(selectedItem);
    setOptionSelected(selectedItem);
};

export const SelectUnitScreen = ({ route }: SelectAmountScreenInterface) => {

    const { valueDefault } = route?.params;
    const { theme, typeTheme } = useTheme();
    const { updateFormData } = useContext(SellsBagContext);
    const navigation = useNavigation<SellsNavigationProp>();
    const { handleError } = useErrorHandler();

    const inputRef = useRef<TextInput>(null);
    const [units, setUnits] = useState<UnitInterface[] | null>(null);
    const [selectedOption, setSelectedOption] = useState<UnitType>({
        id: valueDefault?.id,
        value: valueDefault?.value
    });

    const buttonDisabled = selectedOption.id === undefined ? true : false

    const handleSave = useCallback(() => {
        updateFormData({ units: selectedOption })
        navigation.goBack();
        navigation.navigate('SellsDataScreen');
    }, [navigation, selectedOption]);

    useEffect(() => {
        inputRef.current?.focus();
        const fetchUnits = async () => {
            const unitsData = await getUnits();
            if (unitsData.error) {
                handleError(unitsData.error);
            } else {
                setUnits(unitsData);
            }
        };
        fetchUnits();
    }, []);

    const renderItem = useCallback(({ item }: { item: UnitInterface }) => (
        <CardSelect
            onPress={() => handleSelectItem(item, setSelectedOption, setSelectedOption)}
            message={`${item.descripcio.trim()} / ${item?.abrevia}`}
            sameValue={selectedOption?.id === item.idinveunid}
        />
    ), [selectedOption]);

    if (!units) {
        return <SelectClassSkeleton />
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
                <View style={SelectScreenTheme(theme, typeTheme).header}>
                    <CustomText style={SelectScreenTheme(theme, typeTheme).headerTitle}>
                        Selecciona la unidad.
                    </CustomText>
                </View>

                <FlatList
                    data={units}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.idinveunid}`}
                    onEndReachedThreshold={0}
                />

                <FooterScreen
                    buttonTitle='Agregar'
                    buttonOnPress={handleSave}
                    buttonDisabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
};
