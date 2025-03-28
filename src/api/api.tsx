import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const api = axios.create(
    {
        baseURL: 'http://192.168.100.188:5001/',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)


/* export const api = axios.create(
    {
        baseURL: 'http://192.168.100.188:5001',
        headers: {
            'Content-Type': 'application/json',
        }
    }
) */



// Función para establecer el callback de navegación
let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (callback: () => void) => {
    onUnauthorized = callback;
};


// Interceptor para agregar el token a los headers
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);


// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Manejar error 401 (no autorizado)
        if (error?.response?.status === 401) {
            if (onUnauthorized) {
                onUnauthorized()
            }
            return Promise.reject(error);
        }

        // Manejar error 403 (prohibido), intentamos obtener un nuevo token
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');

                if (!refreshToken) {
                    throw new Error('No hay refresh token');
                }

                const { data } = await axios.post(
                    'http://192.168.100.188:5001/api/auth/refresh',
                    { refreshToken }
                );

                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('refreshToken', data.refreshToken);

                originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
                return api(originalRequest);
            } catch (refreshError) {

                // Manejar error 403 (prohibido) despues de intentar refresh token.
                const status = error.response?.status
                if (status === 403) {
                    if (onUnauthorized) {
                        onUnauthorized()
                    }
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
