import { createContext } from 'react';

import { LoginData } from './AuthProvider';
import { UserSessionInterface } from '../../interface/user';

interface ContextProps {
    errorMessage: string;
    token: string | null;
    user: UserSessionInterface;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    loggingIn: boolean;
    signIn: (_loginData: LoginData) => void;
    logOut: (_isExpired?: boolean) => void;
    removeError: () => void;
}


export const AuthContext = createContext({} as ContextProps );