import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ParamListBase, TabNavigationState, useNavigation } from '@react-navigation/native';
import { customTabBarStyles } from '../../theme/Components/Navigation/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../UI/CustumText';
import LayoutGrandient from '../Layouts/LayoutGrandient';
import { ModuleInterface } from '../../interface/utils';
import useActionsForModules from '../../hooks/useActionsForModules';
import { CombineNavigationProp } from '../../interface/navigation';
import useDataForModule from '../../hooks/useDataForModule';

// pending

interface CustomTabBarInterface {
    Type: ModuleInterface['module'];
    renderTabButton?: (route: any, index: number) => React.JSX.Element;
    state?: TabNavigationState<ParamListBase>;
    absolute?: boolean;
}

const CustomTabBar = ({ renderTabButton, state, Type, absolute }: CustomTabBarInterface) => {

    const { navigate } = useNavigation<CombineNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { handleColorWithModule, handleActionBag } = useActionsForModules()

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

    const handleGoOnboarding = () => {
        navigate("OnboardingScreen")
    };

    const renderCustumTabBar = () => {
        return (
            <View style={customTabBarStyles(theme).content}>
                <View style={customTabBarStyles(theme).content_left}>
                    <TouchableOpacity onPress={handleGoOnboarding} style={customTabBarStyles(theme).buttonBack}>
                        <Icon name="arrow-back-outline" size={20} color={iconColor} />
                    </TouchableOpacity>
                    {
                        (state && renderTabButton) &&
                        <View style={customTabBarStyles(theme).navigation}>
                            {state.routes.map(renderTabButton)}
                        </View>
                    }
                </View>

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
