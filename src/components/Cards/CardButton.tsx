import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../UI/CustumText';
import { Control, Controller, Path, useWatch } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import { globalFont } from '../../theme/appTheme';
import { format } from '../../utils/currency';
import { UnitType } from '../../interface/navigation';
import { FormType } from '../../screens/Sells/ProductDetailsSells';
import { SellsRestaurantDataFormType } from '../../context/SellsRestaurants/SellsRestaurantsBagProvider';

export type FormTypeCombined = FormType | SellsRestaurantDataFormType;

interface CardButtonInterface<T extends FormTypeCombined> {
    onPress: () => void;
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
    control = null,  // Definir control con un valor por defecto null
    controlValue,
    icon,
    isPrice,
    specialValue
}: CardButtonInterface<T>) => {
    const { typeTheme, theme } = useTheme();
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

    // Solo usar useWatch si control existe y no es null
    const watchedValue = control && controlValue
        ? useWatch({
            control,
            name: controlValue
        })
        : null;

    useEffect(() => {
        if (control && watchedValue !== undefined) {
            const newValue = watchedValue ? handleValue(watchedValue) : valueDefault;
            setCurrentValue(newValue);
        } else {
            setCurrentValue(valueDefault); // Si no hay control, usar el valor por defecto
        }
    }, [watchedValue, handleValue, valueDefault, control]);

    return (
        <TouchableOpacity
            style={[
                SellsDataScreenTheme(theme, typeTheme).inputContainer,
                (isDefaultValue && !specialValue ) && { borderColor: theme.color_border_dark, borderWidth: 1 }
            ]}
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

            {/* VALUE */}
            {control && controlValue ? (
                <Controller
                    control={control}
                    name={controlValue}
                    render={({ field: { value } }) => {
                        const newValue = value ? handleValue(value) : valueDefault;

                        return (
                            <CustomText
                                style={SellsDataScreenTheme(theme, typeTheme).labelValue}
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
                    style={SellsDataScreenTheme(theme, typeTheme).labelValue}
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
