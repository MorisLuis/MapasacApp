// api.ts

import axios from 'axios';
import { requestInterceptor } from './requestInterceptors';
import { responseInterceptor, errorResponseInterceptor } from './responseInterceptors';

/* https://mapasac-api-yk8mu.ondigitalocean.app */
/* http://192.168.100.29:5001 */

export const domain = 'http://192.168.1.10:5001'

// Configuración básica de la conexión a la API.
export const api = axios.create({
    baseURL: domain,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Agregar interceptor de solicitud.
api.interceptors.request.use(
    requestInterceptor, // Aquí aplicamos la función de interceptor de solicitud.
    (error) => Promise.reject(error)
);

// Agregar interceptores de respuesta
api.interceptors.response.use(
    responseInterceptor,
    errorResponseInterceptor
);
