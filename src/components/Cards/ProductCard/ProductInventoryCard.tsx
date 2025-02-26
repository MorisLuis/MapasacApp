import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import ProductInterface from '../../../interface/product';
import { LayoutProductCard, ProductCardInterface, ProductInfo } from './ProductCardLayout';

export const ProductInventoryCard = ({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct
}: ProductCardInterface<ProductInterface>) => {

    const { theme } = useTheme();

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
        </LayoutProductCard>
    );
};
