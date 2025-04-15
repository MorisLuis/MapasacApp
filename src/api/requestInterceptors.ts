// requestInterceptors.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('token');

    // Asegurarse que headers existe
    config.headers = config.headers || {};

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};
