import React, { JSX } from 'react';

import { productCardstyles } from '../../../theme/UI/cardsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { quantityFormat } from '../../../utils/quantityFormat';
import CustomText from '../../UI/CustumText';
import { LayoutProductCard, ProductCardInterface, ProductInfo } from './ProductCardLayout';
import { CombinedProductSellsInterface } from '../../../interface';
import { useProductDetailsCard } from '../../../hooks/useProductDetailsCard';

export const ProductSellsCard = ({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct,
    renderRightProp
}: ProductCardInterface<CombinedProductSellsInterface>) : JSX.Element => {

    const { theme } = useTheme();
    const { productDetails } = useProductDetailsCard(product);

    // This is renderRight default
    const renderRight = () : JSX.Element  => {
        return (
            <>
                {product?.cantidad && (
                    <CustomText style={productCardstyles(theme).quantity_value}>
                        {quantityFormat(product.cantidad)}
                    </CustomText>
                )}
                <CustomText style={productCardstyles(theme).quantity_unity}>{product?.unidad_nombre?.trim()}</CustomText>
            </>
        )
    };

    return (
        <LayoutProductCard
            product={product}
            showDelete={showDelete}
            onDelete={onDelete}
            onClick={onClick}
            deletingProduct={deletingProduct}
            renderRight={renderRightProp ? renderRightProp : renderRight}
        >
            <>
                {productDetails.map((detail, index) => (
                    <ProductInfo key={index} label={detail.label} value={detail.value} />
                ))}
            </>
        </LayoutProductCard>
    );
};