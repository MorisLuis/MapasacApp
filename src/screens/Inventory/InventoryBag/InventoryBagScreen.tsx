import React, { useCallback, useState, useContext } from 'react';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';
import ModalDecision from '../../../components/Modals/ModalDecision';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { globalStyles } from '../../../theme/appTheme';
import { useTheme } from '../../../context/ThemeContext';
import ProductInterface from '../../../interface/product';

export const InventoryBagScreen = () => {

    const { deleteProduct } = useContext(InventoryBagContext);
    const { theme } = useTheme();
    const [bags, setBags] = useState<ProductInterface[]>([]);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>();
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);

    const confirmDelete = async () => {
        if (!productIdToDelete) return;
        setDeletingProduct(true)
        await deleteProduct(productIdToDelete);
        await setBags((prevBags: ProductInterface[]) => prevBags.filter(bag => bag.idenlacemob !== productIdToDelete));
        setOpenModalDecision(false);
        
        setTimeout(() => {
            setProductIdToDelete(null);
            setDeletingProduct(false)
        }, 500);
    }
    
    const cancelDelete = () => {
        setOpenModalDecision(false);
        setProductIdToDelete(null);
    }

    const handleDeleteProduct = async (productId: number) => {
        setProductIdToDelete(productId);
        setOpenModalDecision(true);
    };
    

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => (
        <ProductInventoryCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob)}
            showDelete
        />
    ), [handleDeleteProduct]);

    return (
        <>
            <LayoutBag
                opcion={0}
                renderItem={renderItem}
                setBags={setBags}
                bags={bags}
                Type='Inventory'
            />

            <ModalDecision visible={openModalDecision} message="Seguro de eliminar el producto del carrito?">
                <ButtonCustum
                    title="Eliminar"
                    onPress={confirmDelete}
                    disabled={deletingProduct}
                    iconName="trash"
                    extraStyles={{ ...globalStyles(theme).globalMarginBottomSmall }}

                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={cancelDelete}
                    disabled={deletingProduct}
                />
            </ModalDecision>
        </>
    )
};
