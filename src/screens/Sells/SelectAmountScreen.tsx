import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectAmountScreenTheme } from '../../theme/Screens/Sells/SelectAmountScreenTheme';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CounterSecondary } from '../../components/Inputs/CounterSecondary';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { SellsNavigationProp } from '../../interface/navigation';

type PiecesScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - PiecesScreen'>;
type PriceScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - PriceScreen'>;

interface SelectAmountScreenInterface {
    route: PiecesScreenRouteProp | PriceScreenRouteProp
}

export const SelectAmountScreen = ({
    route
}: SelectAmountScreenInterface) => {

    const { valueDefault, unit, from } = route.params;
    const { theme, typeTheme } = useTheme();
    const navigation = useNavigation<SellsNavigationProp>();
    const { updateFormData } = useContext(SellsBagContext);

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>(valueDefault ?? "0");
    const buttondisabled = parseInt(value) <= 0;

    const handleSave = () => {
        navigation.goBack()
        if (from === 'pieces') {
            updateFormData({ pieces: value })
            navigation.navigate('SellsDataScreen');
        } else {
            updateFormData({ price: value })
            navigation.navigate('SellsDataScreen');
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={SelectAmountScreenTheme(theme, typeTheme).SelectAmountScreen}>
                <View style={SelectAmountScreenTheme(theme, typeTheme).header}>
                    <CustomText style={SelectAmountScreenTheme(theme, typeTheme).headerTitle}>Escribe { from === 'price' ? 'el precio' : 'la cantidad' }</CustomText>
                </View>

                <View style={SelectAmountScreenTheme(theme, typeTheme).amountContent}>
                    <View style={SelectAmountScreenTheme(theme, typeTheme).amountContainer}>
                        <CounterSecondary
                            counter={value}
                            unit={unit}
                            setValue={setValue}
                        />
                    </View>
                </View>

                <FooterScreen
                    buttonTitle="Agregar"
                    buttonOnPress={handleSave}
                    buttonDisabled={buttondisabled}
                />
            </View>
        </KeyboardAvoidingView>
    );
};
