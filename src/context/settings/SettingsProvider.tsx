import React, { JSX, useCallback, useReducer } from 'react';

import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';
import UserInterface from '../../interface/user';
import useErrorHandler from '../../hooks/useErrorHandler';
import { ModuleInterface } from '../../interface/utils';

export interface SettingsInterface {
    vibration?: boolean;
    cameraAvailable?: boolean;
    limitProductsScanned: number;
    user?: UserInterface | null;
    codeBarStatus?: boolean;
    codeBar?: string;
    codebarType?: number;
    startScanning?: boolean;
    actualModule: ModuleInterface['module']
};

export const SettingsInitialState: SettingsInterface = {
    vibration: true,
    cameraAvailable: true,
    limitProductsScanned: 20,
    codeBarStatus: false,
    codeBar: "",
    codebarType: 1,
    startScanning: false,
    actualModule: 'Inventory'
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) : JSX.Element => {

    const [state, dispatch] = useReducer(settingsReducer, SettingsInitialState);
    const { handleError } = useErrorHandler();

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleSetActualModule = (module: SettingsInterface['actualModule']): void => {
        dispatch({ type: '[Settings] - Module state', actualModule: module });
    }

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleVibrationState = (value: boolean): void => {
        dispatch({ type: '[Settings] - Vibration state', vibration: value });
    }

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleCameraAvailable = useCallback((value: boolean): void => {
        dispatch({ type: '[Settings] - CameraAvailable state', cameraAvailable: value });
    }, [])

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleLimitProductsScanned = (value: number): void => {
        dispatch({ type: '[Settings] - limitProductsScanned state', limitProductsScanned: value });
    }

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleSetupUser = (user: UserInterface): void => {
        dispatch({ type: '[Settings] - userSetup', user });
    }

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleCodebarScannedProcces = (value: boolean): void => {
        dispatch({ type: '[Settings] - codeBarStatus', codeBarStatus: value });
    }

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleGetCodebarType = (codebarType?: number): void => {
        if (!codebarType) return;
        dispatch({ type: '[Settings] - codebarType', codebarType: codebarType });
    }

    // Esta función es asincrónica, pero no devuelve nada, así que el tipo de retorno es Promise<void>
    const updateBarCode = async (value: string): Promise<void> => {
        try {
            handleCodebarScannedProcces(true)
            dispatch({ type: '[Settings] - codeBar', codeBar: value });
        } catch (error) {
            handleError(error)
        } finally {
            handleCodebarScannedProcces(false)
        }
    }

    // Esta función no devuelve nada, por lo que el tipo de retorno es void
    const handleStartScanning = (value: boolean): void => {
        dispatch({ type: '[Settings] - startScanning', startScanning: value });
    }

    return (
        <SettingsContext.Provider value={{
            ...state,
            handleSetActualModule,
            handleVibrationState,
            handleCameraAvailable,
            handleLimitProductsScanned,
            handleSetupUser,
            handleCodebarScannedProcces,
            handleGetCodebarType,
            handleStartScanning,
            updateBarCode,
            actualModule: state.actualModule ?? 'Inventory'
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
