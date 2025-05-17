import React, { useCallback, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { getBagInventory } from '../../../services/bag/bag';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import { CombinedInventoryAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postInventory } from '../../../services';
import { CombinedProductInterface, ProductInterface } from '../../../interface';
import ProductConfirmationCard from '../../../components/Cards/ProductCard/ProductConfirmationCard';

export const ConfirmationScreen = (): React.ReactElement => {

    const { numberOfItems, resetAfterPost, productAdded } = useContext(InventoryBagContext);
    const navigation = useNavigation<NativeStackNavigationProp<CombinedInventoryAndAppNavigationStackParamList>>();
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);

    const handlePostInventory = async (): Promise<void> => {
        setCreateInventaryLoading(true);

        const { folio } = await postInventory();
        resetAfterPost();

        navigation.navigate('succesMessageScreen', {
            redirection: 'InventoryNavigation',
            from: 'Inventory',
            numberOfProducts: numberOfItems,
            folio: folio
        });

        setCreateInventaryLoading(false);

    };

    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => (
        <ProductConfirmationCard
            product={item}
            onClick={() => navigation.navigate('[Modal] - editProductInBag', { product: item as ProductInterface })}
        />
    ), [navigation]);

    return (
        <LayoutConfirmation
            option={0}
            queryFn={getBagInventory}
            queryKey={['confirmation', 'inventory']}

            renderItem={renderItem}
            type='Inventory'

            onPost={handlePostInventory}
            availableToPost={true}
            buttonPostDisabled={createInventaryLoading}
            numberOfItems={numberOfItems}
            productAdded={productAdded}
        />
    )
};