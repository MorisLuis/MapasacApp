import React, { useState, useEffect, forwardRef } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputContentSizeChangeEventData, View, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { globalFont, globalStyles } from '../../theme/appTheme';
import CustomText from '../UI/CustumText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface TextInputContainerInterface {
    placeholder?: string;
    label?: string;
    setComments: (value: string) => void;
    value?: string;
    onFocus?: () => void;
    styles?:  StyleProp<ViewStyle>;
}

export const TextInputContainer = forwardRef<TextInput, TextInputContainerInterface>(({
    placeholder = "Escribe algo...",
    label,
    setComments,
    value,
    onFocus,
    styles
}, ref) => {
    const [height, setHeight] = useState(50);
    const [localValue, setLocalValue] = useState<string>(value || '');
    const { theme } = useTheme();

    useEffect(() => {
        if (value) {
            setLocalValue(value);  // Inicializar el valor interno
        }
    }, [value]);

    const handleTextChange = (text: string) => {
        setLocalValue(text); 
        setComments(text);
    };

    const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        setHeight(contentHeight < 50 ? 50 : contentHeight);  // Ajustar la altura dinámica
    };

    return (
        <View>
            {label && (
                <CustomText style={{
                    fontSize: globalFont.font_normal,
                    color: theme.text_color
                }}>
                    {label}
                </CustomText>
            )}

            <TextInput
                ref={ref}
                style={[{
                    height: height,
                    backgroundColor: theme.background_color_secondary,
                    paddingHorizontal: globalStyles(theme).globalPadding.padding,
                    borderWidth: 0.2,
                    borderColor: theme.color_border,
                    borderRadius: globalStyles().borderRadius.borderRadius / 2,
                    color: theme.text_color,
                    minHeight: hp("5%")
                }, styles ]}
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
