import { AxiosError } from "axios";


export interface ErrorCustum {
    status: number;
    Message: string;
    Metodo: string;
}
export interface ErrorResponseData {
    error?: string;
    message?: string;
}

export type CustomAxiosError = AxiosError<ErrorResponseData, unknown>;

export interface BackendErrorDetail {
    errors: Array<{
        message: string;
        context: Record<string, unknown>;
    }>;
}
