import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../../interface";
import { useTheme } from "../../hooks/styles/useTheme";
import { SettingsContext } from "../../context/settings/SettingsContext";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";
import { OnboardingScreenStyles } from "../../theme/OnboardingScreenTheme";
import CustomText from "../../components/UI/CustumText";
import Icon from 'react-native-vector-icons/Ionicons';
import { ModuleInterface } from "../../interface/other";

const ID_APP_MODULE_INVENTARIO = 1;
const ID_APP_MODULE_PEDIDOS = 2;
const MODULE_OPTION_1 = 1;
const MODULE_OPTION_2 = 2;
const PERMISSION_GRANTED = 1;


export const ModuleOption = ({ item }: { item: ModuleInterface }): React.ReactElement => {

    const { theme, typeTheme, size } = useTheme();
    const { navigate } = useNavigation<AppNavigationProp>();
    const { handleSetActualModule } = useContext(SettingsContext);
    const iconColor = typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary

    const handleSelectOption = (): void => {

        if (item.idappmob === MODULE_OPTION_1) {
            handleSetActualModule('Inventory')
            navigate('InventoryNavigation')
        } else if (item.idappmob === MODULE_OPTION_2) {
            handleSetActualModule('Sells')
            navigate('SellsNavigation')
        } else {
            handleSetActualModule('Sells-Restaurant');
            navigate('SellsRestaurantNavigation')
        }

    };

    const extraStyles = (): {
        styles: StyleProp<TextStyle>,
        icon: string
    } => {
        let styles;
        let icon;

        if (item.idappmob === ID_APP_MODULE_INVENTARIO) {
            styles = { backgroundColor: item.permisos === PERMISSION_GRANTED ? theme.color_tertiary : theme.color_gray }
            icon = "scan-outline"
        } else if (item.idappmob === ID_APP_MODULE_PEDIDOS) {
            styles = { backgroundColor: item.permisos === PERMISSION_GRANTED ? theme.color_tertiary : theme.color_gray }
            icon = "swap-horizontal-outline"
        } else {
            styles = { backgroundColor: item.permisos === PERMISSION_GRANTED ? theme.color_tertiary : theme.color_gray }
            icon = "restaurant-outline"
        }

        return {
            styles,
            icon
        }
    }

    return (
        <TouchableOpacity
            onPress={handleSelectOption}
            style={[OnboardingScreenStyles({ theme, typeTheme, size }).moduleOption, extraStyles().styles]}
        >
            <Icon name={extraStyles().icon} size={24} color={iconColor} />
            <CustomText style={OnboardingScreenStyles({ theme, typeTheme, size }).optionText}>{item.appmob}</CustomText>
        </TouchableOpacity>
    )
}
