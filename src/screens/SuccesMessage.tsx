import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { useTheme } from '../context/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';
import CustomText from '../components/UI/CustumText';
import { globalFont } from '../theme/appTheme';
import FooterScreen from '../components/Navigation/FooterScreen';
import { format } from '../utils/currency';
import moment from 'moment-timezone';
import useActionsForModules from '../hooks/useActionsForModules';
import useDataForModule from '../hooks/useDataForModule';
import { AppNavigationProp } from '../interface/navigation';

type SuccesMessageScreenRouteProp = RouteProp<AppNavigationStackParamList, 'succesMessageScreen'>;

interface SuccesMessageProps {
    route: SuccesMessageScreenRouteProp;
}

export const SuccesMessage = ({ route }: SuccesMessageProps) => {
    
    const { redirection, numberOfProducts, importe, folio } = route.params ?? {};
    const navigation = useNavigation<AppNavigationProp>();
    const { theme, typeTheme  } = useTheme();
    const { handleColorWithModule } = useActionsForModules();
    const { movementInfo } = useDataForModule()

    const handleContinue = () => {
        navigation.push(redirection);
    };

    const date = new Date();
    const formattedDate = moment(date)
        .tz('America/Mexico_City')
        .format('LT, D MMMM YYYY'); // Formato: Hora (LT), día mes en letras año


    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SuccesMessageScreenStyles(theme).SuccesMessage}>
                <View style={SuccesMessageScreenStyles(theme).content}>
                    <Icon name="checkmark-done-outline" size={hp("10%")} color={handleColorWithModule.primary} />
                    <CustomText style={SuccesMessageScreenStyles(theme).headerText}>{movementInfo.title} con exito</CustomText>

                    <View style={[SuccesMessageScreenStyles(theme).dateContainer, { backgroundColor: handleColorWithModule.primary + "40" }]}>
                        <Icon name="calendar" size={globalFont.font_normal} color={handleColorWithModule.primary} />
                        <CustomText>SE REALIZO: {formattedDate.toUpperCase()}</CustomText>
                    </View>

                    <View style={SuccesMessageScreenStyles(theme).dataContainer}>
                        <View style={SuccesMessageScreenStyles(theme).dataContainerInterior}>
                            <View style={SuccesMessageScreenStyles(theme).dataHeader}>
                                <Icon name="stats-chart" size={globalFont.font_normal} color={handleColorWithModule.primary} />
                                <CustomText style={[SuccesMessageScreenStyles(theme).dataTitle, { color: handleColorWithModule.primary }]}>Resumen</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme).dataDivider}></View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Productos afectados: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>{numberOfProducts}</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>{movementInfo.text}</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Folio: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>{folio}</CustomText>
                            </View>

                            {
                                importe &&
                                <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                    <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Total importe: </CustomText>
                                    <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText, { color: handleColorWithModule.primary }]}>{format(importe)}</CustomText>
                                </View>
                            }
                        </View>
                    </View>
                </View>

                <FooterScreen
                    buttonDisabled={false}
                    buttonOnPress={handleContinue}
                    buttonTitle='Continuar'
                />
            </View>
        </SafeAreaView>
    );
};
