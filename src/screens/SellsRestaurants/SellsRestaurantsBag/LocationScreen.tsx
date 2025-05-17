import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface';
import { TextInputContainer } from '../../../components/Inputs/TextInputContainer';
import InputGooglePlaces from '../../../components/Inputs/InputGooglePlaces';

type LocationScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - EditLocation'>;

interface LocationScreenInterface {
    route: LocationScreenRouteProp;
}

export interface LocationValue {
    street: string;
    number: string;
    neighborhood: string;
    locality: string;
};

const INTIAL_LOCATION: LocationValue = {
    street: '',
    number: '',
    neighborhood: '',
    locality: ''
}

const NAVIGATION_VIEW = {
    SELECT: 1,
    FORM: 2,
} as const;

export const LocationScreen = ({ route }: LocationScreenInterface): JSX.Element => {

    const { locationValue, setConfirmationSellsRestaurantForm } = route.params;
    const { goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();

    const [locationValueLocal, setLocationValueLocal] = useState<LocationValue>(INTIAL_LOCATION);
    const [locationNavigation, setLocationNavigation] = useState<typeof NAVIGATION_VIEW.SELECT | typeof NAVIGATION_VIEW.FORM>(
        NAVIGATION_VIEW.SELECT
    );

    const isLocationEmpty = (location: typeof locationValueLocal) : boolean =>
        location.locality === '' &&
        location.neighborhood === '' &&
        location.number === '' &&
        location.street === '';

    const buttonPostLocationStatus = isLocationEmpty(locationValueLocal);

    const onSubmitLocation = (): void => {
        setConfirmationSellsRestaurantForm((prev) => ({ ...prev, locationValue: locationValueLocal }));
        goBack();
    };

    useEffect(() => {
        if (locationValue) setLocationValueLocal(locationValue);
    }, [locationValue]);

    const renderInputLocation = (): JSX.Element => {
        return (
            <>
                <InputGooglePlaces
                    setLocaltionValue={setLocationValueLocal}
                    locationValue={isLocationEmpty(locationValueLocal) ? undefined : locationValueLocal}
                />

                <ButtonCustum
                    onPress={onSubmitLocation}
                    title="Seleccionar ubicación"
                    extraStyles={styles.marginTop10}
                    disabled={buttonPostLocationStatus}
                />
            </>
        );
    };

    const renderForm = (): JSX.Element => {
        return (
            <View>

                <TextInputContainer
                    setComments={(value) =>
                        setLocationValueLocal((prev) => ({
                            ...prev,
                            locality: value || ''
                        }))
                    }
                    value={locationValueLocal.locality}
                    styles={styles.marginBottom20}
                    label={'Estado'}
                />

                <TextInputContainer
                    setComments={(value) =>
                        setLocationValueLocal((prev) => ({
                            ...prev,
                            neighborhood: value || ''
                        }))
                    }
                    value={locationValueLocal.neighborhood}
                    styles={styles.marginBottom20}
                    label={'Colonia'}
                />

                <TextInputContainer
                    setComments={(value) =>
                        setLocationValueLocal((prev) => ({
                            ...prev,
                            number: value || ''
                        }))
                    }
                    value={locationValueLocal.number}
                    styles={styles.marginBottom20}
                    label={'No. Domicilio'}
                />

                <TextInputContainer
                    setComments={(value) =>
                        setLocationValueLocal((prev) => ({
                            ...prev,
                            street: value || ''
                        }))
                    }
                    value={locationValueLocal.street}
                    styles={styles.marginBottom20}
                    label={'Calle'}
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

const styles = StyleSheet.create({
    marginTop10: {
        marginTop: 10,
    },
    marginBottom20: {
        marginBottom: 20,
    },
});
