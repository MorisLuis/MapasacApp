import React, { JSX } from 'react'

import { LayoutProductCard, ProductInfo } from './ProductCardLayout'
import CustomText from '../../UI/CustumText';
import { productCardstyles } from '../../../theme/UI/cardsStyles';
import { quantityFormat } from '../../../utils/quantityFormat';
import { useProductDetailsCard } from '../../../hooks/useProductDetailsCard';
import { CombinedProductInterface } from '../../../interface';
import { useTheme } from '../../../hooks/styles/useTheme';

interface ProductConfirmationCardInterface {
    product: CombinedProductInterface;
    onClick: () => void;
    renderRightProp?: () => React.ReactNode;
}

export default function ProductConfirmationCard({
    product,
    onClick,
    renderRightProp
}: ProductConfirmationCardInterface): JSX.Element {

    const { theme, size } = useTheme();
    const { productDetails } = useProductDetailsCard(product);


    // This is renderRight default
    const renderRight = (): JSX.Element => {
        return (
            <>
                {product?.cantidad && (
                    <CustomText style={productCardstyles({ theme, size }).quantity_value}>
                        {quantityFormat(product.cantidad)}
                    </CustomText>
                )}
                <CustomText style={productCardstyles({ theme, size }).quantity_unity}>{product?.unidad_nombre?.trim()}</CustomText>
            </>
        )
    };

    return (
        <LayoutProductCard
            product={product}
            onClick={onClick}
            renderRight={renderRightProp ? renderRightProp : renderRight}
        >
            <>
                {productDetails.map((detail, index) => (
                    <ProductInfo key={index} label={detail.label} value={detail.value} />
                ))}
            </>
        </LayoutProductCard>
    )
}
