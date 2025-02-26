import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FlatList, SafeAreaView, View } from 'react-native';
import { LayoutBagStyles } from '../../theme/Layout/LayoutBagTheme';
import { globalFont } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { inputStyles } from '../../theme/Components/inputs';
import useErrorHandler from '../../hooks/useErrorHandler';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import FooterScreen from '../../components/Navigation/FooterScreen';
import ProductInterface from '../../interface/product';
import LayoutSearchSkeleton from '../Skeletons/Screens/LayoutSearchSkeleton';
import { ClientInterface } from '../../interface';

interface LayoutSearchInterface<T> {
    handleGetItem: (page: number) => Promise<T[]>;
    handleSearchItem: (text: string) => Promise<T[]>;
    onSelect?: (item?: T) => void;

    renderItem: ({ item }: { item: T }) => React.JSX.Element;
    title: string;
    footerVisible?: boolean
}

export const LayoutSearch = <T extends ClientInterface | ProductInterface>({
    handleGetItem,
    handleSearchItem,
    renderItem,
    title,
    onSelect,
    footerVisible
}: LayoutSearchInterface<T>) => {
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const searchInputRef = useRef(null);

    const loadItems = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const newItems = await handleGetItem(page)

            if (newItems && newItems.length > 0) {
                setFilteredItems(prevClients => [...prevClients, ...newItems]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
            setDataUploaded(true);
        }
    }, [isLoading, hasMore, page]);

    const handleSearch = useCallback(async (text: string) => {
        try {
            setSearchText(text);
            if (text === '') {
                setDataUploaded(false)
                setFilteredItems([]);
                setPage(0);
                loadItems();
                return;
            };
            const clientsSearch = await handleSearchItem(text)
            setFilteredItems(clientsSearch || []);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(1);
        };
    }, [loadItems, handleSearchItem, handleError]);

    const renderFooter = useCallback(() => (
        (filteredItems?.length <= 0 && dataUploaded) ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    useEffect(() => {
        loadItems();
    }, []);

    if ((filteredItems.length <= 0 && !dataUploaded)) {
        return <LayoutSearchSkeleton/>
    }

    if (filteredItems?.length <= 0 && dataUploaded && searchText.length <= 0) {
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

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={LayoutBagStyles(theme, typeTheme).InventoryBagScreen}>
                {/* SEARCH BAR */}
                <Searchbar
                    ref={searchInputRef}
                    placeholder={`Buscar ${title} por nombre...`}
                    onChangeText={query => handleSearch(query)}
                    value={searchText}
                    style={[inputStyles(theme).searchBar, inputStyles(theme).input, { gap: 0 }]}
                    iconColor={theme.text_color}
                    placeholderTextColor={theme.text_color}
                    icon={() => <Icon name="search-outline" size={20} color={theme.text_color} />}
                    clearIcon={() => searchText !== "" && <Icon name="close-circle" size={20} color={theme.text_color} />}
                    inputStyle={{ fontSize: globalFont.font_normal, fontFamily: 'SourceSans3-Regular', color: theme.text_color }}
                />

                {/* PRODUCTS */}
                {
                    !(filteredItems.length <= 0 && searchText.length > 0) ?
                        <FlatList
                            style={LayoutBagStyles(theme, typeTheme).content}
                            data={filteredItems}
                            renderItem={renderItem}
                            keyExtractor={(item) => `${(item as ClientInterface).idclientes || (item as ProductInterface).idinvearts}`}
                            ListFooterComponent={renderFooter}
                            onEndReached={searchText !== "" ? null : loadItems}
                            onEndReachedThreshold={searchText !== "" ? null : 1}
                        />
                        :
                        <EmptyMessageCard
                            title={`No hay ${title} con ese nombre.`}
                            message='Intenta escribiendo algo diferente.'
                            icon='sad-outline'
                        />
                }

                {/* FOOTER */}
                <FooterScreen
                    buttonDisabled={false}
                    buttonTitle='Agregar'
                    buttonOnPress={() => onSelect?.()}
                    visible={footerVisible && (filteredItems.length > 0 && dataUploaded)}
                />
            </View>

        </SafeAreaView>
    );
};
