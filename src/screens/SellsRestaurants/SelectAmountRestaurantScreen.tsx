import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectAmountScreenTheme } from '../../theme/Screens/Sells/SelectAmountScreenTheme';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CounterSecondary } from '../../components/Inputs/CounterSecondary';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';

type PiecesScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - PiecesScreen'>;

interface SelectAmountScreenInterface {
    route: PiecesScreenRouteProp
}

export const SelectAmountRestaurantScreen = ({
    route
}: SelectAmountScreenInterface) => {

    const { theme, typeTheme } = useTheme();
    const { valueDefault, unit } = route.params;
    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { updateFormData } = useContext(SellsRestaurantBagContext);

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>(valueDefault !== '' ? valueDefault : "0");
    const buttondisabled = parseInt(value) <= 0;

    const handleSave = () => {
        updateFormData({ pieces: value })
        navigation.goBack();
        navigation.navigate('SellsRestaurantsDataScreen');
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
                    <CustomText style={SelectAmountScreenTheme(theme, typeTheme).headerTitle}>Escribe la cantidad.</CustomText>
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
