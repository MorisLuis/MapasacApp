import { api } from "../api/api";
import { ClientInterface } from "../interface";
import { ModuleInterface } from "../interface/other";

interface getClientsInterface {
    limit: number;
    page: number;
}

const getClients = async ({ limit, page }: getClientsInterface): Promise<{ clients: ClientInterface[] }> => {
    const { data } = await api.get<{ clients: ClientInterface[] }>(`/api/utils/clients?limit=${limit}&page=${page}`);
    return { clients: data.clients };
}

const getModules = async (): Promise<{ modules: ModuleInterface[] }> => {

    const { data } = await api.get<{ modules: ModuleInterface[] }>(`/api/auth/modules`);
    return { modules: data.modules };

};


export {
    getClients,
    getModules
}