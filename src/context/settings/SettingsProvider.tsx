import React, { ReactNode, useReducer } from 'react';
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

export const SettingsProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(settingsReducer, SettingsInitialState);
    const { handleError } = useErrorHandler();

    const handleSetActualModule = ( module: SettingsInterface['actualModule'] ) => {
        dispatch({ type: '[Settings] - Module state', actualModule: module });
    }

    const handleVibrationState = (value: boolean) => {
        dispatch({ type: '[Settings] - Vibration state', vibration: value });
    }

    const handleCameraAvailable = (value: boolean) => {
        dispatch({ type: '[Settings] - CameraAvailable state', cameraAvailable: value });
    }

    const handleLimitProductsScanned = (value: number) => {
        dispatch({ type: '[Settings] - limitProductsScanned state', limitProductsScanned: value });
    }

    const handleSetupUser = (user: UserInterface) => {
        dispatch({ type: '[Settings] - userSetup', user });
    }

    const handleCodebarScannedProcces = (value: boolean) => {
        dispatch({ type: '[Settings] - codeBarStatus', codeBarStatus: value });
    }

    const handleGetCodebarType = (codebarType?: number) => {
        if(!codebarType) return;
        dispatch({ type: '[Settings] - codebarType', codebarType: codebarType });
    }

    // Just to store de codebar.
    const updateBarCode = async (value: string) => {
        console.log("value from updateBarCode:", value)
        try {
            handleCodebarScannedProcces(true)
            dispatch({ type: '[Settings] - codeBar', codeBar: value });
        } catch (error) {
            handleError(error)
        } finally {
            handleCodebarScannedProcces(false)
        }
    }


    const handleStartScanning = (value: boolean) => {
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
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}