import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import CardSelect from '../../../components/Cards/CardSelect';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { globalStyles } from '../../../theme/appTheme';

const MEHTOD_PARA_COMER = 1;
const MEHTOD_PARA_LLEVAR = 2;
const MEHTOD_A_DOMICILIO = 3;
const MEHTOD_CLIENTE_RECOGE = 4;

export interface shimpentMethodInterface {
    id: typeof MEHTOD_PARA_COMER | typeof MEHTOD_PARA_LLEVAR | typeof MEHTOD_A_DOMICILIO | typeof MEHTOD_CLIENTE_RECOGE;
    value: string
};


export const shimpentMethod: shimpentMethodInterface[] = [
    { id: 1, value: "Para comer" },
    { id: 2, value: "Para llevar" },
    { id: 3, value: "A domicilio" },
    { id: 4, value: "Cliente recoge" }
];

const ShimpentScreen = (): React.ReactElement => {

    const [methodShipment, setMethodShipment] = useState<shimpentMethodInterface['id']>(MEHTOD_PARA_COMER)
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();

    const goBackToConfirmation = () : void => {
        goBack()
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
                            extraStyles={extraStyles.card}
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

const extraStyles = StyleSheet.create({
    card: {
        marginBottom: globalStyles().ItemSeparator.height
    }
})