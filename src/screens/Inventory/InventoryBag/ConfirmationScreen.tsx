import React, { useCallback, useContext, useState } from 'react';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getBagInventory } from '../../../services/bag';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';
import ProductInterface from '../../../interface/product';
import { CombinedInventoryAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postInventory } from '../../../services';

export const ConfirmationScreen = () => {

    const { numberOfItems, resetAfterPost } = useContext(InventoryBagContext);
    const navigation = useNavigation<NativeStackNavigationProp<CombinedInventoryAndAppNavigationStackParamList>>();
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const { handleError } = useErrorHandler()

    const onPostInventory = async () => {
        setCreateInventaryLoading(true);
        try {
            const inventory = await postInventory();

            if ('error' in inventory) {
                return handleError(inventory);
            }
    
            resetAfterPost();

            navigation.navigate('succesMessageScreen', { 
                redirection: 'InventoryNavigation',
                from: 'Inventory',
                numberOfProducts: numberOfItems,
                folio: inventory.data.folio
            });

        } catch (error) {
            handleError(error);
        } finally {
            setCreateInventaryLoading(false);
        }
    };

    const loadBags = async () => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const newBags = await getBagInventory({ page, limit: 5, option: 0 });

            if (newBags.error) {
                handleError(newBags);
                return;
            }

            if (newBags && newBags.length > 0) {
                setBags((prevBags: ProductInterface[]) => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }

    };

    const refreshBags = async () => {

        try {
            setIsLoading(true);
            const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 0 });

            if (refreshedBags.error) {
                handleError(refreshedBags);
                return;
            }

            setBags(refreshedBags);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(2);
            setIsLoading(false);
            setHasMore(true);
            setDataUploaded(true)
        };

    };

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => (
        <ProductInventoryCard
            product={item}
            onClick={() => navigation.navigate('[Modal] - editProductInBag', { product: item })}
        />
    ), [createInventaryLoading]);

    useFocusEffect(
        useCallback(() => {
            refreshBags();
        }, [])
    );

    return (
        <LayoutConfirmation
            data={bags}
            renderItem={renderItem}
            loadBags={loadBags}
            Type='Inventory'
            onPost={onPostInventory}
            loadData={dataUploaded}
            availableToPost={true}
            buttonPostDisabled={createInventaryLoading}
            numberOfItems={numberOfItems}
        />
    )
};