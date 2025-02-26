import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { OnboardingScreenStyles } from '../../theme/OnboardingScreenTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/auth/AuthContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/UI/CustumText';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { AppNavigationProp } from '../../interface/navigation';
import { getModules } from '../../services';

interface modulesInterface {
    idappmob: number,
    activo: string,
    appmob: string,
    permisos: number
}

export const OnboardingScreen = () => {

    const { theme } = useTheme();
    const { user } = useContext(AuthContext);
    const { handleError } = useErrorHandler()

    const { navigate } = useNavigation<AppNavigationProp>();
    const [modules, setModules] = useState<modulesInterface[]>()

    const oddModules = modules?.filter(module => module.idappmob % 2 !== 0);
    const evenModules = modules?.filter(module => module.idappmob % 2 === 0);

    const onGetModules = async () => {
        try {
            const modulesData = await getModules();
            if (modulesData?.error) return handleError(modulesData.error);
            setModules(modulesData);
        } catch (error) {
            handleError(error);
        }

    };

    useEffect(() => {
        onGetModules()
    }, []);


    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
            <View style={OnboardingScreenStyles(theme).OnboardingScreen}>
                <TouchableOpacity style={OnboardingScreenStyles(theme).topbar} onPress={() => navigate("ProfileNavigation")}>
                    <View style={OnboardingScreenStyles(theme).topbar_profile}>
                        <CustomText
                            style={OnboardingScreenStyles(theme).topbar_profile_text}
                        >
                            {user?.razonsocial?.substring(0, 1)}
                        </CustomText>
                    </View>
                </TouchableOpacity>

                <View style={OnboardingScreenStyles(theme).header}>
                    <CustomText style={OnboardingScreenStyles(theme).headerTitle}>{user?.empresa?.trim()}</CustomText>
                </View>

                <View style={OnboardingScreenStyles(theme).content}>
                    {
                        modules ?
                            oddModules?.map((option, index) => (
                                <View key={option.idappmob}>
                                    <ModuleOption
                                        option={option}
                                        option2={evenModules && evenModules[index]}
                                    />
                                </View>
                            ))
                            :
                            <>
                                {/* <ModulesSkeleton />
                                <ModulesSkeleton /> */}
                            </>
                    }
                </View>

            </View>
        </SafeAreaView>
    )
}

interface ModuleOptionInterface {
    option: modulesInterface,
    option2?: modulesInterface,
}

export const ModuleOption = ({
    option,
    option2,
}: ModuleOptionInterface) => {

    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<AppNavigationProp>();
    const { handleSetActualModule } = useContext(SettingsContext);

    const iconColor = typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary

    const moduleNavigate = (option: number) => {

        if (option === 1) {
            navigate("InventoryNavigation")
        } else if (option === 2) {
            navigate("SellsNavigation")
        } else if (option === 3) {
            navigate('SellsRestaurantNavigation')
        }
    }

    const extraStyles = (option: modulesInterface) => {
        let styles;
        let icon;

        if (option.idappmob === 1) {
            styles = { backgroundColor: option.permisos === 1 ? theme.color_tertiary : theme.color_gray }
            icon = "scan-outline"
        } else if (option.idappmob === 2) { // TEMPORAL
            styles = { backgroundColor: option.permisos === 1 ? theme.color_tertiary : theme.color_gray }
            icon = "swap-horizontal-outline"
        } else { // TEMPORAL
            styles = { backgroundColor: option.permisos === 1 ? theme.color_tertiary : theme.color_gray }
            icon = "restaurant-outline"
        }

        return {
            styles,
            icon
        }
    }

    const handleSelectOption = (opcion: modulesInterface['idappmob']) => {

        if (opcion === 1) {
            handleSetActualModule('Inventory')
        } else if (opcion === 2) {
            handleSetActualModule('Sells')
        } else {
            handleSetActualModule('Sells-Restaurant')
        }

        moduleNavigate(opcion)
    }

    return (
        <View style={OnboardingScreenStyles(theme, typeTheme).moduleOptionRow}>
            <TouchableOpacity
                onPress={() => handleSelectOption(option.idappmob)}
                style={[OnboardingScreenStyles(theme, typeTheme).moduleOption, extraStyles(option).styles]}
            >
                <Icon name={extraStyles(option).icon} size={24} color={iconColor} />
                <View>
                    <CustomText style={OnboardingScreenStyles(theme, typeTheme).optionText}>{option.appmob}</CustomText>
                </View>
            </TouchableOpacity>


            {
                option2 ?
                    <TouchableOpacity
                        onPress={() => handleSelectOption(option2.idappmob)}
                        style={[OnboardingScreenStyles(theme, typeTheme).moduleOption, extraStyles(option2).styles]}
                    >
                        <Icon name={extraStyles(option2).icon} size={24} color={iconColor} />
                        <View>
                            <CustomText style={OnboardingScreenStyles(theme, typeTheme).optionText}>{option2.appmob}</CustomText>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={[OnboardingScreenStyles(theme, typeTheme).moduleOption2]}
                    >
                        <View>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}
