import React, { JSX, useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { OnboardingScreenStyles } from '../../theme/OnboardingScreenTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import CustomText from '../../components/UI/CustumText';
import { AppNavigationProp } from '../../interface/navigation';
import { getModules } from '../../services';
import { ModuleInterface } from '../../interface/other';
import { useResponsive } from '../../hooks/UI/useResponsive';
import ModuleSkeleton from '../../components/Skeletons/Screens/ModuleSkeleton';
import { MODULES_COLUMNS_LANDSCAPE, MODULES_COLUMNS_PORTRAIT } from '../../utils/globalConstants';
import { useTheme } from '../../hooks/styles/useTheme';
import { ModuleOption } from './OnboardingModule';

const FIRST_LETTER_INDEX = 0;
const FIRST_LETTER_END_INDEX = 1;


const SKELETON_ITEMS_LANDSCAPE = 6;
const SKELETON_ITEMS_PORTRAIT = 3;


export const OnboardingScreen = (): React.ReactElement => {

    const { theme, size } = useTheme();
    const { user } = useContext(AuthContext);
    const { isLandscape } = useResponsive();

    const { navigate } = useNavigation<AppNavigationProp>();
    const [modules, setModules] = useState<ModuleInterface[]>();
    const numModulsCol = isLandscape ? MODULES_COLUMNS_LANDSCAPE : MODULES_COLUMNS_PORTRAIT

    const onGetModules = useCallback(async (): Promise<void> => {
        const { modules } = await getModules();
        setModules(modules);
    }, []);

    const renderModuleOption = ({ item }: { item: ModuleInterface }): React.ReactElement => {
        return (
            <ModuleOption item={item} />
        )
    };

    const renderHeader = (): JSX.Element => {
        return (
            <View style={OnboardingScreenStyles({ theme, size }).header}>
                <View style={OnboardingScreenStyles({ theme, size }).header__user}>
                    <TouchableOpacity
                        onPress={() => navigate("ProfileNavigation")}
                        style={[
                            OnboardingScreenStyles({ theme, size }).user__square,
                            isLandscape && OnboardingScreenStyles({ theme, size }).user__square__landscape
                        ]}
                    >
                        <CustomText style={OnboardingScreenStyles({ theme, size }).user__name}>{user?.usr?.substring(FIRST_LETTER_INDEX, FIRST_LETTER_END_INDEX)}</CustomText>
                    </TouchableOpacity>
                </View>

                <View style={OnboardingScreenStyles({ theme, size }).header__client}>
                    <CustomText style={OnboardingScreenStyles({ theme, size }).title}>{user?.empresa?.trim()}</CustomText>
                </View>
            </View>
        )
    };

    useEffect(() => {
        onGetModules()
    }, [onGetModules]);


    if (!modules) {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background_color }} >
                <View style={OnboardingScreenStyles({ theme, size }).OnboardingScreen}>

                    {renderHeader()}
                    <View style={OnboardingScreenStyles({ theme, size }).content}>
                        <FlatList
                            key={isLandscape ? 'landscape' : 'portrait'}
                            data={Array.from({ length: isLandscape ? SKELETON_ITEMS_LANDSCAPE : SKELETON_ITEMS_PORTRAIT })}
                            renderItem={() => <ModuleSkeleton />}
                            numColumns={numModulsCol}
                            horizontal={false}
                            columnWrapperStyle={OnboardingScreenStyles({ theme, size }).content_wrapper}
                            contentContainerStyle={OnboardingScreenStyles({ theme, size }).content_container}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={OnboardingScreenStyles({ theme, size }).OnboardingScreen}>
                {renderHeader()}
                <View style={OnboardingScreenStyles({ theme, size }).content}>
                    <FlatList
                        key={isLandscape ? 'landscape' : 'portrait'}
                        keyExtractor={modules => isLandscape ? `landscape-${modules.appmob}` : `portrait-${modules.appmob}`}
                        data={modules}
                        numColumns={numModulsCol}
                        renderItem={renderModuleOption}
                        columnWrapperStyle={OnboardingScreenStyles({ theme, size }).content_wrapper}
                        contentContainerStyle={OnboardingScreenStyles({ theme, size }).content_container}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

