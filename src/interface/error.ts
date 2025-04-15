
export interface ErrorResponse {
    response?: {
        status: number | string;
        data?: {
            error?: string;
        };
        config?: {
            method?: string;
            url?: string;
        }
    };
    message: string;
}

export const ERROR_MESSAGES: Record<number | 'GENERIC', string> = {
    400: "Solicitud incorrecta. Por favor, revisa los datos ingresados.",
    401: "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
    403: "Prohibido. No tienes permisos para realizar esta acción.",
    404: "Recurso no encontrado.",
    500: "Error interno del servidor. Intenta de nuevo más tarde.",
    GENERIC: "Algo salió mal. Por favor, inténtalo nuevamente.",
};
