import { useContext } from 'react';

import { SettingsContext } from '../context/settings/SettingsContext';
import { format } from '../utils/currency';
import { quantityFormat } from '../utils/quantityFormat';
import { CombinedProductInterface, ProductSellsInterface, ProductSellsRestaurantInterface } from '../interface';

const CANTIDAD_DAFAULT = 0;

export const useProductDetailsCard = (
    product: CombinedProductInterface
): { productDetails: { label: string, value: string }[] } => {

    const { actualModule } = useContext(SettingsContext);

    const formattedPrice = format(
        typeof product.precio === 'number' ? product.precio : parseFloat(product.precio ?? '')
    );

    const totalImporte = format(
        (typeof product.precio === 'number' ? product.precio : parseFloat(product.precio ?? '')) *
        (product.cantidad ?? CANTIDAD_DAFAULT)
    );

    const capa = (product as ProductSellsInterface)?.capa?.trim();
    const clase = (product as ProductSellsInterface)?.clase?.trim();
    const comentario = (product as ProductSellsRestaurantInterface)?.comentario?.trim();

    let productDetails: { label: string, value: string }[] = [];

    // Detalles comunes a ambos módulos
    productDetails = [
        { label: 'Precio', value: `${formattedPrice} / ${quantityFormat(product.cantidad ?? CANTIDAD_DAFAULT)}` },
        { label: 'Importe', value: totalImporte }
    ];

    // Agregar detalles específicos del módulo
    if (actualModule === 'Sells') {
        productDetails.push(
            ...(capa ? [{ label: 'Capa', value: capa }] : []),
            ...(clase ? [{ label: 'Clase', value: clase }] : [])
        );
    };

    // Agregar detalles específicos del módulo
    if (actualModule === 'Sells-Restaurant') {
        if (comentario) {
            productDetails.push(
                ...(comentario ? [{ label: 'Comentario', value: comentario }] : []),
            );
        }
    }


    return {
        productDetails
    };
};
