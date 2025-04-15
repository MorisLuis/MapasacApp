import React, { useContext, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, Keyboard, Alert, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

import { AuthContext } from '../../context/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../theme/appTheme';
import { LoginScreenStyles } from '../../theme/LoginScreenTheme';
import { inputStyles } from '../../theme/Components/inputs';
import { LoadingScreen } from '../LoadingScreen';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { useForm } from '../../hooks/useForm';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import CustomText from '../../components/UI/CustumText';

const ERROR_EMPTY = 0;

export const LoginScreen = () : React.ReactElement => {
    const { signIn, errorMessage, removeError, loggingIn } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();

    const { usr, pas, onChange } = useForm({
        usr: '',
        pas: ''
    });

    const buttonDisabled = usr === '' || pas === ''

    useEffect(() => {
        if (errorMessage?.length === ERROR_EMPTY) return;
        Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }]);
    }, [errorMessage, removeError]);

    const onLogin = () : void => {
        Keyboard.dismiss();
        signIn({ usr, pas });
    };


    if (loggingIn) return <LoadingScreen message='Iniciando sesion...' loading={loggingIn} />;


    return (
        <KeyboardAvoidingView
            style={[LoginScreenStyles(theme).LoginScreen]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <SafeAreaView style={globalStyles().flex}>
                <View style={LoginScreenStyles(theme).formContainer}>

                    <CustomText style={LoginScreenStyles(theme).title}>M&MITSystems.</CustomText>
                    <CustomText style={LoginScreenStyles(theme).textLogin}>Ingresar datos de Usuario</CustomText>

                    <TextInput
                        label="Escribe tu usuario."
                        placeholderTextColor={theme.text_color}
                        keyboardType="email-address"
                        style={[inputStyles(theme, typeTheme).input, LoginScreenStyles(theme).formContainer_input]}
                        selectionColor={theme.text_color}
                        textColor={theme.text_color}
                        onChangeText={(value) => onChange(value, 'usr')}
                        value={usr}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                        mode="outlined"
                        theme={{
                            ...theme,
                            colors: {
                                primary: theme.color_border,
                            },
                        }}
                    />

                    <InputPassword
                        password={pas}
                        onChange={onChange}
                        onLogin={onLogin}
                        placeholder={"Escribe tu contraseña."}
                        inputName="pas"
                    />

                    <View style={LoginScreenStyles(theme).buttonContainer}>
                        <ButtonCustum
                            title="Iniciar sesión"
                            onPress={onLogin}
                            disabled={buttonDisabled}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
};