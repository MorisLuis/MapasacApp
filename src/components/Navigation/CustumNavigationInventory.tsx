import React from 'react'
import CustomTabBar from './CustomTabBar'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

import { ScannerNavigationStackParamList } from '../../navigator/ScannerNavigation';

interface CustomTabBarProps {
    navigation: MaterialTopTabNavigationProp<ScannerNavigationStackParamList>;
    absolute?: boolean
}

const CustumNavigationInventory = ({ navigation, absolute }: CustomTabBarProps) => {

    const menu: { header: string, route: keyof ScannerNavigationStackParamList, onPress?: () => void }[] = [
        {
            header: 'Camara',
            route: '[ScannerNavigation] - camera'
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