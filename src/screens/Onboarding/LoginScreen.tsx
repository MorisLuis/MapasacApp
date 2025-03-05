import React, { useContext, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, Keyboard, Alert, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import { globalStyles } from '../../theme/appTheme';
import { LoginScreenStyles } from '../../theme/LoginScreenTheme';
import { inputStyles } from '../../theme/Components/inputs';
import { LoadingScreen } from '../LoadingScreen';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { TextInput } from 'react-native-paper';
import { useForm } from '../../hooks/useForm';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import { useProtectPage } from '../../hooks/useProtectPage';
import CustomText from '../../components/UI/CustumText';


export const LoginScreen = () => {
    const { signIn, errorMessage, removeError, loggingIn, status } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();

    const { usr, pas, onChange } = useForm({
        usr: '',
        pas: ''
    });

    const buttonDisabled = usr === '' || pas === ''

    useEffect(() => {
        if (errorMessage?.length === 0) return;
        Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }]);
    }, []);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ usr, pas });
    };

    const { protectThisPage } = useProtectPage({
        protectionCondition: status === 'authenticated',
        navigatePage: 'OnboardingScreen'
    })

    if (loggingIn) return <LoadingScreen message='Iniciando sesion...' loading={loggingIn} />;

    if (protectThisPage) {
        <LoadingScreen message='Redireccionando...' loading={!protectThisPage} />
    }

    return (
        <KeyboardAvoidingView
            style={[LoginScreenStyles(theme).LoginScreen]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={LoginScreenStyles(theme).formContainer}>

                    <CustomText style={LoginScreenStyles(theme).title}>M&MITSystems.</CustomText>
                    <CustomText style={LoginScreenStyles(theme).textLogin}>Ingresar datos de Usuario</CustomText>

                    <TextInput
                        label="Escribe tu usuario."
                        placeholderTextColor={theme.text_color}
                        keyboardType="email-address"
                        style={[inputStyles(theme, typeTheme).input, globalStyles(theme).globalMarginBottomSmall, { borderWidth: 0, paddingHorizontal: globalStyles(theme).globalPadding.padding / 2 }]}
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

