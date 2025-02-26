import { createContext } from 'react';
import { LoginData } from './AuthProvider';
import UserInterface from '../../interface/user';

interface ContextProps {
    errorMessage: string;
    token: string | null;
    user: UserInterface;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    loggingIn: boolean;
    signIn: (loginData: LoginData) => void;
    logOut: (isExpired?: boolean) => void;
    removeError: () => void;
}


export const AuthContext = createContext({} as ContextProps );