import React, { useCallback, useState, useEffect, useRef, JSX } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LayoutBagStyles } from '../../theme/Layout/LayoutBagTheme';
import { globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/Components/inputs';
import useErrorHandler from '../../hooks/useErrorHandler';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import FooterScreen from '../../components/Navigation/FooterScreen';
import LayoutSearchSkeleton from '../Skeletons/Screens/LayoutSearchSkeleton';
import { ClientInterface, ProductInterface } from '../../interface';
import { useTheme } from '../../hooks/styles/useTheme';

// Definición de constantes para evitar magic numbers
const INITIAL_PAGE = 1;
const EMPTY_VALUE = 0;
const SEARCHBAR_ICON_SIZE = 20;
const FOOTER_PADDING_PERCENTAGE = '5%';
const NUMBER_1 = 1;

interface LayoutSearchInterface<T> {
    handleGetItem: (_page: number) => Promise<T[] | void>;
    handleSearchItem: (_text: string) => Promise<T[] | void>;
    onSelect?: (_item?: T) => void;
    renderItem: (_info: { item: T }) => React.JSX.Element;

    title: string;

    // Footer
    footerVisible?: boolean;
    selectAvailable?: boolean;
}

export const LayoutSearch = <T extends ClientInterface | ProductInterface>({
    handleGetItem,
    handleSearchItem,
    renderItem,
    title,
    onSelect,
    footerVisible,
    selectAvailable
}: LayoutSearchInterface<T>): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const { handleError } = useErrorHandler();

    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState(INITIAL_PAGE);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const searchInputRef = useRef(null);
    const insets = useSafeAreaInsets();

    const loadItems = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        try {
            const newItems = await handleGetItem(page);

            if (newItems && newItems.length > EMPTY_VALUE) {
                setFilteredItems(prevItems => {
                    const uniqueItems = [...new Map(
                        [...prevItems, ...newItems].map(item => [
                            "idclientes" in item ? `C-${item.idclientes}` : `P-${item.idinvearts}`,
                            item
                        ])
                    ).values()];
                    return uniqueItems;
                });
                setPage(prevPage => prevPage + INITIAL_PAGE);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
            setDataUploaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore, handleError, handleGetItem]);

    const handleSearch = useCallback(async (text: string) => {
        try {
            setSearchText(text);
            if (text === '') {
                setDataUploaded(false);
                setFilteredItems([]);
                setPage(INITIAL_PAGE);
                loadItems();
                return;
            }
            const itemsSearch = await handleSearchItem(text);
            setFilteredItems(itemsSearch || []);
            setPage(INITIAL_PAGE);
        } catch (error) {
            handleError(error);
        }
    }, [loadItems, handleSearchItem, handleError]);

    const renderFooter = useCallback(() => (
        (filteredItems?.length <= EMPTY_VALUE && dataUploaded)
            ? <ActivityIndicator size="large" color={theme.color_primary} />
            : null
    ), [dataUploaded, theme.color_primary, filteredItems?.length]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    if ((filteredItems.length <= EMPTY_VALUE && !dataUploaded)) {
        return <LayoutSearchSkeleton />;
    }

    if (filteredItems?.length <= EMPTY_VALUE && dataUploaded && searchText.length <= EMPTY_VALUE) {
        return (
            <SafeAreaView style={globalStyles().flex}>
                <View style={LayoutBagStyles({ theme, typeTheme, size }).message}>
                    <EmptyMessageCard
                        title="No tienes productos aún."
                        message="Empieza a agregar productos al inventario"
                        icon="rocket-outline"
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={LayoutBagStyles({ theme, typeTheme, size }).LayoutBagScreen}>
                {/* SEARCH BAR */}
                <Searchbar
                    ref={searchInputRef}
                    placeholder={`Buscar ${title} por nombre...`}
                    onChangeText={query => handleSearch(query)}
                    value={searchText}
                    style={[inputStyles({ theme, size }).searchBar, inputStyles({ theme, size }).input]}
                    iconColor={theme.text_color}
                    placeholderTextColor={theme.text_color}
                    icon={() => <Icon name="search-outline" size={SEARCHBAR_ICON_SIZE} color={theme.text_color} />}
                    clearIcon={() => searchText !== "" && <Icon name="close-circle" size={SEARCHBAR_ICON_SIZE} color={theme.text_color} />}
                    inputStyle={LayoutBagStyles({ theme, typeTheme, size }).inputSearch}
                />

                {/* PRODUCTS */}
                {
                    !(filteredItems.length <= EMPTY_VALUE && searchText.length > EMPTY_VALUE) ?
                        <FlatList
                            data={filteredItems}
                            renderItem={renderItem}
                            keyExtractor={(item) => `${(item as ClientInterface).idclientes || (item as ProductInterface).idinvearts}`}
                            ListFooterComponent={renderFooter}
                            onEndReached={searchText !== "" ? null : loadItems}
                            onEndReachedThreshold={searchText !== "" ? null : NUMBER_1}
                            contentContainerStyle={{
                                paddingBottom: insets.bottom + size(FOOTER_PADDING_PERCENTAGE),
                            }}
                            ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                        />
                        :
                        <EmptyMessageCard
                            title={`No hay ${title} con ese nombre.`}
                            message="Intenta escribiendo algo diferente."
                            icon="sad-outline"
                        />
                }

                {/* FOOTER */}
                <FooterScreen
                    buttonDisabled={!selectAvailable ?? false}
                    buttonTitle="Agregar"
                    buttonOnPress={() => onSelect?.()}
                    visible={footerVisible && (filteredItems.length > EMPTY_VALUE && dataUploaded)}
                />
            </View>
        </SafeAreaView>
    );
};
