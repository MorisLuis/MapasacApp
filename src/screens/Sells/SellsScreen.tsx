import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { CombinedSellsInterface, LayoutSell } from '../../components/Layouts/LayoutSell';
import { SellsNavigationProp } from '../../interface/navigation';
import { getProductsSells } from '../../services/productsSells';
import useErrorHandler from '../../hooks/useErrorHandler';
import { ProductSellsInterface } from '../../interface';

const MINIMUM_PRODUCTS = 1;

export const SellsScreen = (): React.ReactElement => {

    const navigation = useNavigation<SellsNavigationProp>();
    const { handleError } = useErrorHandler();
    const [products, setProducts] = useState<ProductSellsInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetProducts = useCallback(async (currentPage: number): Promise<void> => {
        try {
            setIsLoading(true);
            const { products } = await getProductsSells(currentPage);

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
    }, [handleError]);

    const handleSelectProduct = useCallback(async (product: Partial<ProductSellsInterface>): Promise<void> => {

        const productData: Partial<ProductSellsInterface> = {
            idinvefami: product.idinvefami,
            cvefamilia: product.cvefamilia,
            descripcio: product.descripcio,
            classcount: product.classcount,
            imagen: product.imagen
        };

        const count = parseInt(product.classcount ?? "0");

        if (
            productData.cvefamilia === undefined ||
            productData.descripcio === undefined ||
            productData.imagen === undefined
        ) {
            //console.error("handleSelectProduct - Faltan datos requeridos para navegar");
            return;
        }

        if (count <= MINIMUM_PRODUCTS) {
            navigation.navigate('[Sells] - ProductDetailsSells',
                {
                    cvefamilia: productData.cvefamilia,
                    descripcio: productData.descripcio,
                    image: productData.imagen,
                    totalClasses: count
                }
            );
        } else {
            navigation.navigate('[Sells] - ClassScreen',
                {
                    cvefamilia: productData.cvefamilia,
                    descripcio: productData.descripcio,
                    image: productData.imagen,
                    totalClasses: count
                }
            );
        }
    }, [navigation]);

    const renderItem = useCallback(({ item }: { item: CombinedSellsInterface }) => {
        const productItem = item as ProductSellsInterface;
        return (
            <ProductSellsSquareCard
                imagen={productItem.imagen}
                descripcion={productItem.descripcio}
                handleSelectProduct={() => handleSelectProduct(productItem)}
            />
        );
    }, [handleSelectProduct]);


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