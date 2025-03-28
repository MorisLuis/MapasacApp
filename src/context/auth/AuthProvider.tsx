import React, { ReactNode } from 'react';
import { useReducer, useEffect, useState } from 'react';

import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { AppNavigationProp } from '../../interface/navigation';
import { postLogin, renewLogin } from '../../services';
import useErrorHandler from '../../hooks/useErrorHandler';
import { api } from '../../api/api';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface;
    codeBar?: string;
    codeBarStatus?: boolean
}

export interface LoginData {
    usr: string;
    pas: string;
}

export const USER_INITIAL_STATE = {
    idusrmob: 0,
    idsucursal: 0,
    port: 0,
    usrdba: '',
    pasdba: ''
}

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: USER_INITIAL_STATE,
    errorMessage: '',
    codeBar: "",
    codeBarStatus: false
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const navigation = useNavigation<AppNavigationProp>();
    const { handleError } = useErrorHandler()


    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const refreshToken = await AsyncStorage.getItem('refreshToken');

            // No token, no autenticado
            if (!token) return dispatch({ type: 'notAuthenticated' });
            if (!refreshToken) return dispatch({ type: 'notAuthenticated' });

            // Hay token
            const resp = await renewLogin(token, refreshToken);

            // Verificamos si resp contiene error
            if ('error' in resp) {
                return dispatch({ type: 'notAuthenticated' });
            }

            await AsyncStorage.setItem('token', resp.data.token);
            await AsyncStorage.setItem('refreshToken', resp.data.refreshToken);
            
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });

        } catch (error) {
            return dispatch({ type: 'notAuthenticated' });
        }
    };

    const signIn = async ({ usr, pas }: LoginData) => {
        setLoggingIn(true);

        try {
            state.status = "checking";
            const data = await postLogin({ usr, pas });

            dispatch({
                type: "signUp",
                payload: {
                    token: data.token,
                    user: data.user,
                },
            });

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('refreshToken', data.refreshToken);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Información incorrecta";
            dispatch({
                type: "addError",
                payload: errorMessage,
            });
        } finally {
            setTimeout(() => {
                setLoggingIn(false);
            }, 300);
        }
    };

    const logOut = async (isExpired?: boolean) => {

        try {
            setLoggingIn(false);
            if (!isExpired) await api.get('/api/auth/logout');
            AsyncStorage.removeItem('token');
            dispatch({ type: 'logout' });
            if (!isExpired) {
                navigation.goBack();
                navigation.navigate('LoginPage')
            };
        } catch (error) {
            handleError(error)
        }
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            loggingIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>

    )
};