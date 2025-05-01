import React, { ReactNode, useReducer, useEffect, useState, JSX, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { UserSessionInterface } from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { AppNavigationProp } from '../../interface/navigation';
import { postLogin, renewLogin } from '../../services';
import useErrorHandler from '../../hooks/useErrorHandler';
import { api } from '../../api/api';
import { setUnauthorizedHandler } from '../../api/apiCallbacks';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserSessionInterface;
    codeBar?: string;
    codeBarStatus?: boolean;
}

export interface LoginData {
    usr: string;
    pas: string;
}

export const USER_INITIAL_STATE: UserSessionInterface = {
    idusrmob: 0,
    port: 0,
    usrdba: '',
    pasdba: ''
};

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: USER_INITIAL_STATE,
    errorMessage: '',
    codeBar: '',
    codeBarStatus: false
};

const LOGIN_RESET_DELAY_MS = 300;

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const navigation = useNavigation<AppNavigationProp>();
    const { handleError } = useErrorHandler();

    const signIn = async ({ usr, pas }: LoginData): Promise<void> => {
        setLoggingIn(true);

        try {
            state.status = 'checking';
            const { token, refreshToken, user } = await postLogin({ usr, pas });

            if (!token || !refreshToken || !user) return;

            dispatch({
                type: 'signUp',
                payload: {
                    token: token,
                    user: user
                }
            });

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('refreshToken', refreshToken);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Información incorrecta';
            dispatch({
                type: 'addError',
                payload: errorMessage
            });
        } finally {
            setTimeout(() => {
                setLoggingIn(false);
            }, LOGIN_RESET_DELAY_MS);
        }
    };

    const logOut = useCallback(async (isExpired?: boolean): Promise<void> => {
        try {
            setLoggingIn(false);
            const token = await AsyncStorage.getItem('token');

            if (token) {
                if (!isExpired) await api.get('/api/auth/logout');
                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('refreshToken');
            }

            dispatch({ type: 'logout' });

            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }]
            });

        } catch (error) {
            handleError(error);
        }
    }, [handleError, navigation]);

    const logOutWithoutToken = useCallback((): void => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('refreshToken');
        dispatch({ type: 'logout' });
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }]
        });
    }, [navigation])

    const refreh = useCallback(async (): Promise<void> => {
        try {
            const refreshToken_renew = await AsyncStorage.getItem('refreshToken');

            if (!refreshToken_renew) {
                return dispatch({ type: 'notAuthenticated' });
            }

            const { refreshToken, token, user } = await renewLogin(refreshToken_renew);

            if (!token || !refreshToken || !user) return;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('refreshToken', refreshToken);

            dispatch({
                type: 'signUp',
                payload: {
                    token: token,
                    user: user
                }
            });

        } catch (error) {
            dispatch({ type: 'notAuthenticated' });
        }
    }, []);

    const removeError = useCallback((): void => {
        dispatch({ type: 'removeError' });
    }, []);

    useEffect(() => {
        refreh();
    }, [refreh]);

    useEffect(() => {
        setUnauthorizedHandler(() => {
            logOutWithoutToken();
        });
    }, [logOutWithoutToken]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                loggingIn,
                logOut,
                removeError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
