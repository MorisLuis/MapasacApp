import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { customHeaderStyles } from '../../theme/Components/Navigation/customHeader';
import CustomText from './CustumText';
import { ProductInterface } from '../../interface';
import { Theme } from '../../theme/appTheme';
import { useTheme } from '../../hooks/styles/useTheme';

interface CustomHeaderInterface {
    navigation: {
        goBack: () => void;
    };
    title: string;
    backAvailable?: boolean;
    back?: { title: string } | (() => void);
    secondaryDesign?: boolean;
    route?: {
        params?: {
            selectedProduct?: ProductInterface;
            fromModal?: boolean;
        };
    };

    onBack?: () => void;
}

export const CustomHeader: React.FC<CustomHeaderInterface> = ({
    navigation,
    title,
    backAvailable = true,
    back,
    secondaryDesign,
    route,
    onBack
}) => {
    const { fromModal } = route?.params || {};
    const { theme, typeTheme, size } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleOnPress = (): void => {
        if (typeof back === 'function') {
            back(); // Si es una función
            onBack?.()
        } else {
            navigation.goBack(); // Acción por defecto
            onBack?.()
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: secondaryDesign ? theme.background_color_secondary : theme.background_color }}>
            <View style={secondaryDesign ? customHeaderStyles(theme, size).CustomHeaderSecondary : customHeaderStyles(theme, size).CustomHeader}>
                {fromModal ? (
                    <View style={customHeaderStyles(theme, size).content}>
                        {backAvailable && (
                            <TouchableOpacity
                                style={customHeaderStyles(theme, size).back}
                                onPress={handleOnPress}
                            >
                                <Icon name="arrow-back-outline" size={size("10%")} color={iconColor} />
                                <CustomText style={customHeaderStyles(theme, size).backText}>Atrás</CustomText>
                            </TouchableOpacity>
                        )}
                        <CustomText style={customHeaderStyles(theme, size).titleHeader}>{title}</CustomText>
                    </View>
                ) : (
                    <View style={customHeaderStyles(theme, size).content}>
                        {backAvailable && (
                            <TouchableOpacity
                                style={customHeaderStyles(theme, size).back}
                                onPress={handleOnPress}
                            >
                                <Icon name="arrow-back-outline" size={20} color={iconColor} />
                                <CustomText style={customHeaderStyles(theme, size).backText}>Atrás</CustomText>
                            </TouchableOpacity>
                        )}
                        <CustomText style={customHeaderStyles(theme, size).titleHeader}>{title}</CustomText>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

interface CustomBackButtonProps {
    navigation: {
        goBack: () => void;
    };
    onClick?: () => void; // Define el tipo como una función opcional
}

export const CustomBackButton: React.FC<CustomBackButtonProps> = ({ navigation, onClick }) => {
    const { typeTheme, theme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handlePress = (): void => {
        onClick?.();
        navigation.goBack();
    };

    return (
        <TouchableOpacity
            style={stylesHeaderBack().back}
            onPress={handlePress}
        >
            <Icon name="chevron-back-outline" size={20} color={iconColor} />
            <CustomText
                style={stylesHeaderBack(theme).text}
            >
                Atrás
            </CustomText>
        </TouchableOpacity>
    );
};

/* eslint-disable react-native/no-unused-styles */
const stylesHeaderBack = (theme?: Theme): ReturnType<typeof StyleSheet.create> => StyleSheet.create({
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        left: 0,
        bottom: 0
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 3,
        color: theme?.text_color
    }
});
