import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getSearchClients } from '../../../services/searchs';
import { getClients } from '../../../services/utils';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CardSelect from '../../../components/Cards/CardSelect';
import { LayoutSearch } from '../../../components/Layouts/LayoutSearch';
import { ClientInterface, SellsNavigationProp } from '../../../interface';

export const SelectClient = () : React.ReactElement => {

    const { handleError } = useErrorHandler()
    const [itemSelected, setItemSelected] = useState<ClientInterface | null>(null);
    const { navigate, goBack } = useNavigation<SellsNavigationProp>();

    const handleGetClient = useCallback(async (page: number): Promise<ClientInterface[] | void> => {
        let newClients
        try {
            newClients = await getClients({ page, limit: 5 });
            return newClients.clients;
        } catch (error) {
            handleError(error)
        }
        return [];
    },[handleError])

    const handleSearchClient = useCallback(async (text: string): Promise<ClientInterface[] | void> => {
        let clientsSearch
        try {
            clientsSearch = await getSearchClients({ searchTerm: text });
            return clientsSearch.clients;
        } catch (error) {
            handleError(error)
        }
        return [];
    }, [handleError])

    const renderItem = useCallback(({ item }: { item: ClientInterface }) => (
        <CardSelect
            onPress={() => setItemSelected(item)}
            sameValue={item.idclientes === itemSelected?.idclientes}
            message={item.nombres.trim()}
            subMessage={`No. Comercial: ${item.ncomercial}`}
        />
    ), [itemSelected]);

    const onSelect = useCallback(() => {
        if (itemSelected) {
            goBack()
            navigate("[Sells] - ConfirmationScreen", { client: itemSelected });
        }
    }, [itemSelected, navigate, goBack]);

    return (
        <LayoutSearch
            handleGetItem={handleGetClient}
            handleSearchItem={handleSearchClient}
            renderItem={renderItem}
            title='cliente'
            onSelect={onSelect}
            selectAvailable={itemSelected !== null ? true : false}
        />
    );
};
