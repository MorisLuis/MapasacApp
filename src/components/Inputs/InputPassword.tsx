import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { inputStyles } from '../../theme/Components/inputs';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { globalStyles } from '../../theme/appTheme';

type FieldType = 'pas'


interface InputPasswordInterface {
    password?: string;
    onChange: (value: string, field: FieldType) => void;
    onLogin: () => void;
    placeholder: string;

    inputName: FieldType
}

export const InputPassword = ({
    password,
    onChange,
    onLogin,
    placeholder,
    inputName
}: InputPasswordInterface) => {

    const { theme, typeTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);


    return (
        <View style={[inputStyles(theme, typeTheme).passwordContainer]}>

            <TextInput
                label={placeholder}
                placeholderTextColor={theme.text_color}
                secureTextEntry={!showPassword}
                selectionColor={theme.text_color}
                onChangeText={(value) => onChange(value, inputName)}
                value={password}
                onSubmitEditing={onLogin}
                autoCapitalize="none"
                autoCorrect={false}
                textColor={theme.text_color}

                style={[inputStyles(theme, typeTheme).input, inputStyles(theme, typeTheme).passwordInput, { borderWidth: 0, paddingHorizontal: globalStyles(theme).globalPadding.padding / 2 }]}
                mode="outlined"
                theme={{
                    ...theme,
                    colors: {
                        primary: theme.color_border,
                    },
                }}
            />
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={inputStyles(theme, typeTheme).passwordToggle}
            >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={theme.text_color} />
            </TouchableOpacity>
        </View>
    )
};