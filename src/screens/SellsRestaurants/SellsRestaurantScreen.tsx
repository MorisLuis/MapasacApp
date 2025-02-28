import React, { useCallback, useContext, useState } from 'react';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsRestaurantInterface } from '../../interface/productSells';
import { CombinedSellsInterface, LayoutSell } from '../../components/Layouts/LayoutSell';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useErrorHandler from '../../hooks/useErrorHandler';
import { SellsRestaurantNavigationProp } from '../../interface/navigation';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { getProductDetailsRestaurantSells, getProductsRestaurantSells } from '../../services/productsRestaurantSells';


export const SellsRestaurantScreen = () => {

    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { cleanFormData, updateFormData } = useContext(SellsRestaurantBagContext);
    const { handleError } = useErrorHandler();
    const [products, setProducts] = useState<ProductSellsRestaurantInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetProducts = async (currentPage: number) => {
        try {
            setIsLoading(true);
            const products = await getProductsRestaurantSells(currentPage);
            if (products.error) return handleError(products.error);

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
    };

    const handleSelectProduct = async (product: ProductSellsRestaurantInterface) => {
        const cvefamilia = product.cvefamilia
        const productData = await getProductDetailsRestaurantSells(cvefamilia);

        if (productData.length > 1) {
            updateFormData({
                cvefamilia: cvefamilia,
                totalClasses: productData.length
            })
            navigation.navigate('[SellsRestaurants] - ClassScreen', { cvefamilia: cvefamilia });
        } else {
            updateFormData({
                descripcio: product.descripcio,
                image: product.imagen,
                price: productData[0].precio,
                capa: productData[0].capa,
                typeClass: { id: productData[0].idinveclas, value: productData[0].producto },
                units: productData[0].unidad,
                idinvearts: productData[0].idinvearts,
                totalClasses: 1
            })
            navigation.navigate('SellsRestaurantsDataScreen');
        }
    }

    const renderItem = useCallback(({ item }: { item: CombinedSellsInterface }) => {
        const productItem = item as ProductSellsRestaurantInterface;
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
            opcion={4}
            products={products}
            handleGetProducts={handleGetProducts}
            isLoading={isLoading}
            layoutColor='red'
        />
    )
};