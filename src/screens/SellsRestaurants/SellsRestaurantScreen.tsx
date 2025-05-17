import React, { JSX, useCallback, useContext } from 'react';
import { ProductSellsRestaurantInterface, SellsRestaurantNavigationProp } from '../../interface';
import { LayoutSell } from '../../components/Layouts/LayoutSell';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { getProductDetailsRestaurantSells, getProductsRestaurantSells } from '../../services/restaurants/productsRestaurantSells';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NUMBER_0 } from '../../utils/globalConstants';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';

const PRODUCTS_LENGTH_MINIMUM = 1;

export const SellsRestaurantScreen = (): React.ReactElement => {

    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { methods: { reset: resetSellsRestaurantBag }, productAdded, sumPriceOfItemsSellsRestaurant } = useContext(SellsRestaurantBagContext);

    const handleSelectProduct = useCallback(async (productSelected: ProductSellsRestaurantInterface): Promise<void> => {

        const productData: Partial<ProductSellsRestaurantInterface> = {
            idinvefami: productSelected.idinvefami,
            cvefamilia: productSelected.cvefamilia,
            descripcio: productSelected.descripcio,
            imagen: productSelected.imagen
        };

        if (
            productData.cvefamilia === undefined ||
            productData.descripcio === undefined
        ) {
            return;
        }


        if (!productSelected.cvefamilia) return;
        const { product } = await getProductDetailsRestaurantSells(productSelected.cvefamilia);
        if (!product) return;

        if (product.length <= PRODUCTS_LENGTH_MINIMUM) {
            const { precio, capa, idinveclas, producto, unidad, idinvearts } = product[NUMBER_0]

            navigation.navigate('[SellsRestaurants] - SellsRestaurantsDetailsScreen',
                {
                    cvefamilia: productData.cvefamilia,
                    descripcio: productData.descripcio,
                    image: productData?.imagen ?? "",
                    totalClasses: 1,

                    price: precio,
                    capa: capa,
                    typeClass: { id: idinveclas, value: producto },
                    units: unidad,
                    idinvearts: idinvearts,
                }
            );
        } else {
            navigation.navigate('[SellsRestaurants] - ClassScreen',
                {
                    cvefamilia: productData.cvefamilia,
                    descripcio: productData.descripcio,
                    image: productData?.imagen ?? "",
                    totalClasses: product.length
                }
            );
        }
    }, [navigation])

    const renderItemRestaurant = (item: ProductSellsRestaurantInterface): JSX.Element => {
        return <ProductSellsSquareCard
            imagen={item.imagen}
            descripcion={item.descripcio}
            handleSelectProduct={() => handleSelectProduct(item)}
        />
    };

    useFocusEffect(
        React.useCallback(() => {
            return () : void => resetSellsRestaurantBag()
        }, [resetSellsRestaurantBag])
    );

    return (
        <LayoutSell<ProductSellsRestaurantInterface>
            queryKey={['productos', 'sells']}
            queryFn={getProductsRestaurantSells}
            renderItem={({ item }) => renderItemRestaurant(item)}
            layoutColor="red"
            productAdded={productAdded}
            sumPrice={sumPriceOfItemsSellsRestaurant}
        />
    );
};