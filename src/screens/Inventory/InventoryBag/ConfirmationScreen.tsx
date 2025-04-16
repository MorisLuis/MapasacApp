import React, { useCallback, useContext, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { getBagInventory } from '../../../services/bag';
import LayoutConfirmation, { CombinedProductInterface } from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { CombinedInventoryAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postInventory } from '../../../services';
import { ProductInterface } from '../../../interface';
import ProductConfirmationCard from '../../../components/Cards/ProductCard/ProductConfirmationCard';



const INITIAL_PAGE = 1;
const PAGE_2 = 2;
const MIN_PRODUCT_LENGTH = 0;

export const ConfirmationScreen = () : React.ReactElement => {

    const { numberOfItems, resetAfterPost } = useContext(InventoryBagContext);
    const navigation = useNavigation<NativeStackNavigationProp<CombinedInventoryAndAppNavigationStackParamList>>();
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [bags, setBags] = useState<CombinedProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const { handleError } = useErrorHandler();

    const onPostInventory = async (): Promise<void> => {
        setCreateInventaryLoading(true);
        try {
            const { folio } = await postInventory();
            resetAfterPost();

            navigation.navigate('succesMessageScreen', {
                redirection: 'InventoryNavigation',
                from: 'Inventory',
                numberOfProducts: numberOfItems,
                folio: folio
            });

        } catch (error) {
            handleError(error);
        } finally {
            setCreateInventaryLoading(false);
        }
    };

    const loadBags = async (): Promise<void> => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const { bag } = await getBagInventory({ page, limit: 5, option: 0 });

            if (bag && bag.length > MIN_PRODUCT_LENGTH) {
                setBags((prevBags: CombinedProductInterface[]) => [...prevBags, ...bag]);
                setPage(page + INITIAL_PAGE);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshBags = useCallback(async (): Promise<void> => {

        try {
            setIsLoading(true);

            const { bag } = await getBagInventory({ page: 1, limit: 5, option: 0 });

            setBags(bag);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(PAGE_2);
            setIsLoading(false);
            setHasMore(true);
            setDataUploaded(true)
        };

    },[handleError]);

    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => (
        <ProductConfirmationCard
            product={item}
            onClick={() => navigation.navigate('[Modal] - editProductInBag', { product: item as ProductInterface })}
        />
    ), [navigation]);

    useFocusEffect(
        useCallback(() => {
            refreshBags();
        }, [refreshBags])
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