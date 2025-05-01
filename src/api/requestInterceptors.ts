// requestInterceptors.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('token');
    const { method, url } = config;

    if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('[📡 API REQUEST]', method?.toUpperCase(), url);
    };


    // Asegurarse que headers existe
    config.headers = config.headers || {};

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};
