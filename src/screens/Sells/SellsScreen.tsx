import React, { useCallback, useContext, useState } from 'react';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { CombinedSellsInterface, LayoutSell } from '../../components/Layouts/LayoutSell';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SellsNavigationProp } from '../../interface/navigation';
import { getProductsSells } from '../../services/productsSells';
import useErrorHandler from '../../hooks/useErrorHandler';

export const SellsScreen = () => {

    const { cleanFormData, updateFormData } = useContext(SellsBagContext);
    const navigation = useNavigation<SellsNavigationProp>();
    const { handleError } = useErrorHandler();
    const [products, setProducts] = useState<ProductSellsInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetProducts = async (currentPage: number) => {
        try {
            setIsLoading(true);
            const products = await getProductsSells(currentPage);
            if (products.error) return handleError(products.error);

            setProducts((prevProducts) => {
                const newProducts = products?.filter(
                    (product: ProductSellsInterface) =>
                        !prevProducts.some(
                            (prevProduct) =>
                                prevProduct.idinvefami === product.idinvefami
                        )
                );
                return prevProducts ? [...prevProducts, ...newProducts] : newProducts;
            });

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectProduct = async (product: ProductSellsInterface) => {
        const count = parseInt(product.classcount ?? "0");
        updateFormData({
            cvefamilia: product.cvefamilia,
            descripcio: product.descripcio,
            image: product.imagen,
            totalClasses: parseInt(product.classcount ?? ''),
        });

        if (count <= 1) {
            navigation.navigate('SellsDataScreen');
        } else {
            navigation.navigate('[Sells] - ClassScreen',
                {
                    cvefamilia: product.cvefamilia,
                    descripcio: product.descripcio,
                    image: product.imagen,
                    totalClasses: parseInt(product.classcount ?? '')
                }
            );
        }
    };

    const renderItem = useCallback(({ item }: { item: CombinedSellsInterface }) => {
        const productItem = item as ProductSellsInterface;
        return (
            <ProductSellsSquareCard
                imagen={productItem.imagen}
                descripcion={productItem.descripcio}
                handleSelectProduct={() => handleSelectProduct(productItem)}
            />
        );
    }, []);

    useFocusEffect(
        useCallback(() => {
            cleanFormData()
        }, [])
    );

    return (
        <LayoutSell
            renderItem={renderItem}
            opcion={2}
            handleGetProducts={handleGetProducts}
            products={products}
            isLoading={isLoading}
        />
    )
};