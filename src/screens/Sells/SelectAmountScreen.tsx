import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StyleSheet,
    ViewStyle,
    SafeAreaView
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SelectAmountScreenTheme } from '../../theme/Screens/Sells/SelectAmountScreenTheme';
import { CounterSecondary } from '../../components/Inputs/CounterSecondary';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsNavigationProp } from '../../interface/navigation';
import { globalStyles } from '../../theme/appTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { useTheme } from '../../hooks/styles/useTheme';
import { NUMBER_2 } from '../../utils/globalConstants';

type PiecesScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - PiecesScreen'>;
type PriceScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - PriceScreen'>;

interface SelectAmountScreenInterface {
    route: PiecesScreenRouteProp | PriceScreenRouteProp;
}

const AMOUNT_ZERO = 0;

export const SelectAmountScreen = ({
    route
}: SelectAmountScreenInterface): React.ReactElement => {
    const { valueDefault, unit, from } = route.params;
    const { theme, size } = useTheme();
    const navigation = useNavigation<SellsNavigationProp>();
    const { methods: { setValue } } = useContext(SellsBagContext);

    const [valueCounter, setValueCounter] = useState<string>("0");
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const buttonDisabled = parseInt(valueCounter !== '' ? valueCounter : "0") <= AMOUNT_ZERO;

    const handleSave = (): void => {
        setValue(from, valueCounter);
        navigation.goBack();
        navigation.navigate('[Sells] - SellsProductDetails');
    };

    useEffect(() => {
        setValueCounter(valueDefault === "" ? "0" : valueDefault);
    }, [valueDefault]);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () : void => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={globalStyles().flex}
        >
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }} >
                <View style={SelectAmountScreenTheme(theme, size).SelectAmountScreen}>
                    <View style={SelectAmountScreenTheme(theme, size).header}>
                        <CustomText style={SelectAmountScreenTheme(theme, size).headerTitle}>
                            Escribe {from === 'price' ? 'el precio' : 'la cantidad'}
                        </CustomText>
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
                        buttonDisabled={buttonDisabled}
                        extraStyles={keyboardVisible ? styles.footerKeyboardActive : {}}
                    />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    footerKeyboardActive: {
        position: 'relative',
        right: 0,
        marginBottom: globalStyles().globalMarginBottom.marginBottom * NUMBER_2
    } as ViewStyle
});
