import React, { JSX, useState } from 'react';
import { AutocompleteRequestType, GooglePlaceDetail, GooglePlacesAutocomplete, Query } from 'react-native-google-places-autocomplete';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { StyleSheet, View } from 'react-native';
import { LocationValue } from '../../screens/SellsRestaurants/SellsRestaurantsBag/LocationScreen';
import { NUMBER_0, NUMBER_2, NUMBER_3 } from '../../utils/globalConstants';
import { useTheme } from '../../hooks/styles/useTheme';
import { useResponsive } from '../../hooks/UI/useResponsive';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export interface inputGoogleValue {
    street: string;
    number: string;
    neighborhood: string;
    locality: string;
}

interface GooglePlacesInputInterface {
    locationValue?: inputGoogleValue;
    setLocaltionValue: React.Dispatch<React.SetStateAction<LocationValue>>;
    onFocus?: () => void;
    onBlur?: () => void;
};

const ROW_HEIGHT_LANDSCAPE = 36;
const ROW_HIGHT_PORTRAIT = 44;

const MAX_HEIGHT_LANDSCAPE = 200;
const MAX_HEIGHT_PORTRAIT = 300;

const InputGooglePlaces = ({ locationValue, setLocaltionValue, onFocus }: GooglePlacesInputInterface): JSX.Element => {

    const { theme, size } = useTheme();
    const [inputText, setInputText] = useState<string>();
    const { isLandscape } = useResponsive();

    const getAdressDirection = (details: GooglePlaceDetail | null): void => {
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
        }
    };

    const GooglePlacesAutocompleteQuery: Query<AutocompleteRequestType> = {
        key: 'AIzaSyBa9zQECn9TONlp60rcKUtscBAUj-lwpVU',
        language: 'es',
        components: 'country:mx',
    };

    const inputStyles = {
        container: {
            flex: 0,
            marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
            maxHeight: isLandscape ? MAX_HEIGHT_LANDSCAPE : MAX_HEIGHT_PORTRAIT
        },
        textInputContainer: {
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0
        },
        textInput: {
            height: 60,
            color: theme.text_color,
            fontSize: globalFont(size).font_normal,
            borderRadius: globalStyles().borderRadius.borderRadius,
            borderWidth: 0.2,
            borderColor: theme.color_border,
            margin: 0
        },
        listView: {
            backgroundColor: theme.background_color_secondary,
            borderWidth: 0.5,
            borderColor: theme.color_border,
            marginVertical: globalStyles().globalMarginBottom.marginBottom,
            borderRadius: globalStyles().borderRadius.borderRadius
        },
        row: {
            minHeigt: ROW_HEIGHT_LANDSCAPE,
            height: isLandscape ? ROW_HEIGHT_LANDSCAPE : ROW_HIGHT_PORTRAIT,
            borderBottomColor: theme.color_border_dark,
            borderBottomWidth: 0,
            backgroundColor: theme.background_color_secondary,
            padding: isLandscape ? globalStyles().globalPadding.padding / NUMBER_3 : globalStyles().globalPadding.padding / NUMBER_2,
            margin: 0
        },
        description: {
            color: theme.text_color,
        }
    };

    const [startTpying, setStartTpying] = useState(false)

    const handleOnFocus = (): void => {
        onFocus?.()
        setStartTpying(true)
    }

    const valueInput = (inputText && inputText?.length > NUMBER_0 || startTpying) ? inputText :
        locationValue ? `${locationValue?.street} ${locationValue?.number ? `- ${locationValue?.number}` : ''} ${locationValue?.neighborhood ? `/ ${locationValue.neighborhood}` : ''} ${locationValue?.locality ? `/ ${locationValue.locality}` : ''}` : ''

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                textInputProps={{
                    onFocus: handleOnFocus,
                    value: valueInput,
                    style: {
                        backgroundColor: 'white', // tu color de fondo
                        height: size("5%"),
                        borderRadius: globalStyles().borderRadius.borderRadius,
                        paddingHorizontal: globalStyles().globalPadding.padding,
                        fontSize: globalFont().font_normal,
                        width: "100%",
                        color: theme.text_color
                    }
                }}
                placeholder="Buscar dirección"
                onPress={(_, details = null) => {
                    getAdressDirection(details);
                }}
                fetchDetails={true}
                query={GooglePlacesAutocompleteQuery}
                debounce={400}
                enablePoweredByContainer={false}
                styles={inputStyles}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "transparent",
        borderWidth: 0,
        margin: 0,
        padding: 0,
        maxHeight: heightPercentageToDP('60%')
    }
});


export default InputGooglePlaces;