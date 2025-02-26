import React, { useRef, useCallback } from 'react';
import { TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { counterSecondaryStyles } from '../../theme/UI/counterStyles';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/Components/buttons';
import CustomText from '../UI/CustumText';

interface CounterInterface {
    counter: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    unit?: string;
    secondaryDesign?: boolean;
}

const formatValue = (input: string): string => {
    // Si el input comienza con '0' y no es '0.' (para números decimales), eliminarlo
    if (input.startsWith('0') && input.length > 1) {
        input = input.substring(1);
    }

    const decimalPlaces = 2;
    const regex = new RegExp(`^\\d*(\\.\\d{0,${decimalPlaces}})?`);
    const formattedValue = input.match(regex)?.[0] || '';
    return formattedValue;
};

export const CounterSecondary: React.FC<CounterInterface> = ({
    counter,
    setValue,
    unit,
    secondaryDesign = false,
}) => {
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? 'white' : 'black';
    const inputRef = useRef<TextInput>(null);


    const addProduct = useCallback(() => {
        const newValue = parseFloat(counter) + 1;
        setValue(formatValue(newValue.toString()));
    }, [counter, setValue]);

    const subtractProduct = useCallback(() => {
        const currentValue = parseFloat(counter);
        if (currentValue <= 0) return;
        const newValue = currentValue - 1;
        setValue(formatValue(newValue.toString()));
    }, [counter, setValue]);

    const handleClean = useCallback(() => {
        const newValue = formatValue("0");
        setValue(newValue);
    }, [counter, setValue]);

    const handleInputChange = useCallback((input: string) => {
        if (!isNaN(parseFloat(input))) {
            const newValue = formatValue(input);
            setValue(newValue);
        }
    }, [setValue]);

    const onFocus = useCallback(() => {
        if (counter.startsWith("0")) {
            setValue(counter.substring(1))
        }
    }, [])

    return (
        <View>
            <View style={counterSecondaryStyles(theme).counter}>
                <TouchableOpacity onPress={subtractProduct} style={counterSecondaryStyles(theme).counterButton}>
                    <Icon name="remove-outline" size={hp('3.5%')} color={iconColor} />
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                    <View style={[counterSecondaryStyles(theme).inputContainer, secondaryDesign && { backgroundColor: theme.background_color }]}>
                        <TextInput
                            ref={inputRef}
                            value={counter}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                            style={[counterSecondaryStyles(theme).inputText]}
                            onFocus={onFocus}
                        />
                        {unit && <CustomText style={counterSecondaryStyles(theme).unitText}>{unit}</CustomText>}
                    </View>
                </TouchableWithoutFeedback>

                <TouchableOpacity onPress={addProduct} style={counterSecondaryStyles(theme).counterButton}>
                    <Icon name="add-outline" size={hp('3.5%')} color={iconColor} />
                </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <View style={{ width: "40%", minWidth: 100 }}>
                    <TouchableOpacity
                        onPress={handleClean}
                        style={[buttonStyles(theme).button_small, buttonStyles(theme).light]}
                    >
                        <CustomText style={buttonStyles(theme).buttonTextClear}>Limpiar</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
