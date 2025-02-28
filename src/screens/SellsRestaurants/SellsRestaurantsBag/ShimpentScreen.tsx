import { View } from 'react-native'
import React, { useState } from 'react'
import ModalScreen from '../../../components/Modals/ModalScreen';
import CardSelect from '../../../components/Cards/CardSelect';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface';
import { useNavigation } from '@react-navigation/native';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import ModalBottom from '../../../components/Modals/ModalBottom';

export interface shimpentMethodInterface {
    id: 1 | 2 | 3 | 4;
    value: string
};

export const shimpentMethod: shimpentMethodInterface[] = [
    { id: 1, value: "Para comer" },
    { id: 2, value: "Para llevar" },
    { id: 3, value: "A domicilio" },
    { id: 4, value: "Cliente recoge" }
];

const ShimpentScreen = () => {

    const [methodShipment, setMethodShipment] = useState<shimpentMethodInterface['id']>(1)
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();

    const goBackToConfirmation = () => {
        navigate('[SellsRestaurants] - ConfirmationScreen', { methodShipment: methodShipment })
    }

    return (
        <ModalBottom
            visible={true}
            onClose={() => goBack()}
        >
            <View>
                {
                    shimpentMethod.map((item: shimpentMethodInterface) => (
                        <CardSelect
                            key={item.id}
                            onPress={() => setMethodShipment(item.id)}
                            message={item.value}
                            sameValue={item.id === methodShipment}
                        />
                    ))
                }

                <ButtonCustum
                    onPress={goBackToConfirmation}
                    title="Seleccionar ubicación"
                />
            </View>

        </ModalBottom>
    )
}

export default ShimpentScreen