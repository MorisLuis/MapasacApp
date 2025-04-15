import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface';
import { TextInputContainer } from '../../../components/Inputs/TextInputContainer';

type LocationScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - EditLocation'>;

interface LocationScreenInterface {
    route: LocationScreenRouteProp;
}

export interface LocationValue {
    street: string;
    number: string;
    neighborhood: string;
    locality: string;
}

const NAVIGATION_VIEW = {
    SELECT: 1,
    FORM: 2,
} as const;

export const LocationScreen = ({ route }: LocationScreenInterface): JSX.Element => {
    const { locationValue } = route.params;
    const { navigate, goBack } =
        useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();

    const [locationValueLocal, setLocationValueLocal] = useState<LocationValue>();
    const [locationNavigation, setLocationNavigation] = useState<typeof NAVIGATION_VIEW.SELECT | typeof NAVIGATION_VIEW.FORM>(
        NAVIGATION_VIEW.SELECT
    );

    const onSubmitLocation = (): void => {
        navigate('[SellsRestaurants] - ConfirmationScreen', {
            addressDirection: locationValueLocal,
        });
    };

    useEffect(() => {
        if (locationValue) setLocationValueLocal(locationValue);
    }, [locationValue]);

    const renderInputLocation = (): JSX.Element => {
        return (
            <>
                <ButtonCustum
                    onPress={onSubmitLocation}
                    title="Seleccionar ubicación"
                    extraStyles={styles.marginTop10}
                />
            </>
        );
    };

    const renderForm = (): JSX.Element => {
        return (
            <View>
                <LocationTextInput
                    label="Estado"
                    field="locality"
                    locationValueLocal={locationValueLocal}
                    setLocationValueLocal={setLocationValueLocal}
                />
                <LocationTextInput
                    label="Colonia"
                    field="neighborhood"
                    locationValueLocal={locationValueLocal}
                    setLocationValueLocal={setLocationValueLocal}
                />
                <LocationTextInput
                    label="No. Domicilio"
                    field="number"
                    locationValueLocal={locationValueLocal}
                    setLocationValueLocal={setLocationValueLocal}
                />
                <LocationTextInput
                    label="Calle"
                    field="street"
                    locationValueLocal={locationValueLocal}
                    setLocationValueLocal={setLocationValueLocal}
                />

                <ButtonCustum
                    onPress={() => setLocationNavigation(NAVIGATION_VIEW.SELECT)}
                    title="Regresar"
                    extraStyles={styles.marginTop10}
                    buttonColor="white"
                    iconName="arrow-back"
                />
            </View>
        );
    };

    return (
        <ModalBottom visible={true} onClose={() => goBack()}>
            {locationNavigation === NAVIGATION_VIEW.SELECT
                ? renderInputLocation()
                : renderForm()}
        </ModalBottom>
    );
};

interface LocationTextInputProps {
    label: string;
    field: keyof LocationValue;
    locationValueLocal?: LocationValue;
    setLocationValueLocal: React.Dispatch<React.SetStateAction<LocationValue | undefined>>;
}

const LocationTextInput = ({
    label,
    field,
    locationValueLocal,
    setLocationValueLocal,
}: LocationTextInputProps): JSX.Element => (
    <TextInputContainer
        setComments={(value) =>
            setLocationValueLocal((prev) => ({
                street: prev?.street || '',
                number: prev?.number || '',
                neighborhood: prev?.neighborhood || '',
                locality: prev?.locality || '',
                [field]: value,
            }))
        }
        value={locationValueLocal?.[field]}
        styles={styles.marginBottom20}
        label={label}
    />
);

const styles = StyleSheet.create({
    marginTop10: {
        marginTop: 10,
    },
    marginBottom20: {
        marginBottom: 20,
    },
});
