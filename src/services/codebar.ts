import Toast from "react-native-toast-message";

import { api } from "../api/api";

interface updateCostosInterface {
    idinvearts: number;
    codebarras: string;
};

const updateCodeBar = async ({
    idinvearts,
    codebarras
}: updateCostosInterface): Promise<{ message?: string; error?: unknown }> => {

    const { data } = await api.put<{ message: string }>(`/api/product/codebar/${idinvearts}`, { codbarras: codebarras });
    Toast.show({
        type: 'tomatoToast',
        text1: 'Se actualizó el codigo de barras!'
    })
    return { message: data.message };
}

export {
    updateCodeBar
}