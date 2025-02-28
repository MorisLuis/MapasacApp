import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import CustomText from '../../../components/UI/CustumText';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../../theme/appTheme';
import { LocationScreenStyles } from '../../../theme/Screens/Sells/LocationScreenTheme';
import { TextInputContainer } from '../../../components/Inputs/TextInputContainer';

type LocationScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - EditLocation'>;

interface LocationScreenInterface {
    route: LocationScreenRouteProp
};

export const LocationScreen = ({ route }: LocationScreenInterface) => {

    const { locationValue } = route.params;
    const { theme } = useTheme();
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const [showData, setShowData] = useState(false);
    const [locationValueLocal, setLocationValueLocal] = useState();
    const [locationNavigation, setLocationNavigation] = useState<1 | 2>(1)

    const onSubmitLocation = () => {
        navigate('[SellsRestaurants] - ConfirmationScreen', { addressDirection: locationValueLocal })
    };

    const handleFocus = () => {
        setShowData(false);
    };

    const handleBlur = () => {
        if (locationValueLocal) setShowData(true);
    };

    useEffect(() => {
        if (locationValue) setLocationValueLocal(locationValue)
    }, [locationValue]);


    const renderInputLocation = () => {
        return (
            <>
                {/* {locationValueLocal && (
                    <TouchableOpacity
                        style={LocationScreenStyles(theme).LocationScreenContent}
                        onPress={() => setLocationNavigation(2)}
                    >
                        <View>
                            <CustomText>Calle: {locationValueLocal?.street}</CustomText>
                            <CustomText>No. Calle: {locationValueLocal?.number}</CustomText>
                            <CustomText>Colonia: {locationValueLocal?.neighborhood}</CustomText>
                            <CustomText>Estado: {locationValueLocal?.locality}</CustomText>
                        </View>
                        <View>
                            <Icon name='create' color={theme.text_color} size={globalFont.font_normal} />
                        </View>
                    </TouchableOpacity>
                )} */}

                <ButtonCustum
                    onPress={onSubmitLocation}
                    title="Seleccionar ubicación"
                    extraStyles={{ marginTop: 10 }}
                />
            </>
        )
    }

    const renderForm = () => {
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
                    onPress={() => setLocationNavigation(1)}
                    title="Regresar"
                    extraStyles={{ marginTop: 10 }}
                    buttonColor='white'
                    iconName='arrow-back'
                />
            </View>
        );
    };


    return (
        <ModalBottom
            visible={true}
            onClose={() => goBack()}
        >
            {
                locationNavigation === 1 ? renderInputLocation() : renderForm()
            }


        </ModalBottom>
    );
};

const LocationTextInput = ({
    label,
    field,
    locationValueLocal,
    setLocationValueLocal,
}: {
    label: string;
    field: keyof any;
    locationValueLocal: any | undefined;
    setLocationValueLocal: React.Dispatch<React.SetStateAction<any | undefined>>;
}) => (

    <TextInputContainer
        setComments={(value) => setLocationValueLocal((prev: any) => ({
            ...prev,
            street: prev?.street || '',
            number: prev?.number || '',
            neighborhood: prev?.neighborhood || '',
            locality: prev?.locality || '',
            [field]: value
        }))}
        value={locationValueLocal?.[field]}
        styles={{ marginBottom: 20 }}
        label={label}
    />
);
