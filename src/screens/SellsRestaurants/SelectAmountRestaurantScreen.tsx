import React, { useState, useEffect, useContext } from 'react';
import { View, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SelectAmountScreenTheme } from '../../theme/Screens/Sells/SelectAmountScreenTheme';
import { CounterSecondary } from '../../components/Inputs/CounterSecondary';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../hooks/styles/useTheme';

type PiecesScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - PiecesScreen'>;

interface SelectAmountScreenInterface {
    route: PiecesScreenRouteProp
}

const AMOUNT_ZERO = 0;

export const SelectAmountRestaurantScreen = ({
    route
}: SelectAmountScreenInterface): React.ReactElement => {

    const { theme, size } = useTheme();
    const { valueDefault, unit } = route.params;
    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { methods: { setValue } } = useContext(SellsRestaurantBagContext);

    const [valueCounter, setValueCounter] = useState<string>("0");
    const buttondisabled = parseInt(valueCounter !== '' ? valueCounter : "0") <= AMOUNT_ZERO;

    const handleSave = (): void => {
        setValue('pieces', valueCounter) // temporal
        navigation.goBack();
        navigation.navigate('[SellsRestaurants] - SellsRestaurantsDetailsScreen');
    };

    useEffect(() => {
        setValueCounter(valueDefault === "" ? "0" : valueDefault)
    }, [valueDefault]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={globalStyles().flex}
        >
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }} >
                <View style={SelectAmountScreenTheme(theme, size).SelectAmountScreen}>
                    <View style={SelectAmountScreenTheme(theme, size).header}>
                        <CustomText style={SelectAmountScreenTheme(theme, size).headerTitle}>Escribe la cantidad.</CustomText>
                    </View>

                    <View style={SelectAmountScreenTheme(theme, size).amountContent}>
                        <View style={SelectAmountScreenTheme(theme, size).amountContainer}>
                            <CounterSecondary
                                counter={valueCounter}
                                unit={unit}
                                setValue={setValueCounter}
                            />
                        </View>
                    </View>

                    <FooterScreen
                        buttonTitle="Agregar"
                        buttonOnPress={handleSave}
                        buttonDisabled={buttondisabled}
                    />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

