import React, { JSX } from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import moment from 'moment-timezone';

import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';
import CustomText from '../components/UI/CustumText';
import { globalFont } from '../theme/appTheme';
import FooterScreen from '../components/Navigation/FooterScreen';
import { format } from '../utils/currency';
import useActionsForModules from '../hooks/useActionsForModules';
import useDataForModule from '../hooks/useDataForModule';
import { AppNavigationProp } from '../interface/navigation';
import { useTheme } from '../hooks/styles/useTheme';

type SuccesMessageScreenRouteProp = RouteProp<AppNavigationStackParamList, 'succesMessageScreen'>;

interface SuccesMessageProps {
    route: SuccesMessageScreenRouteProp;
}

export const SuccesMessage = ({ route }: SuccesMessageProps): JSX.Element => {

    const { redirection, numberOfProducts, importe, folio } = route.params ?? {};
    const navigation = useNavigation<AppNavigationProp>();
    const { theme, typeTheme, size,  toggleTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules();
    const { movementInfo } = useDataForModule()

    const handleContinue = (): void => {
        navigation.push(redirection);
    };

    const date = new Date();
    const formattedDate = moment(date)
        .tz('America/Mexico_City')
        .format('LT, D MMMM YYYY'); // Formato: Hora (LT), día mes en letras año


    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={SuccesMessageScreenStyles({ theme, size }).SuccesMessage}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={SuccesMessageScreenStyles({ theme, size }).content}>

                        <Button onPress={toggleTheme} title="cambiar"/>
                        <Icon name="checkmark-done-outline" size={size("5%")} color={handleColorWithModule.primary} />
                        <CustomText style={SuccesMessageScreenStyles({ theme, size }).headerText}>{movementInfo.title + ' con éxito'}</CustomText>

                        <View style={[SuccesMessageScreenStyles({ theme, size }).dateContainer, { backgroundColor: handleColorWithModule.primary + "40" }]}>
                            <Icon name="calendar" size={globalFont(size).font_normal} color={handleColorWithModule.primary} />
                            <CustomText>{"SE REALIZO: " + formattedDate.toUpperCase()}</CustomText>
                        </View>

                        <View style={SuccesMessageScreenStyles({ theme, size }).dataContainer}>
                            <View style={SuccesMessageScreenStyles({ theme, size }).dataContainerInterior}>
                                <View style={SuccesMessageScreenStyles({ theme, size }).dataHeader}>
                                    <Icon name="stats-chart" size={globalFont(size).font_normal} color={handleColorWithModule.primary} />
                                    <CustomText style={[SuccesMessageScreenStyles({ theme, size }).dataTitle, { color: handleColorWithModule.primary }]}>{'Resumen'}</CustomText>
                                </View>

                                <View style={SuccesMessageScreenStyles({ theme, size }).dataDivider}></View>

                                <View style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                                    <CustomText style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Productos afectados: </CustomText>
                                    <CustomText style={[SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationText]}>{numberOfProducts}</CustomText>
                                </View>

                                <View style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                                    <CustomText style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                                    <CustomText style={[SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationText]}>{movementInfo.text}</CustomText>
                                </View>

                                <View style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                                    <CustomText style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Folio: </CustomText>
                                    <CustomText style={[SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationText]}>{folio}</CustomText>
                                </View>

                                {
                                    importe &&
                                    <View style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                                        <CustomText style={SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}>Total importe: </CustomText>
                                        <CustomText style={[SuccesMessageScreenStyles({ theme, typeTheme, size }).confirmationText, { color: handleColorWithModule.primary }]}>{format(importe)}</CustomText>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <FooterScreen
                    buttonDisabled={false}
                    buttonOnPress={handleContinue}
                    buttonTitle='Continuar'
                />
            </View>
        </SafeAreaView>
    );
};
