import React, { useContext } from 'react';
import { View } from 'react-native';
import { CodebarUpdateScreen } from '../screens/Inventory/CodebarUpdate/CodebarUpdateScreen';
import { CodebarUpdateWithInputScreen } from '../screens/Inventory/CodebarUpdate/CodebarUpdateWithInputScreen';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { globalStyles } from '../theme/appTheme';
import ProductInterface from '../interface/product';
import { useTheme } from '../context/ThemeContext';
import { CodebarUpdateNavigationInterface } from '../interface/navigation';
import { CustomHeader } from '../components/UI/CustomHeader';
import CameraModal from '../screens/Inventory/CodebarUpdate/CameraModal';
import { SettingsContext } from '../context/settings/SettingsContext';

export type CodebarNavigationStackParamList = {
    "[CodebarUpdateNavigation] - UpdateCodeBarScreen": { product: ProductInterface };
    "[CodebarUpdateNavigation] - UpdateCodeBarWithInput": { title: string }
    "[CodebarUpdateNavigation] - CameraModal": undefined
};

// Crear el stack navigator
const Stack = createStackNavigator<CodebarNavigationStackParamList>();

export const CodebarUpdateNavigation = ({ route }: CodebarUpdateNavigationInterface) => {
    const { selectedProduct } = route.params;
    const { theme } = useTheme();
    const { updateBarCode} = useContext(SettingsContext);

    return (
        <Stack.Navigator initialRouteName="[CodebarUpdateNavigation] - UpdateCodeBarScreen">

            <Stack.Screen
                name="[CodebarUpdateNavigation] - UpdateCodeBarScreen"
                options={({ navigation }): StackNavigationOptions => ({
                    header: (props) => (
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader 
                            title="Crear codigo de barras" 
                            navigation={navigation} 
                            />
                        </View>
                    ),
                })}
            >
                {props => <CodebarUpdateScreen  selectedProduct={selectedProduct} />}
            </Stack.Screen>

            <Stack.Screen
                name="[CodebarUpdateNavigation] - UpdateCodeBarWithInput"
                options={({ navigation, route }): StackNavigationOptions => ({
                    header: (props) => (
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader
                                {...props}
                                title={route.params.title}
                                navigation={navigation}
                                back={navigation.goBack}
                            />
                        </View>
                    )
                })}
            >
                {props => <CodebarUpdateWithInputScreen selectedProduct={selectedProduct} />}
            </Stack.Screen>

            <Stack.Screen
                name="[CodebarUpdateNavigation] - CameraModal"
                options={({ navigation }): StackNavigationOptions => ({
                    header: (props) => (
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader 
                            title="Actualiza codigo de barras" 
                            navigation={navigation} 
                            onBack={ () => updateBarCode('')}
                            />
                        </View>
                    ),
                })}
            >
                {props => <CameraModal selectedProduct={selectedProduct} />}
            </Stack.Screen>

        </Stack.Navigator>
    );
};
