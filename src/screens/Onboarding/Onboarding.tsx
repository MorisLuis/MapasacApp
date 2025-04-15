import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleProp, TextStyle, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../context/ThemeContext';
import { OnboardingScreenStyles } from '../../theme/OnboardingScreenTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/UI/CustumText';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { AppNavigationProp } from '../../interface/navigation';
import { getModules } from '../../services';
import { ModuleInterface } from '../../interface/other';
import { useResponsive } from '../../hooks/useResponsive';
import ModuleSkeleton from '../../components/Skeletons/Screens/ModuleSkeleton';
import { MODULES_COLUMNS_LANDSCAPE, MODULES_COLUMNS_PORTRAIT } from '../../utils/globalConstants';

const FIRST_LETTER_INDEX = 0;
const FIRST_LETTER_END_INDEX = 1;


const SKELETON_ITEMS_LANDSCAPE = 6;
const SKELETON_ITEMS_PORTRAIT = 4;

const MODULE_OPTION_1 = 1;
const MODULE_OPTION_2 = 2;
const PERMISSION_GRANTED = 1;


export const OnboardingScreen = (): React.ReactElement => {

    const { theme } = useTheme();
    const { user } = useContext(AuthContext);
    const { handleError } = useErrorHandler()
    const { isLandscape } = useResponsive();

    const { navigate } = useNavigation<AppNavigationProp>();
    const [modules, setModules] = useState<ModuleInterface[]>();

    const onGetModules = useCallback(async (): Promise<void> => {
        try {
            const { modules } = await getModules();
            setModules(modules);
        } catch (error) {
            handleError(error);
        }

    }, [handleError]);

    useEffect(() => {
        onGetModules()
    }, [onGetModules]);

    const renderItem = ({ item }: { item: ModuleInterface }): React.ReactElement => {
        return (
            <ModuleOption item={item} />
        )
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={OnboardingScreenStyles(theme).OnboardingScreen}>
                <TouchableOpacity style={OnboardingScreenStyles(theme).topbar} onPress={() => navigate("ProfileNavigation")}>
                    <View style={[
                        OnboardingScreenStyles(theme).topbar_profile,
                        isLandscape && OnboardingScreenStyles(theme).topbar_profile_landscape
                    ]}>
                        <CustomText style={OnboardingScreenStyles(theme).topbar_profile_text}>{user?.razonsocial?.substring(FIRST_LETTER_INDEX, FIRST_LETTER_END_INDEX)}</CustomText>
                    </View>
                </TouchableOpacity>

                <View style={OnboardingScreenStyles(theme).header}>
                    <CustomText style={OnboardingScreenStyles(theme).headerTitle}>{user?.empresa?.trim()}</CustomText>
                </View>

                <View style={OnboardingScreenStyles(theme).content}>
                    {
                        modules ?
                            <FlatList
                                data={modules}
                                numColumns={isLandscape ? MODULES_COLUMNS_LANDSCAPE : MODULES_COLUMNS_PORTRAIT}
                                renderItem={renderItem}
                                keyExtractor={modules => modules.appmob}
                                columnWrapperStyle={OnboardingScreenStyles(theme).content_wrapper}
                                contentContainerStyle={OnboardingScreenStyles(theme).content_container}
                            />
                            :
                            <FlatList
                                data={Array.from({ length: isLandscape ? SKELETON_ITEMS_LANDSCAPE : SKELETON_ITEMS_PORTRAIT })}
                                keyExtractor={(_, index) => `skeleton-${index}`}
                                renderItem={() => <ModuleSkeleton />}
                                numColumns={isLandscape ? MODULES_COLUMNS_LANDSCAPE : MODULES_COLUMNS_PORTRAIT}
                                columnWrapperStyle={OnboardingScreenStyles(theme).content_wrapper}
                                contentContainerStyle={OnboardingScreenStyles(theme).content_container}
                            />
                    }

                </View>
            </View>
        </SafeAreaView>
    )
}

const ID_APP_MODULE_INVENTARIO = 1;
const ID_APP_MODULE_PEDIDOS = 2;

export const ModuleOption = ({ item }: { item: ModuleInterface }): React.ReactElement => {

    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<AppNavigationProp>();
    const { handleSetActualModule } = useContext(SettingsContext);
    const iconColor = typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary

    const handleSelectOption = (): void => {

        if (item.idappmob === MODULE_OPTION_1) {
            handleSetActualModule('Inventory')
            navigate('InventoryNavigation')
        } else if (item.idappmob === MODULE_OPTION_2) {
            handleSetActualModule('Sells')
            navigate('SellsNavigation')
        } else {
            handleSetActualModule('Sells-Restaurant');
            navigate('SellsRestaurantNavigation')
        }

    };

    const extraStyles = (): {
        styles: StyleProp<TextStyle>,
        icon: string
    } => {
        let styles;
        let icon;

        if (item.idappmob === ID_APP_MODULE_INVENTARIO) {
            styles = { backgroundColor: item.permisos === PERMISSION_GRANTED ? theme.color_tertiary : theme.color_gray }
            icon = "scan-outline"
        } else if (item.idappmob === ID_APP_MODULE_PEDIDOS) {
            styles = { backgroundColor: item.permisos === PERMISSION_GRANTED ? theme.color_tertiary : theme.color_gray }
            icon = "swap-horizontal-outline"
        } else {
            styles = { backgroundColor: item.permisos === PERMISSION_GRANTED ? theme.color_tertiary : theme.color_gray }
            icon = "restaurant-outline"
        }

        return {
            styles,
            icon
        }
    }

    return (
        <TouchableOpacity
            onPress={handleSelectOption}
            style={[OnboardingScreenStyles(theme, typeTheme).moduleOption, extraStyles().styles]}
        >
            <Icon name={extraStyles().icon} size={24} color={iconColor} />
            <CustomText style={OnboardingScreenStyles(theme, typeTheme).optionText}>{item.appmob}</CustomText>
        </TouchableOpacity>
    )
}
