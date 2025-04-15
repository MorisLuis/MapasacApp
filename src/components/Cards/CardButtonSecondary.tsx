import React, { useMemo, JSX } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Control, Path } from 'react-hook-form';

import CustomText from '../UI/CustumText';
import { useTheme } from '../../context/ThemeContext';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { globalFont } from '../../theme/appTheme';
import { SellsRestaurantDataFormType } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider';
import { FormSellsType } from '../../interface';

export type FormTypeCombined = FormSellsType | SellsRestaurantDataFormType;

interface CardButtonInterface<T extends FormTypeCombined> {
    onPress?: () => void;
    value: string | number;
    label: string;
    emptyValue: string;
    color: 'purple' | 'green' | 'red' | 'blue' | 'black';

    /* Optional */
    icon?: string;
    specialValue?: string;
    control?: Control<T, unknown> | null;
    controlValue?: Path<T>;
    isPrice?: boolean;
}

const CardButtonSecondary = <T extends FormTypeCombined>({
    onPress,
    value,
    label,
    emptyValue,
    color,
    icon
}: CardButtonInterface<T>): JSX.Element => {

    const { typeTheme, theme } = useTheme();
    const resolvedColor = useMemo(
        () => (color === 'black' && typeTheme === 'dark') ? 'white' : color,
        [color, typeTheme]
    );

    return (
        <TouchableOpacity
            style={[SellsDataScreenTheme(theme, typeTheme).inputContainer]}
            onPress={onPress}
        >
            {/* LABEL */}
            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                {icon && <Icon name={icon} color={theme[`color_${resolvedColor}`]} size={globalFont.font_normal} />}
                <CustomText
                    style={[SellsDataScreenTheme(theme, typeTheme).label, { color: theme[`color_${resolvedColor}`] }]}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {label}
                </CustomText>
            </View>

            <CustomText
                style={SellsDataScreenTheme(theme, typeTheme).labelValue}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
                {value ? value : emptyValue}
            </CustomText>

        </TouchableOpacity>
    );
};


export default CardButtonSecondary;


