import { useCallback, useContext } from 'react';
import Toast from 'react-native-toast-message';

import { ERROR_MESSAGES, ErrorResponse } from '../interface/error';
import { sendError, sendErrorInterface } from '../services/errors';
import { ERROR_400, ERROR_401, ERROR_403, ERROR_404, ERROR_500 } from '../utils/globalConstants';
import { AuthContext } from '../context/auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useErrorHandler = (): {
    handleError: (_error: unknown, _avoidAPI?: boolean, _avoidToast?: boolean) => Promise<void>;
} => {

    const { user } = useContext(AuthContext)

    const handleError = useCallback(async (
        error: unknown,
        avoidSave?: boolean,
        avoidToast?: boolean,
    ): Promise<void> => {
        
        const err = error as ErrorResponse;
        const status = err.response?.status;
        const message = err.response?.data?.error
        const method = err.response?.config?.method
        const url = err.response?.config?.url

        // eslint-disable-next-line no-console
        console.log("Error capturado:", `${status}-${message}`);

        if (status) {
            switch (status) {
                case ERROR_400:
                    Toast.show({
                        type: 'tomatoError',
                        text1: message ?? ERROR_MESSAGES[ERROR_400]
                    });
                    break;
                case ERROR_401:
                    if (avoidToast) break
                    Toast.show({
                        type: 'tomatoError',
                        text1: ERROR_MESSAGES[ERROR_401]
                    });
                    // Lógica de refrescar el token o cerrar sesión:
                    // Ej.: authContext.logout();
                    break;
                case ERROR_403:
                    Toast.show({
                        type: 'tomatoError',
                        text1: message ?? ERROR_MESSAGES[ERROR_403],
                    });
                    break;
                case ERROR_404:
                    Toast.show({
                        type: 'tomatoError',
                        text1: message ?? ERROR_MESSAGES[ERROR_404],
                    });
                    break;
                case ERROR_500:
                    Toast.show({
                        type: 'tomatoError',
                        text1: message ?? ERROR_MESSAGES[ERROR_500],
                    });
                    // Opcional: Si la petición es idempotente, podés implementar
                    // lógica para reintentar con backoff exponencial.
                    break;
                default:
                    Toast.show({
                        type: 'tomatoError',
                        text1: ERROR_MESSAGES.GENERIC,
                    });
                    break;
            }
        } else {
            // Errores sin status, como problemas de red o errores en la configuración
            Toast.show({
                type: 'tomatoError',
                text1: err.message || ERROR_MESSAGES.GENERIC
            });
        };

        const erroBody: sendErrorInterface = {
            From: url ?? "",
            Message: message ?? "",
            Id_Usuario: user?.idusrmob ?? "Sin usuario",
            Metodo: method ?? "",
            code: status ?? ""
        };

        if (!avoidSave) {
            const token = await AsyncStorage.getItem('token');
            if(!token) return;
            await sendError(erroBody)
        }
    }, [user?.idusrmob]);

    return {
        handleError
    };
};

export default useErrorHandler;