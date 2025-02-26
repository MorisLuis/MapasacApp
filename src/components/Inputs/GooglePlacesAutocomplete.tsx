import React, { useState } from 'react';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';
import 'react-native-get-random-values';

export interface inputGoogleValue {
    street: string;
    number: string;
    neighborhood: string;
    locality: string;
}

interface GooglePlacesInputInterface {
    locationValue?: inputGoogleValue;
    setLocaltionValue: React.Dispatch<React.SetStateAction<inputGoogleValue | undefined>>;
    onFocus?: () => void;  
    onBlur?: () => void;   
}

const InputGooglePlaces = ({ locationValue, setLocaltionValue, onFocus, onBlur }: GooglePlacesInputInterface) => {
    
    const { theme } = useTheme();
    const [inputText, setInputText] = useState<string>();

    const getAdressDirection = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        if (details && details.address_components) {
            const addressComponents = details.address_components;

            const street = addressComponents.find(component =>
                component.types.includes('route')
            )?.long_name || '';

            const streetNumber = addressComponents.find(component =>
                component.types.includes('street_number')
            )?.long_name || '';

            const colonia = addressComponents.find(component =>
                component.types.includes('sublocality') || component.types.includes('neighborhood')
            )?.long_name || '';

            const municipio = addressComponents.find(component =>
                component.types.includes('locality')
            )?.long_name || '';

            // Actualiza el valor de locationValue
            setLocaltionValue({
                street: street ?? '',
                number: streetNumber ?? '',
                neighborhood: colonia ?? '',
                locality: municipio ?? ''
            });
            
            // Actualiza el texto de entrada también
            setInputText(`${street} ${streetNumber ? `- ${streetNumber}` : ''} ${colonia ? `/ ${colonia}` : ''} ${municipio ? `/ ${municipio}` : ''}`);
        } else {
            console.log("No se pudieron obtener los detalles del lugar.");
        }
    };

    const GooglePlacesAutocompleteQuery = {
        key: 'AIzaSyAdRH2f0yD4Jq8-ZggRjCpKq4eSqufuby8',
        language: 'es',
        components: 'country:mx',
    };

    const inputStyles = {
        container: {
            flex: 0,
            color: theme.text_color
        },
        textInputContainer: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            color: theme.text_color
        },
        textInput: {
            height: 50,
            color: theme.text_color,
            fontSize: globalFont.font_normal,
            borderRadius: globalStyles().borderRadius.borderRadius,
            borderWidth: 0.2,
            borderColor: theme.color_border,
            backgroundColor: theme.background_color_secondary,
            paddingHorizontal: globalStyles().globalPadding.padding,
        },
        listView: {
            backgroundColor: theme.background_color_secondary,
            borderWidth: 0.5,
            borderColor: theme.color_border,
            marginVertical: globalStyles().globalMarginBottom.marginBottom,
            borderRadius: globalStyles().borderRadius.borderRadius,
        },
        row: {
            height: 44,
            borderBottomColor: theme.color_border_dark,
            borderBottomWidth: 0,
            backgroundColor: theme.background_color_secondary,
        },
        description: {
            color: theme.text_color
        },
        poweredContainer: {
            display: 'none'
        },
    };

    const [startTpying, setStartTpying] = useState(false)

    const handleOnFocus = () => {
        onFocus?.()
        setStartTpying(true)
    }

    const valueInput = (inputText && inputText?.length > 0 || startTpying) ? inputText : 
    locationValue ? `${locationValue?.street} ${locationValue?.number ? `- ${locationValue?.number}` : ''} ${locationValue?.neighborhood ? `/ ${locationValue.neighborhood}` : ''} ${locationValue?.locality ? `/ ${locationValue.locality}` : ''}` : ''

    return (
        <GooglePlacesAutocomplete
            placeholder='Buscar dirección.'
            fetchDetails={true}
            onPress={(data, details = null) => getAdressDirection(data, details)}
            query={GooglePlacesAutocompleteQuery}
            styles={inputStyles}
            textInputProps={{
                value: valueInput,
                onChangeText: setInputText,
                onFocus: handleOnFocus,
                onBlur: onBlur,
                placeholderTextColor: theme.text_color
            }}
        />
    );
};

export default InputGooglePlaces;
