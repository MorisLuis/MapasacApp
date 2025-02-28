import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { customTabBarStyles } from '../../theme/Components/Navigation/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../UI/CustumText';
import { ModuleInterface } from '../../interface/utils';
import useActionsForModules from '../../hooks/useActionsForModules';
import useDataForModule from '../../hooks/useDataForModule';
import { ScannerNavigationStackParamList } from '../../navigator/ScannerNavigation';
import { AppNavigationProp } from '../../interface';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { BlurView } from '@react-native-community/blur';
import { Text } from 'react-native';
import LayoutGrandient from '../Layouts/LayoutGrandient';

interface CustomTabBarInterface {
    Type: ModuleInterface['module'];
    menu?: { header: string, route: keyof ScannerNavigationStackParamList, onPress?: () => void }[];
    navigation?: MaterialTopTabNavigationProp<ScannerNavigationStackParamList>;
    absolute?: boolean
}

const CustomTabBar = ({
    Type,
    menu,
    navigation,
    absolute
}: CustomTabBarInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { handleColorWithModule, handleActionBag } = useActionsForModules();
    const { navigate } = useNavigation<AppNavigationProp>();

    const [subMenuSelected, setSubMenuSelected] = useState<string>(menu?.[0].header ?? "")

    const handleGoOnboarding = () => {
        navigate("OnboardingScreen")
    };

    const handleLayoutColor = () => {
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

    const renderCustumTabBar = () => {
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
                                    subMenuSelected === item.header && {  backgroundColor: handleColorWithModule.primary }
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
                                <CustomText style={{ color: typeTheme === 'dark' ? theme.color_black : theme.text_color }}>{parseInt(useDataForModule().numberOfItems)}</CustomText>
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
                    <LayoutGrandient color={handleLayoutColor()} locations={[1, 1]}>
                        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
                            {renderCustumTabBar()}
                        </SafeAreaView>
                    </LayoutGrandient>
            }
        </>
    );
};

export default CustomTabBar;
