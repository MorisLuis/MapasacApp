import React, { JSX } from 'react';

import { LayoutProductCard, ProductCardInterface, ProductInfo } from './ProductCardLayout';
import { ProductInterface } from '../../../interface';

export const ProductInventoryCard = ({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct
}: ProductCardInterface<ProductInterface>)  : JSX.Element => {

    return (
        <LayoutProductCard
            product={product}
            showDelete={showDelete}
            onDelete={onDelete}
            onClick={onClick}
            deletingProduct={deletingProduct}
        >
            {product?.codbarras?.trim() && <ProductInfo label="Codigo Barras" value={product.codbarras} />}
            {product?.clave?.trim() && <ProductInfo label="Clave" value={product.clave} />}
            {product?.cantidad && <ProductInfo label="Cantidad" value={product.cantidad} />}

        </LayoutProductCard>
    );
};
