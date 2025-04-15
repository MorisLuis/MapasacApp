import { api } from "../api/api";
import { UserSessionInterface } from "../interface";

interface postLoginInterface {
    usr: string,
    pas: string
}

const postLogin = async ({
    usr,
    pas
}: postLoginInterface): Promise<{ user?: UserSessionInterface, token?: string, refreshToken?: string }> => {
    const { data: { user, token, refreshToken } } = await api.post<{ user: UserSessionInterface, token: string, refreshToken: string }>('/api/auth/login', { usr, pas });
    return { user, token, refreshToken };
};

const renewLogin = async (
    token_renew: string,
    refreshToken_renew: string
): Promise<{ user?: UserSessionInterface, token?: string, refreshToken?: string }> => {

    const { data: { user, token, refreshToken } } = await api.post<{ user: UserSessionInterface, token: string, refreshToken: string }>(
        '/api/auth/renew',
        { refreshToken: refreshToken_renew },
        {
            headers: {
                'Content-type': 'application/json',
                'x-token': token_renew || ''
            }
        }
    );
    return { user, token, refreshToken };

}

export {
    postLogin,
    renewLogin
}
