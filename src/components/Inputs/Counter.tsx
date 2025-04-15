import React, { forwardRef, useRef } from 'react';
import { TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { counterStyles } from '../../theme/UI/counterStyles';
import { useTheme } from '../../context/ThemeContext';
import { globalFont } from '../../theme/appTheme';
import CustomText from '../UI/CustumText';

interface CounterInterface {
    counter: number,
    setCounter: React.Dispatch<React.SetStateAction<number>> | ((_value: number) => void),
    unit?: string;
    secondaryDesign?: boolean
}

const COUNT_1 = 1;
const COUNT_0 = 0;

export const Counter = forwardRef<TextInput, CounterInterface>(({
    counter,
    setCounter,
    unit,
    secondaryDesign
}, ref) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const inputRef = useRef<TextInput>(null);

    const addProduct = () : void => {
        setCounter(Number(counter) + COUNT_1)
    }

    const handleInputChange = (value: string) : void => {
        const normalizedValue = value.replace(',', '.');
        const decimalCount = (normalizedValue.match(/\./g) || []).length;

        if (decimalCount > COUNT_1) return;

        // Si termina en punto, concatenamos un dígito para hacer una conversión válida
        const adjustedValue = normalizedValue.endsWith('.')
            ? normalizedValue + '1'
            : normalizedValue;

        const numericValue = Number(adjustedValue);

        // Si la conversión da NaN, salimos de la función
        if (isNaN(numericValue)) return;

        setCounter(numericValue);
    }


    const subtractProduct = () : number | void => {
        if (counter <= COUNT_0) return COUNT_0;
        setCounter(Number(counter) - COUNT_1)
    }

    const modifyUnit = () : string | undefined => {
        let unitModified = unit?.trim();

        if (unitModified === "PIEZA") {
            unitModified = "PZA";
        }

        return unitModified;
    }

    return (
        <View style={counterStyles(theme).counter}>

            <TouchableOpacity onPress={subtractProduct} style={counterStyles(theme).counterButton}>
                <Icon name="remove-outline" size={hp("3.5%")} color={iconColor} />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <View style={[counterStyles(theme).inputContainer, secondaryDesign && { backgroundColor: theme.background_color }]}>
                    <TextInput
                        ref={ref}
                        value={`${counter.toString()}`}
                        onChangeText={handleInputChange}
                        keyboardType="numeric"
                        style={[counterStyles(theme).inputText, secondaryDesign && { fontSize: globalFont.font_big }]}
                    />
                    {
                        unit &&
                        <CustomText style={counterStyles(theme).unitText}>{modifyUnit()}</CustomText>
                    }
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={addProduct} style={counterStyles(theme).counterButton}>
                <Icon name="add-outline" size={hp("3.5%")} color={iconColor} />
            </TouchableOpacity>
        </View>
    )
})

Counter.displayName = 'Counter'
