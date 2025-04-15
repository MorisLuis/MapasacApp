import { createContext } from "react";

import UserInterface from "../../interface/user";
import { SettingsInterface } from "./SettingsProvider";

interface ContextProps {
    handleSetActualModule: (_module: SettingsInterface['actualModule']) => void;
    handleVibrationState: (_value: boolean) => void;
    handleCameraAvailable: (_value: boolean) => void;
    handleLimitProductsScanned: (_value: number) => void;
    handleSetupUser: (_value: UserInterface) => void;
    handleCodebarScannedProcces: (_value: boolean) => void;
    handleGetCodebarType: (_value?: number) => void;
    handleStartScanning: (_value: boolean) => void;
    updateBarCode: (_value: string) => void;

    vibration?: boolean;
    cameraAvailable?: boolean;
    limitProductsScanned: number;
    codebarType?: number;
    codeBar?: string; 
    codeBarStatus?: boolean;
    startScanning?: boolean
    actualModule: SettingsInterface['actualModule']
}

export const SettingsContext = createContext({} as ContextProps)