import React, { useState, useEffect, forwardRef, JSX } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputContentSizeChangeEventData, View, ViewStyle } from 'react-native';

import CustomText from '../UI/CustumText';
import { textInputContainerStyles } from '../../theme/Components/inputs';
import { useTheme } from '../../hooks/styles/useTheme';

interface TextInputContainerInterface {
    placeholder?: string;
    label?: string;
    setComments: (_value: string) => void;
    value?: string;
    onFocus?: () => void;
    styles?: StyleProp<ViewStyle>;
}

const TEXT_HEIGH = 50;

export const TextInputContainer = forwardRef<TextInput, TextInputContainerInterface>(({
    placeholder = "Escribe algo...",
    label,
    setComments,
    value,
    onFocus,
    styles
}, ref): JSX.Element => {

    const [height, setHeight] = useState(TEXT_HEIGH);
    const [localValue, setLocalValue] = useState<string>(value || '');
    const { theme, size } = useTheme();

    useEffect(() => {
        if (value) {
            setLocalValue(value);  // Inicializar el valor interno
        }
    }, [value]);

    const handleTextChange = (text: string): void => {
        setLocalValue(text);
        setComments(text);
    };

    const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>): void => {
        const contentHeight = event.nativeEvent.contentSize.height;
        setHeight(contentHeight < TEXT_HEIGH ? TEXT_HEIGH : contentHeight);  // Ajustar la altura dinámica
    };

    return (
        <View>
            {label && (
                <CustomText style={textInputContainerStyles(theme, height, size).label}>
                    {label}
                </CustomText>
            )}

            <TextInput
                ref={ref}
                style={[textInputContainerStyles(theme, height, size).input, styles]}
                onChangeText={handleTextChange}
                multiline={true}
                placeholder={placeholder}
                onContentSizeChange={handleContentSizeChange}
                placeholderTextColor={theme.text_color}
                value={localValue}
                onFocus={onFocus}
            />
        </View>
    );
});

TextInputContainer.displayName = 'TextInputContainer';
