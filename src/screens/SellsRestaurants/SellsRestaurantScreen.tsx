import React, { JSX, useCallback, useContext } from 'react';
import { ProductSellsRestaurantInterface, SellsRestaurantNavigationProp } from '../../interface';
import { LayoutSellTest } from '../../components/Layouts/LayoutSellTest';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { getProductDetailsRestaurantSells, getProductsRestaurantSells } from '../../services/restaurants/productsRestaurantSells';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { useNavigation } from '@react-navigation/native';
import { NUMBER_0 } from '../../utils/globalConstants';

const PRODUCTS_LENGTH_MINIMUM = 1;

export const SellsRestaurantScreen = (): React.ReactElement => {

    const { updateFormData } = useContext(SellsRestaurantBagContext);
    const navigation = useNavigation<SellsRestaurantNavigationProp>();

    const handleSelectProduct = useCallback(async (productSelected: ProductSellsRestaurantInterface): Promise<void> => {
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

    const renderItemRestaurant = (item: ProductSellsRestaurantInterface): JSX.Element => {
        return <ProductSellsSquareCard
            imagen={item.imagen}
            descripcion={item.descripcio}
            handleSelectProduct={() => handleSelectProduct(item)}
        />
    };

    return (
        <LayoutSellTest<ProductSellsRestaurantInterface>
            queryKey={['productos', 'restaurante']}
            queryFn={getProductsRestaurantSells}
            renderItem={({ item }) => renderItemRestaurant(item)}
            layoutColor="red"
            opcion={4}
        />
    );
};