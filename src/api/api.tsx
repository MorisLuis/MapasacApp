import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/* export const api = axios.create(
    {
        baseURL: 'https://seashell-app-96ulh.ondigitalocean.app/',
        headers: {
            'Content-Type': 'application/json',
        }
    }
) */


export const api = axios.create(
    {
        baseURL: 'http://192.168.0.11:5001',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)


// Interceptor de request (ya lo tienes)
api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.data) {
            // Se rechaza la promesa con el objeto de error ya formateado
            return Promise.reject(error.response.data);
        }
        // Si no existe error.response.data, se envía un objeto con la estructura deseada
        return Promise.reject({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
);
