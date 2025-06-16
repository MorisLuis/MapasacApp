import React, { JSX, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, Platform, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LayoutBagStyles } from '../../theme/Layout/LayoutBagTheme';
import { getSearchProductInBag } from '../../services/searchs';
import { inputStyles } from '../../theme/Components/inputs';
import { EmptyMessageCard } from '../Cards/EmptyMessageCard';
import { globalStyles } from '../../theme/appTheme';
import { deleteAllProductsInBag, getBagInventory } from '../../services/bag/bag';
import ModalDecision from '../Modals/ModalDecision';
import DotLoader from '../UI/DotLaoder';
import { format } from '../../utils/currency';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../UI/CustumText';
import ButtonCustum from '../Inputs/ButtonCustum';
import FooterTwoButtonsScreen from '../Navigation/FooterTwoButtonsScreen';
import { ModuleInterface } from '../../interface/utils';
import useActionsForModules from '../../hooks/useActionsForModules';
import LayoutBagSkeleton from '../Skeletons/Screens/LayoutBagSkeleton';
import { CombinedSellsAndInventoryNavigationStackParamList } from '../../interface/navigation';
import { opcionBag } from '../../interface/bag';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { CombinedProductInterface } from '../../interface';
import { useTheme } from '../../hooks/styles/useTheme';
import { useResponsive } from '../../hooks/UI/useResponsive';

interface LayoutBagProps {
    opcion: opcionBag;
    renderItem: (_info: { item: CombinedProductInterface }) => React.JSX.Element;
    bags: CombinedProductInterface[];
    setBags: React.Dispatch<React.SetStateAction<CombinedProductInterface[]>>;
    Type: ModuleInterface['module'];
    totalPrice?: number;
    deletingProductId?: number | null;
}

const BAG_EMPTY = 0;
const BAG_INITIAL = 1;
const SEARCH_EMPTY = 0;
const PAGE_INITIAL = 1;
const TIME_TO_CLEAN_BAG = 100;
const TIME_TO_WAIT_FOR_SEARCH = 300;

export const LayoutBag = ({
    opcion,
    renderItem,
    bags,
    setBags,
    totalPrice,
    deletingProductId,
    Type,
}: LayoutBagProps): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const { actualModule } = useContext(SettingsContext);
    const { handleError } = useErrorHandler()
    const { isLandscape } = useResponsive();

    const { handleColorWithModule, handleActionBag } = useActionsForModules();
    const searchInputRef = useRef(null);
    const { goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndInventoryNavigationStackParamList>>();

    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(BAG_INITIAL);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [loadingCleanBag, setLoadingCleanBag] = useState(false);
    const [cleanSearchText, setCleanSearchText] = useState(false);
    const hideSearch = bags.length <= BAG_EMPTY && searchText.length <= SEARCH_EMPTY;
    const insets = useSafeAreaInsets();

    const cleanAllBag = async (): Promise<void> => {
        setLoadingCleanBag(true);
        await deleteAllProductsInBag({ opcion: opcion });

        handleActionBag.resetAfterPost()

        setTimeout(() => {
            goBack();
            setOpenModalDecision(false);
            setLoadingCleanBag(false);
            Toast.show({
                type: 'tomatoToast',
                text1: `Se limpió el ${actualModule === 'Inventory' ? 'Inventario' : 'Carrito'}!`
            });
        }, TIME_TO_CLEAN_BAG);
    };

    const searchProductInBag = async (text: string): Promise<void> => {

        try {
            setSearchText(text);

            // Clean Search.
            if (text === '') {
                setCleanSearchText(true)
                setBags([]);
                setPage(PAGE_INITIAL);

                setTimeout(async () => {
                    const { data: { bag } } = await getBagInventory({ pageParam: page, limit: 5, option: opcion });

                    setBags(bag);
                    setPage(page + PAGE_INITIAL);
                    setCleanSearchText(false);
                }, TIME_TO_WAIT_FOR_SEARCH);

                return;
            }

            const { products } = await getSearchProductInBag({ searchTerm: text, opcion: opcion });

            setBags(products || []);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(PAGE_INITIAL);
        }

    };

    const getBagItems = useCallback(async (): Promise<void> => {
        if (searchText !== "") return;
        if (isLoading || !hasMore) return;
        try {
            setIsLoading(true);
            const { data: { bag } } = await getBagInventory({ pageParam: page, limit: 5, option: opcion });
            if (bag && bag.length > BAG_EMPTY) {
                setBags((prevBags: CombinedProductInterface[]) => [...prevBags, ...bag]);
                setPage(page + PAGE_INITIAL);
            } else {
                setHasMore(false);
            };

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
            setDataUploaded(true)
        }
    }, [hasMore, isLoading, opcion, page, searchText, setBags, handleError]);

    const navigateToConfirmation = async (): Promise<void> => {
        goBack();
        handleActionBag.openConfirmation()
    };

    useEffect(() => {
        getBagItems();
    }, [getBagItems]);

    if ((bags.length >= BAG_EMPTY && !dataUploaded) || cleanSearchText) {
        return <LayoutBagSkeleton type='bag' />
    };

    if (handleActionBag.numberOfItems <= BAG_EMPTY) {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }}>
                <View style={LayoutBagStyles({ theme, typeTheme, size }).LayoutBagScreen}>
                    <View style={LayoutBagStyles({ theme, typeTheme, size }).message}>
                        <EmptyMessageCard
                            title="No tienes productos aún."
                            message="Empieza a agregar productos al inventario"
                            icon="rocket-outline"
                        />
                    </View>
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
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }}>
                <View style={LayoutBagStyles({ theme, typeTheme, size }).LayoutBagScreen}>

                    {/* Search Bar */}
                    <Searchbar
                        ref={searchInputRef}
                        placeholder="Buscar producto por nombre..."
                        onChangeText={query => searchProductInBag(query)}
                        value={searchText}
                        style={[
                            inputStyles({ theme, typeTheme, size }).searchBar,
                            { marginBottom: globalStyles().globalMarginBottom.marginBottom },
                            hideSearch && globalStyles().display_none
                        ]}
                        iconColor={theme.text_color}
                        placeholderTextColor={theme.text_color}
                        icon={() => <Icon name="search-outline" size={20} color={theme.text_color} />}
                        clearIcon={() => searchText !== "" && <Icon name="close-circle" size={20} color={theme.text_color} />}
                        inputStyle={LayoutBagStyles({ theme, typeTheme, size }).input}
                    />

                    <View style={LayoutBagStyles({ theme, typeTheme, size }).content}>
                        {
                            !(bags.length <= BAG_EMPTY && searchText.length > SEARCH_EMPTY) ?
                                <FlatList
                                    data={bags}
                                    renderItem={renderItem}
                                    keyExtractor={product => `${product.idenlacemob}`}
                                    onEndReached={getBagItems}
                                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />} // Espaciado de 10px
                                    onEndReachedThreshold={0.5}
                                    contentContainerStyle={{
                                        paddingBottom: Platform.OS === 'android' ? insets.bottom + size('10%') : insets.bottom + size('5%'),
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
                        visible={bags.length > BAG_EMPTY && dataUploaded}
                        visibleChildren={Type === 'Sells'}

                        buttonTitle="Guardar"
                        buttonDisabled={false}
                        buttonOnPress={navigateToConfirmation}

                        buttonSmallOnPress={() => setOpenModalDecision(true)}
                        buttonSmallDisable={false}
                        buttonSmallIcon="trash-outline"
                    >
                        <View style={[isLandscape ? LayoutBagStyles({ theme, typeTheme, size }).footer_price_landscape : LayoutBagStyles({ theme, typeTheme, size }).footer_price]}>
                            <CustomText style={LayoutBagStyles({ theme, typeTheme, size }).priceLabel}>Total:</CustomText>
                            <CustomText style={[LayoutBagStyles({ theme, typeTheme, size }).priceText, { color: handleColorWithModule.primary }]}>
                                {deletingProductId ? "Calculando..." : totalPrice ? format(totalPrice) : "0"}
                            </CustomText>
                        </View>
                    </FooterTwoButtonsScreen>
                </View>
            </SafeAreaView>

            {/* Modal */}
            <ModalDecision
                visible={openModalDecision}
                message="Seguro de limpiar el inventario actual?"
            >
                <ButtonCustum
                    title="Limpiar carrito"
                    onPress={cleanAllBag}
                    iconName="close"
                    extraStyles={{ ...globalStyles().globalMarginBottomSmall }}
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
