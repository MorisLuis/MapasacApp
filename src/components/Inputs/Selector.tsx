import React, { JSX } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native'

import { selectStyles } from '../../theme/Components/inputs';
import { Theme, globalFont, globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';


export type OptionType = {
    label: string
    value: string | number
}

interface SelectorInterface {
    items: OptionType[];
    onDone?: () => void;
    onValueChange: (_value: number) => void;
    value: string;
    label: string
}

export const Selector = ({
    items,
    onDone,
    onValueChange,
    value,
    label
}: SelectorInterface): JSX.Element => {

    const { theme } = useTheme();

    const handleValueChange = (value: string): void => {
        if (value == null) return;
        onValueChange(parseInt(value));
    }

    return (
        <View>
            <CustomText style={extraStyles(theme).selector}>{label}</CustomText>

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

const extraStyles = (theme: Theme): ReturnType<typeof StyleSheet.create> => ({
    selector: {
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2, // eslint-disable-line no-magic-numbers
        color: theme.text_color
    }
})