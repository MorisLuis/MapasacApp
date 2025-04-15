import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { CombinedSellsInterface, LayoutSell } from '../../components/Layouts/LayoutSell';
import useErrorHandler from '../../hooks/useErrorHandler';
import { SellsRestaurantNavigationProp } from '../../interface/navigation';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { getProductDetailsRestaurantSells, getProductsRestaurantSells } from '../../services/productsRestaurantSells';
import { ProductSellsRestaurantInterface } from '../../interface';
import { NUMBER_0 } from '../../utils/globalConstants';


const PRODUCTS_LENGTH_MINIMUM = 1;

export const SellsRestaurantScreen = () : React.ReactElement => {

    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { cleanFormData, updateFormData } = useContext(SellsRestaurantBagContext);
    const { handleError } = useErrorHandler();
    const [products, setProducts] = useState<ProductSellsRestaurantInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetProducts = useCallback(async (currentPage: number) : Promise<void> => {
        try {
            setIsLoading(true);
            const { products } = await getProductsRestaurantSells(currentPage);

            setProducts((prevProducts) => {
                const newProducts = products?.filter(
                    (product: ProductSellsRestaurantInterface) =>
                        !prevProducts.some(
                            (prevProduct) =>
                                prevProduct.idinvefami === product.idinvefami
                        )
                );
                return prevProducts ? [...prevProducts, ...newProducts] : newProducts;
            });

        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [handleError]);

    const handleSelectProduct = useCallback(async (productSelected: ProductSellsRestaurantInterface) : Promise<void> => {
        const cvefamilia = productSelected.cvefamilia
        if (!cvefamilia) return;
        const { product } = await getProductDetailsRestaurantSells(cvefamilia);
        if (!product) return;

        if (product.length > PRODUCTS_LENGTH_MINIMUM) {
            updateFormData({
                cvefamilia: cvefamilia,
                totalClasses: product.length
            })
            navigation.navigate('[SellsRestaurants] - ClassScreen', { cvefamilia: cvefamilia });
        } else {
            const { precio, capa, idinveclas, producto, unidad, idinvearts } = product[NUMBER_0]
            updateFormData({
                descripcio: productSelected.descripcio,
                image: productSelected.imagen,
                price: precio,
                capa: capa,
                typeClass: { id: idinveclas, value: producto },
                units: unidad,
                idinvearts: idinvearts,
                totalClasses: 1
            })
            navigation.navigate('SellsRestaurantsDataScreen');
        }
    }, [navigation, updateFormData])

    const renderItem = useCallback(({ item }: { item: CombinedSellsInterface }) => {
        const productItem = item as ProductSellsRestaurantInterface;
        return (
            <ProductSellsSquareCard
                imagen={productItem.imagen}
                descripcion={productItem.descripcio}
                handleSelectProduct={() => handleSelectProduct(productItem)}
            />
        );
    }, [handleSelectProduct]);

    useFocusEffect(
        useCallback(() => {
            cleanFormData()
        }, [cleanFormData])
    );

    return (
        <LayoutSell
            renderItem={renderItem}
            opcion={4}
            products={products}
            handleGetProducts={handleGetProducts}
            isLoading={isLoading}
            layoutColor='red'
        />
    )
};