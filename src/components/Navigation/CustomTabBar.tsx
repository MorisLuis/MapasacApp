import React, { JSX, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { BlurView } from '@react-native-community/blur';
import { Text } from 'react-native';

import { customTabBarStyles } from '../../theme/Components/Navigation/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';
import { ModuleInterface } from '../../interface/utils';
import useActionsForModules from '../../hooks/useActionsForModules';
import useDataForModule from '../../hooks/useDataForModule';
import { ScannerNavigationStackParamList } from '../../navigator/ScannerNavigation';
import { AppNavigationProp } from '../../interface';
import LayoutGrandient from '../Layouts/LayoutGrandient';

interface CustomTabBarInterface {
    Type: ModuleInterface['module'];
    menu?: { header: string, route: keyof ScannerNavigationStackParamList, onPress?: () => void }[];
    navigation?: MaterialTopTabNavigationProp<ScannerNavigationStackParamList>;
    absolute?: boolean
};

const DEFAULT_SUBMENU_INDEX = 0;
const LAYOUT_GRADIENT_START = 1;
const LAYOUT_GRADIENT_END = 1;


const CustomTabBar = ({
    Type,
    menu,
    navigation,
    absolute
}: CustomTabBarInterface): JSX.Element => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { handleColorWithModule, handleActionBag } = useActionsForModules();
    const { navigate } = useNavigation<AppNavigationProp>();
    const { numberOfItems } = useDataForModule();

    const [subMenuSelected, setSubMenuSelected] = useState<string>(menu?.[DEFAULT_SUBMENU_INDEX].header ?? "")

    const handleGoOnboarding = (): void => {
        navigate("OnboardingScreen")
    };

    const handleLayoutColor = (): "green" | "purple" | "red" => {
        let color: "green" | "purple" | 'red' = "green";

        if (Type === 'Sells') {
            color = "purple"
        } else if (Type === 'Inventory') {
            color = "green"
        } else if (Type === 'Sells-Restaurant') {
            color = "red"
        } else {
            color = "green"
        }
        return color;
    }

    const renderCustumTabBar = (): JSX.Element => {
        return (
            <View style={customTabBarStyles(theme).content}>
                <View style={customTabBarStyles(theme).content_left}>
                    {/* BACK */}
                    <TouchableOpacity
                        onPress={handleGoOnboarding}
                        style={customTabBarStyles(theme).buttonBack}
                    >
                        <Icon name="arrow-back-outline" size={20} color={iconColor} />
                    </TouchableOpacity>

                    {/* MENU */}
                    {
                        menu?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    customTabBarStyles(theme, typeTheme).navButton,
                                    subMenuSelected === item.header && { backgroundColor: handleColorWithModule.primary }
                                ]}
                                onPress={() => {
                                    item?.onPress?.()
                                    navigation?.navigate(item.route);
                                    setSubMenuSelected(item.header)
                                }}
                            >
                                <BlurView
                                    style={customTabBarStyles(theme, typeTheme).blurContainer}
                                    blurType="light"
                                    blurAmount={10}
                                />
                                <Text style={customTabBarStyles(theme).sectionTitle}>
                                    {item.header}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                {/* BAG */}
                <TouchableOpacity onPress={() => handleActionBag.openBag()}>
                    <View style={customTabBarStyles(theme, typeTheme).content_right}>
                        <View style={customTabBarStyles(theme, typeTheme).buttonBag}>
                            <Icon name="albums-outline" size={22} color={iconColor} />
                            <View style={[customTabBarStyles(theme, typeTheme).bagCounter, { backgroundColor: handleColorWithModule.primary }]}>
                                <CustomText style={{ color: typeTheme === 'dark' ? theme.color_black : theme.text_color }}>{numberOfItems}</CustomText>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {
                absolute ?
                    /* Is absolute in camera */
                    <SafeAreaView style={customTabBarStyles(theme).customTabBarAbsolute}>
                        {renderCustumTabBar()}
                    </SafeAreaView>
                    :
                    <LayoutGrandient
                        color={handleLayoutColor()}
                        locations={[LAYOUT_GRADIENT_START, LAYOUT_GRADIENT_END]}
                    >
                        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
                            {renderCustumTabBar()}
                        </SafeAreaView>
                    </LayoutGrandient>
            }
        </>
    );
};

export default CustomTabBar;
