import UserInterface from "../../interface/user";
import { AuthState, USER_INITIAL_STATE } from "./AuthProvider";

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: UserInterface } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }
    | { type: '[Settings] - typeOfMovement', user: UserInterface }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: USER_INITIAL_STATE,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'logout':
            return {
                status: 'not-authenticated',
                token: null,
                user: USER_INITIAL_STATE,
                errorMessage: '',
                codeBar: "",
                codeBarStatus: false
            }

        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: USER_INITIAL_STATE
            }

        case '[Settings] - typeOfMovement':
            return {
                ...state,
                user: { ...action.user }
            }

        default:
            return state;
    }


}


