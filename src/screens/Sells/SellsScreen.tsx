import React, { JSX, useCallback, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { SellsNavigationProp } from '../../interface/navigation';
import { getProductsSells } from '../../services/sells/productsSells';
import { ProductSellsInterface } from '../../interface';
import { CombinedSellsInterface, LayoutSell } from '../../components/Layouts/LayoutSell';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';

const MINIMUM_PRODUCTS = 1;

export const SellsScreen = (): React.ReactElement => {

    const navigation = useNavigation<SellsNavigationProp>();
    const { sumPriceOfItemsSells, productAdded } = useContext(SellsBagContext);

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
            return;
        }

        if (count <= MINIMUM_PRODUCTS) {
            navigation.navigate('[Sells] - SellsProductDetails',
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

    const renderItemSells = (item: CombinedSellsInterface) : JSX.Element => {
        const productItem = item as ProductSellsInterface;
        return (
            <ProductSellsSquareCard
                imagen={productItem.imagen}
                descripcion={productItem.descripcio}
                handleSelectProduct={() => handleSelectProduct(productItem)}
            />
        );
    }

    return (
        <LayoutSell<ProductSellsInterface>
            queryKey={['productos', 'restaurante']}
            queryFn={getProductsSells}
            renderItem={({ item }) => renderItemSells(item)}
            layoutColor="red"
            sumPrice={sumPriceOfItemsSells}
            productAdded={productAdded}
        />
    )
};