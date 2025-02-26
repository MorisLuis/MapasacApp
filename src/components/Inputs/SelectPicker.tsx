import { StyleSheet } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../theme/appTheme';

const SelectPicker = () => {
    const { theme, typeTheme } = useTheme();

    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            style={{
                inputIOS: {
                    minHeight: 50,
                    borderWidth: 1,
                    borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
                    borderRadius: globalStyles(theme).borderRadius.borderRadius,
                    paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,
                    backgroundColor: theme.background_color_secondary,
                    gap: 10,
                    color: theme.text_color
                },
                placeholder: {
                    color: theme.text_color
                }
            }}
            darkTheme={true}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
            useNativeAndroidPickerStyle={false}
        />
    );
}

export default SelectPicker;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // para que el texto no quede detrás del icono
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // para que el texto no quede detrás del icono
    },
});

const styles = StyleSheet.create({
    itemStyle: {
        fontSize: 18, // Tamaño del texto en el menú
        color: 'blue', // Color del texto de las opciones
        backgroundColor: 'lightgray', // Color de fondo de las opciones en Android
    },
});
