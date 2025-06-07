import React, { useState, useEffect, useMemo, useCallback, JSX } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Control, Controller, Path, useWatch } from 'react-hook-form';

import CustomText from '../UI/CustumText';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { globalFont } from '../../theme/appTheme';
import { format } from '../../utils/currency';
import { UnitType } from '../../interface/navigation';
import { SellsRestaurantDataFormType } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider';
import { FormSellsType } from '../../interface';
import { useTheme } from '../../hooks/styles/useTheme';

export type FormTypeCombined = FormSellsType | SellsRestaurantDataFormType;

interface CardButtonInterface<T extends FormTypeCombined> {
    onPress?: () => void;
    label: string;
    valueDefault: string;
    color: 'purple' | 'green' | 'red' | 'blue' | 'black';

    /* Optional */
    specialValue?: string;
    control?: Control<T, unknown> | null;
    controlValue?: Path<T>;
    icon?: string;
    isPrice?: boolean;
}

const CardButton = <T extends FormTypeCombined>({
    onPress,
    label,
    valueDefault,
    color,
    control = null,
    controlValue,
    icon,
    isPrice,
    specialValue
}: CardButtonInterface<T>): JSX.Element => {
    const { typeTheme, theme, size } = useTheme();
    const [currentValue, setCurrentValue] = useState<string | number>(valueDefault);

    const resolvedColor = useMemo(
        () => (color === 'black' && typeTheme === 'dark') ? 'white' : color,
        [color, typeTheme]
    );

    const handleValue = useCallback((value: string | UnitType | number): string | number => {
        if (typeof value === 'object' && 'value' in value) {
            return value?.value?.trim();
        }
        if (isPrice) {
            return format(Number(value));
        }
        return typeof value === 'number' ? value : value;
    }, [isPrice]);

    const isDefaultValue = currentValue === valueDefault;

    // Llama a useWatch fuera de la condición
    const watchedValue = control && controlValue
        /* eslint-disable-next-line react-hooks/rules-of-hooks */
        ? useWatch({
            control,
            name: controlValue
        })
        : undefined;  // Aquí le asignamos undefined si no se usa el control

    useEffect(() => {
        if (watchedValue !== undefined) {
            const newValue = watchedValue ? handleValue(watchedValue) : valueDefault;
            setCurrentValue(newValue);
        } else {
            setCurrentValue(valueDefault);
        }
    }, [watchedValue, handleValue, valueDefault]);


    const inputStyle = useMemo(() => {
        return [
            SellsDataScreenTheme({ theme, typeTheme, size }).inputContainer,
            (isDefaultValue && !specialValue) && { borderColor: theme.color_border_dark, borderWidth: 1 }
        ];
    }, [theme, typeTheme, isDefaultValue, specialValue, size]);


    return (
        <TouchableOpacity
            style={inputStyle}
            onPress={onPress}
        >
            {/* LABEL */}
            <View style={SellsDataScreenTheme({ theme, typeTheme, size }).inputContainer_left}>
                {icon && <Icon name={icon} color={theme[`color_${resolvedColor}`]} size={globalFont(size).font_normal} />}
                <CustomText
                    style={[SellsDataScreenTheme({ theme, typeTheme, size }).label, { color: theme[`color_${resolvedColor}`] }]}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {label}
                </CustomText>
            </View>

            {/* VALUE */}
            {control && controlValue ? (
                <Controller
                    control={control}
                    name={controlValue}
                    render={({ field: { value } }) => {
                        const newValue = value ? handleValue(value) : valueDefault;

                        return (
                            <CustomText
                                style={SellsDataScreenTheme({ theme, typeTheme, size }).labelValue}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {specialValue || newValue}
                            </CustomText>
                        );
                    }}
                />
            ) : specialValue ? (
                <CustomText
                    style={SellsDataScreenTheme({ theme, typeTheme, size }).labelValue}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {specialValue}
                </CustomText>
            ) : null}
        </TouchableOpacity>
    );
};


export default CardButton;


