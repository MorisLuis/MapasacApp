import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';

import { inputStyles } from '../../theme/Components/inputs';
import { useTheme } from '../../hooks/styles/useTheme';

type FieldType = 'pas'


interface InputPasswordInterface {
    password?: string;
    onChange: (_value: string, _field: FieldType) => void;
    onLogin: () => void;
    placeholder: string;

    inputName: FieldType
}

export const InputPassword: React.FC<InputPasswordInterface> = ({
    password,
    onChange,
    onLogin,
    placeholder,
    inputName
}: InputPasswordInterface) => {

    const { theme, typeTheme, size } = useTheme();
    const [showPassword, setShowPassword] = useState(false);


    return (
        <View style={[inputStyles({ theme, typeTheme, size }).passwordContainer]}>

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

                style={[inputStyles({theme, typeTheme, size}).input, inputStyles({theme, typeTheme, size}).passwordInput]}
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
                style={inputStyles({theme, typeTheme, size}).passwordToggle}
            >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={theme.text_color} />
            </TouchableOpacity>
        </View>
    )
};