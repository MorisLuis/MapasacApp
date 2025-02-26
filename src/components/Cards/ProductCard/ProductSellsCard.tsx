import React from 'react';
import { styles } from '../../../theme/UI/cardsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { quantityFormat } from '../../../utils/quantityFormat';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../../interface/productSells';
import CustomText from '../../UI/CustumText';
import { LayoutProductCard, ProductCardInterface, ProductInfo } from './ProductCardLayout';
import { useProductDetails } from '../../../hooks/useSellProductDetailsCard';


export type CombinedProductInterface = ProductSellsInterface | ProductSellsRestaurantInterface;


export const ProductSellsCard = ({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct,
    renderRightProp
}: ProductCardInterface<CombinedProductInterface>) => {

    const { theme } = useTheme();
    const { productDetails } = useProductDetails(product);

    // This is renderRight default
    const renderRight = () => {
        return (
            <>
                {product?.cantidad && (
                    <CustomText style={styles(theme).quantity_value}>
                        {quantityFormat(product.cantidad)}
                    </CustomText>
                )}
                <CustomText style={styles(theme).quantity_unity}>{product?.unidad_nombre?.trim()}</CustomText>
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