import UserInterface from "../../interface/user"
import { ModuleInterface } from "../../interface/utils";

export interface SettingsState {
    vibration?: boolean;
    cameraAvailable?: boolean;
    limitProductsScanned: number;
    user?: UserInterface | null;
    codeBarStatus?: boolean;
    codeBar?: string;
    codebarType?: number;
    startScanning?: boolean;
    actualModule:  ModuleInterface['module']
}


type SettingsActionType =
    | { type: '[Settings] - Module state', actualModule: SettingsState['actualModule'] }
    | { type: '[Settings] - Vibration state', vibration: boolean }
    | { type: '[Settings] - CameraAvailable state', cameraAvailable: boolean }
    | { type: '[Settings] - limitProductsScanned state', limitProductsScanned: number }
    | { type: '[Settings] - userSetup', user: UserInterface }
    | { type: '[Settings] - codeBarStatus', codeBarStatus: boolean }
    | { type: '[Settings] - codeBar', codeBar: string }
    | { type: '[Settings] - codebarType', codebarType: number }
    | { type: '[Settings] - startScanning', startScanning: boolean }

export const settingsReducer = (state: SettingsState, action: SettingsActionType): SettingsState => {

    switch (action.type) {

        case '[Settings] - Module state':
            return {
                ...state,
                actualModule: action.actualModule
            }

        case '[Settings] - Vibration state':
            return {
                ...state,
                vibration: action.vibration
            }

        case '[Settings] - CameraAvailable state':
            return {
                ...state,
                cameraAvailable: action.cameraAvailable
            }

        case '[Settings] - limitProductsScanned state':
            return {
                ...state,
                limitProductsScanned: action.limitProductsScanned
            }

        case '[Settings] - userSetup':
            return {
                ...state,
                user: action.user
            }

        case '[Settings] - codeBarStatus':
            return {
                ...state,
                codeBarStatus: action.codeBarStatus
            }

        case '[Settings] - codeBar':
            return {
                ...state,
                codeBar: action.codeBar
            }

        case '[Settings] - codebarType':
            return {
                ...state,
                codebarType: action.codebarType
            }

        case '[Settings] - startScanning':
            return {
                ...state,
                startScanning: action.startScanning
            }

        default:
            return state
    }

}