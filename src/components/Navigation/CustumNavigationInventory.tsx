import React, { useContext } from 'react'
import CustomTabBar from './CustomTabBar'
import { SettingsContext } from '../../context/settings/SettingsContext';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

import { ScannerNavigationStackParamList } from '../../navigator/ScannerNavigation';

interface CustomTabBarProps {
    navigation: MaterialTopTabNavigationProp<ScannerNavigationStackParamList>;
    absolute?: boolean
}

const CustumNavigationInventory = ({ navigation, absolute }: CustomTabBarProps) => {

    const { handleCameraAvailable, startScanning } = useContext(SettingsContext);

    const menu: { header: string, route: keyof ScannerNavigationStackParamList, onPress?: () => void }[] = [
        {
            header: 'Camara',
            route: '[ScannerNavigation] - camera',
            //onPress: () => handleCameraAvailable(true)
        },
        {
            header: 'Inventario',
            route: '[ScannerNavigation] - inventory'
        }
    ]

    return (
        <CustomTabBar
            Type='Inventory'
            menu={menu}
            navigation={navigation}
            absolute={absolute}
        />
    )
}

export default CustumNavigationInventory