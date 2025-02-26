import { View, Platform, TouchableOpacity, Text } from 'react-native'
import React, { useContext } from 'react'
import CustomTabBar from './CustomTabBar'
import { NavigationHelpers, ParamListBase, TabNavigationState, useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';
import { BlurView } from '@react-native-community/blur';
import { customTabBarStyles } from '../../theme/Components/Navigation/customTabBarTheme';
import { InventoryNavigationProp } from '../../interface/navigation';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';

interface CustomTabBarProps {
    state: TabNavigationState<ParamListBase>;
    descriptors: any;
    navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
    absolute?: boolean
}

const CustumNavigationInventory = ({ state, descriptors, navigation, absolute }: CustomTabBarProps) => {

    const { handleCameraAvailable, startScanning } = useContext(SettingsContext);
    const { navigate } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme } = useTheme();

    const renderTabButton = (route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
            handleCameraAvailable(route.name === "[ScannerNavigation] - camera");
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigate(route.name);
            }
        };

        const textColor = isFocused
            ? (typeTheme === 'dark' ? theme.text_color_secondary : theme.text_color)
            : (typeTheme === 'dark' ? theme.text_color : theme.text_color);

        const containerStyle = {
            backgroundColor: isFocused ? theme.color_tertiary : (Platform.OS === "android" ? theme.background_color : "transparent")
        };

        // Determina si `label` es una función o un string y maneja según corresponda
        let labelContent: React.ReactNode;
        if (typeof label === 'function') {
            labelContent = label({ focused: isFocused, color: textColor, children: label });
        } else {
            labelContent = label;
        }

        return (
            <TouchableOpacity
                key={index}
                onPress={onPress}
                disabled={startScanning}
                style={[customTabBarStyles(theme, typeTheme).navButton, containerStyle]}
            >
                {Platform.OS === "android" ? (
                    <View style={customTabBarStyles(theme, typeTheme).blurContainer}>
                        <CustomText style={customTabBarStyles(theme).sectionTitle}>
                            {labelContent}
                        </CustomText>
                    </View>
                ) : (
                    <>
                        <BlurView
                            style={customTabBarStyles(theme, typeTheme).blurContainer}
                            blurType="light"
                            blurAmount={10}
                        />
                        <CustomText style={customTabBarStyles(theme).sectionTitle}>
                            {labelContent}
                        </CustomText>
                    </>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <CustomTabBar
            Type='Inventory'
            renderTabButton={renderTabButton}
            state={state}
            absolute={absolute}
        />
    )
}

export default CustumNavigationInventory