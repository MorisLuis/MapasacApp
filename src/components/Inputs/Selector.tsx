import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { selectStyles } from '../../theme/Components/inputs';
import { View } from 'react-native'
import { globalFont, globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';


export type OptionType = {
    label: string
    value: string | number
}

interface SelectorInterface {
    items: OptionType[];
    onDone?: () => void;
    onValueChange: (value: number) => void;
    value: string;
    label: string
}

export const Selector = ({
    items,
    onDone,
    onValueChange,
    value,
    label
}: SelectorInterface) => {

    const { theme } = useTheme();

    const handleValueChange = (value: string) => {
        if (value == null) return;
        onValueChange(parseInt(value));
    }

    return (
        <View>
            <CustomText style={{
                fontSize: globalFont.font_normal,
                marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
                color: theme.text_color
            }}
            >{label}</CustomText>

            <RNPickerSelect
                onValueChange={handleValueChange}
                placeholder={{
                    label: 'Selecciona una opción...',
                    value: null,
                }}
                items={items}
                onDonePress={onDone}
            >
                <View style={selectStyles(theme).input}>
                    <CustomText style={{ color: theme.text_color }}>
                        {value}
                    </CustomText>
                </View>
            </RNPickerSelect>
        </View>
    )
};