import React, { JSX, useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { Counter } from '../../../components/Inputs/Counter';
import { buttonStyles } from '../../../theme/Components/buttons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { EmptyMessageCard } from '../../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { ScannerResultStyles } from '../../../theme/Screens/Inventory/ScannerResultTheme';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../context/ThemeContext';
import { InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/UI/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import Tag from '../../../components/UI/Tag';
import { InventoryNavigationProp } from '../../../interface/navigation';
import { DELAY_HALF_A_SECOND } from '../../../utils/globalConstants';

type ScannerResultRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - scannerResultScreen'>;

interface ScannerResultInterface {
    fromInput?: boolean;
    seeProductDetails?: boolean;
    route: ScannerResultRouteProp;
};

const PRODUCT_COUNT_DEFAULT = 0;
const MINIMUM_PRODUCT_PIEZAS = 1;

const ScannerResult = ({
    fromInput,
    seeProductDetails = true,
    route
}: ScannerResultInterface): JSX.Element => {

    const { product, fromProductDetails } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<InventoryNavigationProp>();

    const [loadingAddProduct, setLoadingAddProduct] = useState(false)
    const [counterProduct, setCounterProduct] = useState<number>(PRODUCT_COUNT_DEFAULT);

    const handleAddToInventory = (): void => {
        setLoadingAddProduct(true)
        const inventoryBody = {
            ...product,
            cantidad: counterProduct === PRODUCT_COUNT_DEFAULT ? MINIMUM_PRODUCT_PIEZAS : counterProduct
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

    const handleExpandProductDetails = (): void => {
        navigation.goBack()
        navigation.navigate('[ProductDetailsPage] - productDetailsScreen', { selectedProduct: product, fromModal: true });
    }

    const handleSearchByCode = (): void => {
        navigation.goBack()
        navigation.navigate('[Modal] - findByCodebarInputModal');
    }

    const handleAssignCodeToProduct = (): void => {
        handleCameraAvailable(false)
        setTimeout(() => {
            navigation.goBack()
            navigation.navigate('[Modal] - searchProductModal', { modal: true })
        }, DELAY_HALF_A_SECOND);
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
                            <View style={ScannerResultStyles(theme).counterContainer_left}>
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
                            <View style={ScannerResultStyles(theme).counterContainer_right}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} unit={product.unidad_nombre} />
                            </View>
                        </View>

                        <ButtonCustum
                            title="Agregar al inventario"
                            onPress={handleAddToInventory}
                            disabled={loadingAddProduct || counterProduct === PRODUCT_COUNT_DEFAULT}
                        />

                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                        <ButtonCustum
                            title='Buscar producto'
                            onPress={handleSearchByCode}
                            extraStyles={{ marginVertical: globalStyles().globalMarginBottomSmall.marginBottom }}
                            iconName="bookmark-outline"
                        />

                        {
                            (codeBar && codeBar !== "") &&
                            <ButtonCustum
                                title='Asignar a un producto'
                                onPress={handleAssignCodeToProduct}
                                extraStyles={{ marginBottom: globalStyles().globalMarginBottom.marginBottom }}
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