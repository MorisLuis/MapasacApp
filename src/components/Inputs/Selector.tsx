import React, { JSX } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native'

import { selectStyles } from '../../theme/Components/inputs';
import { Theme, globalFont, globalStyles } from '../../theme/appTheme';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';


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

    const { theme, size, typeTheme } = useTheme();

    const handleValueChange = (value: string): void => {
        if (value == null) return;
        onValueChange(parseInt(value));
    }

    return (
        <View>
            <CustomText style={extraStyles(theme, size).selector}>{label}</CustomText>

            <RNPickerSelect
                onValueChange={handleValueChange}
                placeholder={{
                    label: 'Selecciona una opción...',
                    value: null,
                }}
                items={items}
                onDonePress={onDone}
            >
                <View style={selectStyles({ theme, typeTheme, size }).input}>
                    <CustomText style={{ color: theme.text_color }}>
                        {value}
                    </CustomText>
                </View>
            </RNPickerSelect>
        </View>
    )
};

const extraStyles = (theme: Theme, size: (_value: string) => number): ReturnType<typeof StyleSheet.create> => ({
    selector: {
        fontSize: globalFont(size).font_normal,
        marginBottom: globalStyles().globalMarginBottomSmall.marginBottom / 2, // eslint-disable-line no-magic-numbers
        color: theme.text_color
    }
})