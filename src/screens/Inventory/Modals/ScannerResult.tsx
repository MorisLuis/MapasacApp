import React, { useContext, useState } from 'react';

import { TouchableOpacity, View } from 'react-native';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import ProductInterface from '../../../interface/product';
import { Counter } from '../../../components/Inputs/Counter';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../theme/Components/buttons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { EmptyMessageCard } from '../../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { ScannerResultStyles } from '../../../theme/Screens/Inventory/ScannerResultTheme';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import { InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import Tag from '../../../components/UI/Tag';
import { InventoryNavigationProp } from '../../../interface/navigation';

type ScannerResultRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - scannerResultScreen'>;

interface ScannerResultInterface {
    fromInput?: boolean;
    seeProductDetails?: boolean;
    route: ScannerResultRouteProp;
};

const ScannerResult = ({
    fromInput,
    seeProductDetails = true,
    route
}: ScannerResultInterface) => {

    const { product, fromProductDetails } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<InventoryNavigationProp>();

    const [loadingAddProduct, setLoadingAddProduct] = useState(false)
    const [counterProduct, setCounterProduct] = useState<number>(0);

    const handleAddToInventory = () => {
        setLoadingAddProduct(true)
        const inventoryBody = {
            ...product,
            cantidad: counterProduct === 0 ? 1 : counterProduct
        }

        addProduct(inventoryBody);

        if (fromProductDetails) {
            Toast.show({
                type: 'tomatoToast',
                text1: 'Se agrego el producto la inventario!'
            })
        }
        handleCameraAvailable(true)
        setLoadingAddProduct(false)
        navigation.goBack()
    }

    const handleExpandProductDetails = () => {
        navigation.goBack()
        navigation.navigate('[ProductDetailsPage] - productDetailsScreen', { selectedProduct: product, fromModal: true });
    }

    const handleSearchByCode = () => {
        navigation.goBack()
        navigation.navigate('[Modal] - findByCodebarInputModal');
    }

    const handleAssignCodeToProduct = () => {
        handleCameraAvailable(false)
        setTimeout(() => {
            navigation.goBack()
            navigation.navigate('[Modal] - searchProductModal', { modal: true })
        }, 500);
    }

    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >
            {
                (product) ?
                    <View style={ScannerResultStyles(theme).ScannerResult}>
                        <View style={ScannerResultStyles(theme).product}>
                            <View>
                                <CustomText style={ScannerResultStyles(theme).codeLabel}>Codigo: </CustomText>
                                <CustomText style={ScannerResultStyles(theme).codeValue}>{product?.clave}</CustomText>
                                <View style={ScannerResultStyles(theme).otherInfo}>
                                    {
                                        product?.codbarras ?
                                            <Tag message='No tiene codigo' color='green' />
                                            :
                                            <CustomText style={{ color: theme.text_color }}>{product?.codbarras}</CustomText>
                                    }
                                    <CustomText style={{ color: theme.text_color }}>/</CustomText>
                                    <CustomText style={{ color: theme.text_color }}>{product?.familia}</CustomText>
                                </View>
                            </View>
                        </View>

                        <View style={ScannerResultStyles(theme).counterContainer}>
                            <View style={{ width: "40%" }}>
                                {
                                    (seeProductDetails && !fromProductDetails) &&
                                    <TouchableOpacity
                                        onPress={handleExpandProductDetails}
                                        style={[buttonStyles(theme).button_small, buttonStyles(theme).white]}
                                    >
                                        <CustomText style={[buttonStyles(theme, typeTheme).buttonTextTertiary, { fontSize: globalFont.font_sm }]}>Ver producto</CustomText>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{ width: "55%" }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} unit={product.unidad_nombre} />
                            </View>
                        </View>

                        <ButtonCustum
                            title="Agregar al inventario"
                            onPress={handleAddToInventory}
                            disabled={loadingAddProduct}
                        />

                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                        <ButtonCustum
                            title='Buscar producto'
                            onPress={handleSearchByCode}
                            extraStyles={{ marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom }}
                            iconName="bookmark-outline"
                        />

                        {
                            (codeBar && codeBar !== "") &&
                            <ButtonCustum
                                title='Asignar a un producto'
                                onPress={handleAssignCodeToProduct}
                                extraStyles={{ marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }}
                                iconName="bookmark-outline"
                                buttonColor="white"
                            />
                        }
                    </View>
            }
        </ModalBottom>
    )
}


export default ScannerResult;