import React, { useCallback, useState, useEffect, useContext } from 'react';

import { getTotalPriceBag } from '../../../services/bag';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import useErrorHandler from '../../../hooks/useErrorHandler';
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
    const { deleteProductSell } = useContext(SellsRestaurantBagContext);
    const [bags, setBags] = useState<CombinedProductInterface[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(TOTAL_PRICE_DEFAULT);
    const { handleError } = useErrorHandler();
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>();
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);

    const confirmDelete = async (): Promise<void> => {
        if (!productIdToDelete) return;
        setDeletingProduct(true)
        await deleteProductSell(productIdToDelete);
        await handleGetPrice();
        await setBags((prevBags) => prevBags.filter(bag => bag.idenlacemob !== productIdToDelete));
        setOpenModalDecision(false);

        setTimeout(() => {
            setProductIdToDelete(null);
            setDeletingProduct(false)
        }, DELAY_HALF_A_SECOND);
    };

    const cancelProduct = (): void => {
        setOpenModalDecision(false);
        setProductIdToDelete(null);
    }

    const handleDeleteProduct = async (productId: number): Promise<void> => {
        setProductIdToDelete(productId);
        setOpenModalDecision(true);
    };

    const handleGetPrice = useCallback(async (): Promise<void> => {

        try {
            const { total } = await getTotalPriceBag({ opcion: opcion });

            if (!total) {
                setTotalPrice(parseFloat("0"));
            } else {
                setTotalPrice(total);
            }

        } catch (error) {
            handleError(error);
        };

    }, [handleError]);

    const renderItem = useCallback(({ item }: { item: CombinedProductInterface }) => {
        return (
            <ProductSellsCard
                product={item as ProductSellsInterface}
                onDelete={() => handleDeleteProduct(item.idenlacemob)}
                deletingProduct={productIdToDelete === item.idenlacemob}
                showDelete
            />
        );
    }, [productIdToDelete]);

    useEffect(() => {
        handleGetPrice();
    }, [handleGetPrice]);

    return (
        <>
            <LayoutBag
                opcion={opcion}
                renderItem={renderItem}
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
                    onPress={confirmDelete}
                    disabled={deletingProduct}
                    iconName="trash"
                    extraStyles={{ ...globalStyles().globalMarginBottomSmall }}

                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={cancelProduct}
                    disabled={deletingProduct}
                    buttonColor='white'
                />
            </ModalDecision>

        </>
    );
};
