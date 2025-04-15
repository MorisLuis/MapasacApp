import React, { JSX, useCallback, useContext, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { getProductDetails } from '../../services/products';
import { ProductDetailsSkeleton } from '../../components/Skeletons/Screens/ProductDetailsSkeleton';
import { ProductDetailsStyles } from '../../theme/Screens/Inventory/ProductDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { Theme, globalStyles } from '../../theme/appTheme';
import { identifyBarcodeType } from '../../utils/identifyBarcodeType';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { MessageCard } from '../../components/Cards/MessageCard';
import useErrorHandler from '../../hooks/useErrorHandler';
import { InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { InventoryNavigationProp } from '../../interface/navigation';
import { ProductInterface } from '../../interface';

type ProductDetailsPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - productDetailsScreen'>;
type InventoryDetailsScreenPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - inventoryDetailsScreen'>;

type ProductDetailsPageInterface = {
    route: ProductDetailsPageRouteProp | InventoryDetailsScreenPageRouteProp
};

export const ProductDetailsPage = ({ route }: ProductDetailsPageInterface): React.ReactElement => {

    const { selectedProduct, fromModal } = route.params;
    const { idinvearts } = selectedProduct;
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const shouldCleanUp = useRef(true);
    const { handleError } = useErrorHandler()

    const navigation = useNavigation<InventoryNavigationProp>();
    const [productDetailsData, setProductDetailsData] = useState<ProductInterface>();

    const handleOptionsToUpdateCodebar = (): void => {
        navigation.navigate('CodebarUpdateNavigation', {
            selectedProduct: { idinvearts: selectedProduct.idinvearts }
        });
    };

    const handleEditProduct = (): void => {
        if (!productDetailsData) return;
        navigation.navigate("[ProductDetailsPage] - productDetailsScreenEdit", { product: { idinvearts: productDetailsData?.idinvearts } })
    }

    const handleGetProductDetails = useCallback(async (): Promise<void> => {
        try {
            const { product } = await getProductDetails(idinvearts);
            setProductDetailsData(product);
        } catch (error) {
            handleError(error);
        }
    }, [handleError, idinvearts]);

    const handleAddToInventory = (): void => {
        if (!productDetailsData) return;
        shouldCleanUp.current = false;
        navigation.navigate('[Modal] - scannerResultScreen', {
            product: productDetailsData,
            fromProductDetails: true
        });
    };

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();

            return (): void => {
                if (shouldCleanUp.current) {
                    setProductDetailsData(undefined);
                }
            };
        }, [handleCameraAvailable, handleGetProductDetails])
    );

    return productDetailsData ? (
        <ProductDetailsContent
            productDetailsData={productDetailsData}
            handleOptionsToUpdateCodebar={handleOptionsToUpdateCodebar}
            handleAddToInventory={handleAddToInventory}
            handleEditProduct={handleEditProduct}
            fromModal={fromModal}
            codeBar={codeBar}
        />
    ) : (
        <ProductDetailsSkeleton />
    );
};


interface ProductDetailsContentInterface {
    productDetailsData: ProductInterface,
    handleOptionsToUpdateCodebar: () => void,
    handleAddToInventory: () => void,
    handleEditProduct: () => void;

    fromModal?: boolean,
    codeBar?: string,
    fromUpdateCodebar?: boolean
}

const ProductDetailsContent = React.memo(({
    productDetailsData,
    handleOptionsToUpdateCodebar,
    handleAddToInventory,
    handleEditProduct,
    fromModal,
    codeBar,
    fromUpdateCodebar
}: ProductDetailsContentInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const codebarAvailable = productDetailsData?.codbarras?.trim() !== "";

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={ProductDetailsStyles(theme).ProductDetailsPage}>
                <ScrollView>
                    <View style={ProductDetailsStyles(theme, typeTheme).imageContainer}>
                        <View style={ProductDetailsStyles(theme).notImage}>
                            <View style={ProductDetailsStyles(theme).notImageBackground}>
                                <Icon name={'image-outline'} size={24} color={iconColor} />
                            </View>
                        </View>
                    </View>
                    <View style={ProductDetailsStyles(theme).header}>
                        <CustomText style={ProductDetailsStyles(theme).description}>{productDetailsData.producto}</CustomText>
                        <View>
                            <CustomText style={ProductDetailsStyles(theme, typeTheme).price}>Precio</CustomText>
                            <CustomText style={ProductDetailsStyles(theme, typeTheme).priceValue}>{format(productDetailsData.precio)}</CustomText>
                        </View>
                    </View>

                    <View style={ProductDetailsStyles(theme, typeTheme).information}>
                        <View style={ProductDetailsStyles(theme, typeTheme).informationContainer}>
                            <ProductDetailItem theme={theme} label="Clave:" value={productDetailsData.clave} />
                            <ProductDetailItem theme={theme} label="Familia:" value={productDetailsData.familia || ""} />
                            <ProductDetailItem theme={theme} label="No. Artiuclo:" value={productDetailsData.noarticulo || ""} />

                            <ProductDetailItem theme={theme} label="Unidad:" value={productDetailsData.unidad_nombre || ""} isLastChild={!codebarAvailable} />
                            {codebarAvailable && (
                                <ProductDetailItem theme={theme} label="Codigo de barras:" value={productDetailsData.codbarras} isLastChild />
                            )}
                        </View>
                    </View>

                    {
                        (codeBar && fromUpdateCodebar) &&
                        <MessageCard
                            title='El tipo de codigo de barras es:'
                            message={`${identifyBarcodeType(codeBar)}`}
                            icon="barcode-outline"
                            extraStyles={{ marginBottom: globalStyles().globalMarginBottomSmall.marginBottom }}
                        />
                    }


                    {
                        !fromModal &&
                        <View style={ProductDetailsStyles(theme, typeTheme).manageEvents}>
                            <CustomText style={ProductDetailsStyles(theme, typeTheme).manageEvents_title}>Manejar producto</CustomText>
                            <View style={ProductDetailsStyles(theme, typeTheme).manageEvents_content}>
                                {(!codebarAvailable) &&
                                    <TouchableOpacity
                                        style={ProductDetailsStyles(theme, typeTheme).event}
                                        onPress={handleOptionsToUpdateCodebar}
                                    >
                                        <View style={ProductDetailsStyles(theme, typeTheme).event_icon}>
                                            <Icon name={'barcode-outline'} size={20} color={iconColor} />
                                        </View>
                                        <CustomText style={ProductDetailsStyles(theme, typeTheme).event_text}>Crear codigo</CustomText>
                                    </TouchableOpacity>
                                }


                                <TouchableOpacity
                                    style={[ProductDetailsStyles(theme, typeTheme).event, codebarAvailable && extraStyles.event ]}
                                    onPress={handleEditProduct}
                                >
                                    <View style={ProductDetailsStyles(theme, typeTheme).event_icon}>
                                        <Icon name={'create-outline'} size={20} color={iconColor} />
                                    </View>
                                    <CustomText style={ProductDetailsStyles(theme, typeTheme).event_text}>Editar</CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>
                {!fromModal && (
                    <FooterScreen
                        buttonOnPress={handleAddToInventory}
                        buttonTitle='Agregar a inventario'
                        buttonDisabled={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
});

ProductDetailsContent.displayName = "ProductDetailsContent";

interface ProductDetailItem {
    label: string,
    value: string | number,
    theme: Theme,
    isLastChild?: boolean
}

const ProductDetailItem = React.memo(({ label, value, theme, isLastChild = false }: ProductDetailItem) : JSX.Element => (

    <View style={ProductDetailsStyles(theme).data}>
        <CustomText style={ProductDetailsStyles(theme).label}>{label}</CustomText>
        <CustomText style={ProductDetailsStyles(theme).dataValue}>{value}</CustomText>
        {
            !isLastChild &&
            <View style={ProductDetailsStyles(theme).separator} />
        }
    </View>
));

ProductDetailItem.displayName = "ProductDetailItem";


const extraStyles = StyleSheet.create({
    event: {
        flex: 0.33
    }
})