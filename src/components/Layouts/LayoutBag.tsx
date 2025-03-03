import React, { useContext, useEffect, useRef, useState } from 'react'
import { LayoutBagStyles } from '../../theme/Layout/LayoutBagTheme';
import { useTheme } from '../../context/ThemeContext';
import { Searchbar } from 'react-native-paper';
import { getSearchProductInBack } from '../../services/searchs';
import Icon from 'react-native-vector-icons/Ionicons';
import { inputStyles } from '../../theme/Components/inputs';
import { FlatList, Platform, SafeAreaView, View } from 'react-native';
import { EmptyMessageCard } from '../Cards/EmptyMessageCard';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { deleteAllProductsInBag, getBagInventory } from '../../services/bag';
import { useNavigation } from '@react-navigation/native';
import ModalDecision from '../Modals/ModalDecision';
import Toast from 'react-native-toast-message';
import DotLoader from '../UI/DotLaoder';
import { format } from '../../utils/currency';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../UI/CustumText';
import ButtonCustum from '../Inputs/ButtonCustum';
import FooterTwoButtonsScreen from '../Navigation/FooterTwoButtonsScreen';
import { ModuleInterface } from '../../interface/utils';
import useActionsForModules from '../../hooks/useActionsForModules';
import LayoutBagSkeleton from '../Skeletons/Screens/LayoutBagSkeleton';
import ProductInterface from '../../interface/product';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface/productSells';
import { CombinedSellsAndInventoryNavigationStackParamList } from '../../interface/navigation';
import { opcionBag } from '../../interface/bag';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export type CombinedProductInterface = ProductInterface | ProductSellsInterface | ProductSellsRestaurantInterface;

interface LayoutBagProps<T extends CombinedProductInterface> {
    opcion: opcionBag;
    renderItem: ({ item }: { item: T }) => React.JSX.Element;
    bags: T[];
    setBags: React.Dispatch<React.SetStateAction<T[]>>;
    Type: ModuleInterface['module'];
    totalPrice?: number;
    deletingProductId?: number | null;
}

export const LayoutBag = <T extends CombinedProductInterface>({
    opcion,
    renderItem,
    bags,
    setBags,
    totalPrice,
    deletingProductId,
    Type,
}: LayoutBagProps<T>) => {

    const { theme, typeTheme } = useTheme();
    const { actualModule } = useContext(SettingsContext);
    const { handleError } = useErrorHandler()
    const { handleColorWithModule, handleActionBag } = useActionsForModules();
    const searchInputRef = useRef(null);
    const { goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndInventoryNavigationStackParamList>>();

    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [loadingCleanBag, setLoadingCleanBag] = useState(false);
    const [cleanSearchText, setCleanSearchText] = useState(false);
    const hideSearch = bags.length <= 0 && searchText.length <= 0;
    const insets = useSafeAreaInsets();

    const onPost = async () => {
        goBack();
        handleActionBag.openConfirmation()
    };

    const handleCleanTemporal = async () => {

        try {
            setLoadingCleanBag(true);
            const product = await deleteAllProductsInBag({ opcion: opcion });

            if (product?.error) return handleError(product.error);

            handleActionBag.resetAfterPost()

            setTimeout(() => {
                goBack();
                setOpenModalDecision(false);
                setLoadingCleanBag(false);
                Toast.show({
                    type: 'tomatoToast',
                    text1: `Se limpió el ${actualModule === 'Inventory' ? 'Inventario' : 'Carrito'}!`
                });
            }, 100);
        } catch (error) {
            handleError(error);
        }
    };

    const handleSearch = async (text: string) => {

        try {
            setSearchText(text);

            // Clean Search.
            if (text === '') {
                setCleanSearchText(true)
                setBags([]);
                setPage(1);

                setTimeout(async () => {
                    const newBags = await getBagInventory({ page, limit: 5, option: opcion });

                    if (newBags.error) {
                        handleError(newBags.error);
                        return;
                    }

                    setBags(newBags);
                    setPage(page + 1);
                    setCleanSearchText(false);
                }, 300);

                return;
            }

            const products = await getSearchProductInBack({ searchTerm: text, opcion: opcion });
            if (products.error) return handleError(products.error);

            setBags(products || []);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(1);
        }

    };

    const loadBags = async () => {
        if (searchText !== "") return;
        if (isLoading || !hasMore) return;
        try {
            setIsLoading(true);
            const newBags = await getBagInventory({ page, limit: 5, option: opcion });
            if (newBags.error) return handleError(newBags.error);

            if (newBags && newBags.length > 0) {
                setBags((prevBags: CombinedProductInterface[]) => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            };

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
            setDataUploaded(true)
        }
    };

    useEffect(() => {
        loadBags();
    }, []);

    if ((bags.length <= 0 && !dataUploaded) || cleanSearchText) {
        return <LayoutBagSkeleton type='bag'/>
    }

    if (parseInt(handleActionBag.numberOfItems) <= 0) {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
                <View style={LayoutBagStyles(theme, typeTheme).message}>
                    <EmptyMessageCard
                        title="No tienes productos aún."
                        message="Empieza a agregar productos al inventario"
                        icon="rocket-outline"
                    />
                </View>
            </SafeAreaView>
        )
    };

    if (loadingCleanBag) {
        return (
            <View>
                <DotLoader />
            </View>
        )
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.background_color }} >
                <View style={LayoutBagStyles(theme, typeTheme).InventoryBagScreen}>

                    {/* Search Bar */}
                    <Searchbar
                        ref={searchInputRef}
                        placeholder="Buscar producto por nombre..."
                        onChangeText={query => handleSearch(query)}
                        value={searchText}
                        style={[
                            inputStyles(theme, typeTheme).searchBar,
                            { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom },
                            hideSearch && { display: 'none' }
                        ]}
                        iconColor={theme.text_color}
                        placeholderTextColor={theme.text_color}
                        icon={() => <Icon name="search-outline" size={20} color={theme.text_color} />}
                        clearIcon={() => searchText !== "" && <Icon name="close-circle" size={20} color={theme.text_color} />}
                        inputStyle={{ fontSize: globalFont.font_normal, fontFamily: 'SourceSans3-Regular', color: theme.text_color }}
                    />


                    <View style={LayoutBagStyles(theme, typeTheme).content}>
                        {
                            !(bags.length <= 0 && searchText.length > 0) ?
                                <FlatList
                                    data={bags}
                                    renderItem={renderItem}
                                    keyExtractor={product => `${product.idenlacemob}`}
                                    onEndReached={loadBags}
                                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />} // Espaciado de 10px
                                    onEndReachedThreshold={0.5}
                                    contentContainerStyle={{
                                        paddingBottom: Platform.OS === 'android' ? insets.bottom + heightPercentageToDP('10%') : insets.bottom + heightPercentageToDP('5%'),
                                    }}
                                />
                                :
                                <EmptyMessageCard
                                    title="No hay productos con ese nombre."
                                    message="Intenta escribiendo algo diferente."
                                    icon="sad-outline"
                                />
                        }
                    </View>


                    {/* FOOTER */}
                    <FooterTwoButtonsScreen
                        visible={bags.length > 0 && dataUploaded}
                        visibleChildren={Type === 'Sells'}

                        buttonTitle="Guardar"
                        buttonDisabled={false}
                        buttonOnPress={onPost}

                        buttonSmallOnPress={() => setOpenModalDecision(true)}
                        buttonSmallDisable={false}
                        buttonSmallIcon="trash-outline"
                    >
                        <View style={LayoutBagStyles(theme, typeTheme).footer_price}>
                            <CustomText style={LayoutBagStyles(theme, typeTheme).priceLabel}>Total:</CustomText>
                            <CustomText style={[LayoutBagStyles(theme, typeTheme).priceText, { color: handleColorWithModule.primary }]}>
                                {deletingProductId ? "Calculando..." : format(totalPrice || 0)}
                            </CustomText>
                        </View>
                    </FooterTwoButtonsScreen>
                </View>
            </SafeAreaView>

            {/* Modal */}
            <ModalDecision visible={openModalDecision} message="Seguro de limpiar el inventario actual?">
                <ButtonCustum
                    title="Limpiar carrito"
                    onPress={handleCleanTemporal}
                    iconName="close"
                    extraStyles={{ ...globalStyles(theme).globalMarginBottomSmall }}
                    disabled={loadingCleanBag}
                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={() => setOpenModalDecision(false)}
                    disabled={loadingCleanBag}
                    buttonColor="white"
                />
            </ModalDecision>
        </>
    );

}
