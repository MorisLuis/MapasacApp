import React, { useCallback, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { getSearchClients } from '../../../services/searchs';
import { getClients } from '../../../services/utils';
import CardSelect from '../../../components/Cards/CardSelect';
import { LayoutSearch } from '../../../components/Layouts/LayoutSearch';
import { ClientInterface, SellsNavigationProp } from '../../../interface';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';

type SelectClientInSellScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - SelectClient'>;

interface SelectClientInSellInterface {
    route: SelectClientInSellScreenRouteProp
};


export const SelectClient = ({ route }: SelectClientInSellInterface): React.ReactElement => {

    const { client, setConfirmationSellsForm } = route?.params ?? {};

    const [itemSelected, setItemSelected] = useState<ClientInterface | undefined>(client);
    const { goBack } = useNavigation<SellsNavigationProp>();

    const handleGetClient = useCallback(async (page: number): Promise<ClientInterface[] | void> => {
        const newClients = await getClients({ page, limit: 5 });
        return newClients.clients;
    }, [])

    const handleSearchClient = useCallback(async (text: string): Promise<ClientInterface[] | void> => {
        const clientsSearch = await getSearchClients({ searchTerm: text });
        return clientsSearch.clients;
    }, [])

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
            setConfirmationSellsForm((prev) => ({ ...prev, client: itemSelected }))
            goBack();
        }
    }, [itemSelected, goBack, setConfirmationSellsForm]);

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
