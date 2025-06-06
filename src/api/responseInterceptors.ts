// responseInterceptors.ts
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { triggerUnauthorized } from './apiCallbacks';
import { getIsLoggingOut } from '../context/auth/AuthService';
import { domain } from './api';

const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Interceptor para respuestas exitosas (sin modificación, pero se mantiene para consistencia)
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

// Interceptor de errores – centralizamos el manejo de distintos status y casos especiales
export const errorResponseInterceptor = async (error: AxiosError): Promise<never> => {


    // Extraemos la configuración original y el status de la respuesta si existe
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error.response?.status;
    const message = (error.response?.data as { error?: string })?.error;

    if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(`🚨 [${status}] - ${message}`);
    };


    // Si ya se está ejecutando un proceso de logout, evitamos loops
    if (getIsLoggingOut()) {
        return Promise.reject(error);
    }

    // Manejo global del timeout (y otros errores de conexión)
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        Toast.show({
            type: 'error',
            text1: 'Conexión lenta ⏳',
            text2: 'No pudimos conectar. Intenta de nuevo.',
        });
        return Promise.reject(error);
    }

    // Caso 401: No autorizado → Cerramos sesión ( solo eliminando token's )
    if (status === HTTP_STATUS.UNAUTHORIZED) {
        triggerUnauthorized();
        return Promise.reject(error);
    }

    // Caso 403: Prohibido → Intentamos refrescar el token (si aún no se hizo)
    if (status === HTTP_STATUS.FORBIDDEN && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (!refreshToken) {
                triggerUnauthorized();
                return Promise.reject(new Error('No hay refresh token'));
            }

            const { data } = await axios.post(`${domain}api/auth/refresh`, { refreshToken });
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('refreshToken', data.refreshToken);

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

            return axios(originalRequest);
        } catch (refreshError) {
            triggerUnauthorized();
            return Promise.reject(refreshError);
        }
    };

    // Caso 500: Error interno del servidor
    if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        Toast.show({
            type: 'error',
            text1: 'Error del servidor 😓',
            text2: 'Estamos trabajando en ello. Intenta más tarde.',
        });
        return Promise.reject(error);
    }

    // Para todos los demás errores, simplemente retornamos el rechazo
    return Promise.reject(message ?? error);
};
