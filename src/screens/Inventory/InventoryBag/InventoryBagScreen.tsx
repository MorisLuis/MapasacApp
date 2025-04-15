import React, { useCallback, useState, useContext, JSX } from 'react';

import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';
import ModalDecision from '../../../components/Modals/ModalDecision';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { globalStyles } from '../../../theme/appTheme';
import { CombinedProductInterface } from '../../../components/Layouts/LayoutConfirmation';
import { ProductInterface } from '../../../interface';
import { DELAY_HALF_A_SECOND } from '../../../utils/globalConstants';


export const InventoryBagScreen = () : JSX.Element => {

    const { deleteProduct } = useContext(InventoryBagContext);
    const [bags, setBags] = useState<CombinedProductInterface[]>([]);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>();
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);

    const confirmDelete = async () : Promise<void> => {
        if (!productIdToDelete) return;
        setDeletingProduct(true)
        await deleteProduct(productIdToDelete);
        await setBags((prevBags: CombinedProductInterface[]) => prevBags.filter(bag => bag.idenlacemob !== productIdToDelete));
        setOpenModalDecision(false);

        setTimeout(() => {
            setProductIdToDelete(null);
            setDeletingProduct(false)
        }, DELAY_HALF_A_SECOND);
    }

    const cancelDelete = () : void => {
        setOpenModalDecision(false);
        setProductIdToDelete(null);
    }

    const handleDeleteProduct = useCallback(async (productId: number) : Promise<void> => {
        setProductIdToDelete(productId);
        setOpenModalDecision(true);
    }, []);

    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => {
        return (
            <ProductInventoryCard
                product={item as ProductInterface}
                showDelete
                onDelete={() => handleDeleteProduct(item.idenlacemob)}
            />
        );
    }, [handleDeleteProduct]);
    
    
    return (
        <>
            <LayoutBag
                opcion={0}
                renderItem={renderItem}
                setBags={setBags}
                bags={bags}
                Type="Inventory"
            />

            <ModalDecision visible={openModalDecision} message="Seguro de eliminar el producto del carrito?">
                <ButtonCustum
                    title="Eliminar"
                    onPress={confirmDelete}
                    disabled={deletingProduct}
                    iconName="trash"
                    extraStyles={{ ...globalStyles().globalMarginBottomSmall }}

                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={cancelDelete}
                    disabled={deletingProduct}
                    buttonColor="white"
                />
            </ModalDecision>
        </>
    )
};
