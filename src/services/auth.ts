import { api } from "../api/api";

interface postLoginInterface {
    usr: string,
    pas: string
}

const postLogin = async ({ usr, pas }: postLoginInterface) => {
    try {
        const { data } = await api.post('/api/auth/login', { usr, pas });
        return data;
    } catch (error) {
        return { error: error };
    }
}

const renewLogin = async (token: string, refreshToken: string) => {

    try {
        const resp = await api.post(
            '/api/auth/renew',
            { refreshToken },
            {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token || ''
                }
            }
        );
        return resp;
    } catch (error) {
        return { error: error };
    }

}

export {
    postLogin,
    renewLogin
}
