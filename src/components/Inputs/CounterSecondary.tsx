import React, { useRef, useCallback } from 'react';
import { TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { counterSecondaryStyles } from '../../theme/UI/counterStyles';
import { buttonStyles } from '../../theme/Components/buttons';
import CustomText from '../UI/CustumText';
import { NUMBER_0 } from '../../utils/globalConstants';
import { useTheme } from '../../hooks/styles/useTheme';

interface CounterInterface {
    counter: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    unit?: string;
    secondaryDesign?: boolean;
};

const COUNT_1 = 1;
const COUNT_0 = 0;

const formatValue = (input: string): string => {

    // Si el input comienza con '0' y no es '0.' (para números decimales), eliminarlo
    if (input.startsWith('0') && input.length > COUNT_1) {
        input = input.substring(COUNT_1);
    }

    const decimalPlaces = 2;
    const regex = new RegExp(`^\\d*(\\.\\d{0,${decimalPlaces}})?`);
    const formattedValue = input.match(regex)?.[NUMBER_0] || '';
    return formattedValue;
};

export const CounterSecondary: React.FC<CounterInterface> = ({
    counter,
    setValue,
    unit,
    secondaryDesign = false,
}) => {
    const { theme, typeTheme, size } = useTheme();
    const iconColor = typeTheme === 'dark' ? 'white' : 'black';
    const inputRef = useRef<TextInput>(null);

    const addProduct = useCallback(() => {
        const newValue = parseFloat(counter) + COUNT_1;
        setValue(formatValue(newValue.toString()));
    }, [counter, setValue]);

    const subtractProduct = useCallback(() => {
        const currentValue = parseFloat(counter);
        if (currentValue <= COUNT_0) return;
        const newValue = currentValue - COUNT_1;
        setValue(formatValue(newValue.toString()));
    }, [counter, setValue]);

    const handleClean = useCallback(() => {
        const newValue = formatValue("0");
        setValue(newValue);
    }, [setValue]);

    const handleInputChange = useCallback((input: string) => {
        if (!isNaN(parseFloat(input))) {
            const newValue = formatValue(input);
            setValue(newValue);
        }
    }, [setValue]);

    const onFocus = useCallback(() => {
        if (counter.startsWith("0")) {
            setValue(counter.substring(COUNT_1))
        }
    }, [counter, setValue])

    return (
        <View>
            <View style={counterSecondaryStyles(theme, size).counter}>
                <TouchableOpacity onPress={subtractProduct} style={counterSecondaryStyles(theme, size).counterButton}>
                    <Icon name="remove-outline" size={size('3.5%')} color={iconColor} />
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                    <View style={[counterSecondaryStyles(theme, size).inputContainer, secondaryDesign && { backgroundColor: theme.background_color }]}>
                        <TextInput
                            ref={inputRef}
                            value={counter}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                            style={[counterSecondaryStyles(theme, size).inputText]}
                            onFocus={onFocus}
                        />
                        {unit && <CustomText style={counterSecondaryStyles(theme, size).unitText}>{unit}</CustomText>}
                    </View>
                </TouchableWithoutFeedback>

                <TouchableOpacity onPress={addProduct} style={counterSecondaryStyles(theme, size).counterButton}>
                    <Icon name="add-outline" size={size('3.5%')} color={iconColor} />
                </TouchableOpacity>
            </View>

            <View style={counterSecondaryStyles(theme, size).counterClean}>
                <View style={counterSecondaryStyles(theme, size).counterClean_content}>
                    <TouchableOpacity
                        onPress={handleClean}
                        style={[buttonStyles({ theme, size }).button_small, buttonStyles({ theme, size }).light]}
                    >
                        <CustomText style={buttonStyles({ theme, size }).buttonTextClear}>Limpiar</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
