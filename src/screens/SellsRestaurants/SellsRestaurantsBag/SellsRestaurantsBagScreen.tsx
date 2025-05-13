import React, { useCallback, useState, useEffect, useContext } from 'react';

import { getTotalPriceBag } from '../../../services/bag';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import ModalDecision from '../../../components/Modals/ModalDecision';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { globalStyles } from '../../../theme/appTheme';
import { SellsRestaurantBagContext } from '../../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { CombinedProductInterface } from '../../../components/Layouts/LayoutConfirmation';
import { ProductSellsInterface } from '../../../interface';
import { DELAY_HALF_A_SECOND } from '../../../utils/globalConstants';

const TOTAL_PRICE_DEFAULT = 0;

export const SellsRestaurantBagScreen = (): React.ReactElement => {

    const opcion = 4
    const { deleteProductToBagSellsRestaurants } = useContext(SellsRestaurantBagContext);
    const [bags, setBags] = useState<CombinedProductInterface[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(TOTAL_PRICE_DEFAULT);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>();
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);

    const deleteProduct = async (): Promise<void> => {
        if (!productIdToDelete) return;
        setDeletingProduct(true)
        await deleteProductToBagSellsRestaurants(productIdToDelete);
        await getTotalPrice();
        await setBags((prevBags) => prevBags.filter(bag => bag.idenlacemob !== productIdToDelete));
        setOpenModalDecision(false);

        setTimeout(() => {
            setProductIdToDelete(null);
            setDeletingProduct(false)
        }, DELAY_HALF_A_SECOND);
    };

    const cancelDeleteProduct = (): void => {
        setOpenModalDecision(false);
        setProductIdToDelete(null);
    }

    const openDeleteProductDecision = useCallback(async (productId: number): Promise<void> => {
        setProductIdToDelete(productId);
        setOpenModalDecision(true);
    }, []);

    const getTotalPrice = useCallback(async (): Promise<void> => {

        const { total } = await getTotalPriceBag({ opcion: opcion });

        if (!total) {
            setTotalPrice(parseFloat("0"));
        } else {
            setTotalPrice(total);
        }

    }, []);

    const renderItemBag = useCallback(({ item }: { item: CombinedProductInterface }) => {
        return (
            <ProductSellsCard
                product={item as ProductSellsInterface}
                onDelete={() => openDeleteProductDecision(item.idenlacemob)}
                deletingProduct={productIdToDelete === item.idenlacemob}
                showDelete
            />
        );
    }, [openDeleteProductDecision, productIdToDelete]);

    useEffect(() => {
        getTotalPrice();
    }, [openDeleteProductDecision, getTotalPrice]);

    return (
        <>
            <LayoutBag
                opcion={opcion}
                renderItem={renderItemBag}
                setBags={setBags}
                bags={bags}
                totalPrice={totalPrice}
                deletingProductId={productIdToDelete}
                Type='Sells'
            />

            <ModalDecision
                visible={openModalDecision}
                message="¿Seguro de eliminar este producto?"
            >
                <ButtonCustum
                    title="Eliminar"
                    onPress={deleteProduct}
                    disabled={deletingProduct}
                    iconName="trash"
                    extraStyles={{ ...globalStyles().globalMarginBottomSmall }}

                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={cancelDeleteProduct}
                    disabled={deletingProduct}
                    buttonColor='white'
                />
            </ModalDecision>

        </>
    );
};
