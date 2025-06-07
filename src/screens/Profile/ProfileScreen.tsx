import React, { JSX, useContext, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import { AuthContext } from '../../context/auth/AuthContext';
import { ProfileScreenStyles } from '../../theme/Screens/Profile/ProfileScreenTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import CustomText from '../../components/UI/CustumText';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import { ProfileNavigationProp } from '../../interface/navigation';
import ModalDecision from '../../components/Modals/ModalDecision';
import { globalStyles } from '../../theme/appTheme';
import useErrorHandler from '../../hooks/useErrorHandler';
import DotLoader from '../../components/UI/DotLaoder';
import { useTheme } from '../../hooks/styles/useTheme';


export const ProfileScreen = (): JSX.Element => {

    const { logOut } = useContext(AuthContext);
    const { clearBagStateOnLogout } = useContext(SellsBagContext);
    const { handleCleanState: handleCleanStateInventory } = useContext(InventoryBagContext);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [logingOut, setlogingOut] = useState(false)

    const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

    const { theme, size  } = useTheme();
    const { navigate } = useNavigation<ProfileNavigationProp>();
    const { handleError } = useErrorHandler()


    const handleLogOut = async (): Promise<void> => {
        try {
            setlogingOut(true)
            await logOut()
            clearBagStateOnLogout()
            handleCleanStateInventory()
        } catch (error) {
            handleError(error);
        } finally {
            setlogingOut(false)
        }
    };

    return (
        <>
            <SafeAreaView style={ProfileScreenStyles(theme, size ).ProfileScreen} >
                <View style={ProfileScreenStyles(theme, size ).ProfileScreen_content}>
                    <CustomText style={ProfileScreenStyles(theme, size ).title}>Configuación</CustomText>

                    <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - personalInformationScreen')} style={ProfileScreenStyles(theme, size ).section}>
                        <CustomText style={{ color: theme.text_color }}>Información Personal</CustomText>
                        <Icon name="person-outline" size={22} color={"black"} />
                    </TouchableOpacity>

                    <View style={ProfileScreenStyles(theme, size ).divider}></View>


                    <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - settingsSceen')} style={[ProfileScreenStyles(theme, size ).section]}>
                        <CustomText style={{ color: theme.text_color }}>Configuración General</CustomText>
                        <Icon name="settings-outline" size={22} color={"black"} />
                    </TouchableOpacity>

                    <View style={ProfileScreenStyles(theme, size ).divider}></View>

                    <CustomText style={ProfileScreenStyles(theme, size ).title}>Legal</CustomText>

                    <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - privacyScreen')} style={[ProfileScreenStyles(theme, size ).section]}>
                        <CustomText style={{ color: theme.text_color }}>Aviso de privacidad</CustomText>
                        <Icon name="book-outline" size={22} color={"black"} />
                    </TouchableOpacity>

                    <View style={ProfileScreenStyles(theme, size ).divider}></View>

                    <View style={ProfileScreenStyles(theme, size ).closeSession}>
                        <ButtonCustum
                            title="Cerrar sesión"
                            onPress={() => setOpenModalDecision(true)}
                        />
                    </View>

                    <View>
                        <CustomText style={{ color: theme.text_color }}>Version: {version}</CustomText>
                    </View>

                </View>
            </SafeAreaView>

            <ModalDecision
                visible={openModalDecision}
                message="Seguro de cerrar sesión?"
            >
                {
                    logingOut ?
                        <DotLoader />
                        :
                        <>
                            <ButtonCustum
                                title="Cerrar sesión"
                                onPress={handleLogOut}
                                extraStyles={{ ...globalStyles().globalMarginBottomSmall }}
                                disabled={logingOut}
                            />
                            <ButtonCustum
                                title="Cancelar"
                                onPress={() => setOpenModalDecision(false)}
                                buttonColor="white"
                                disabled={logingOut}
                            />
                        </>
                }
            </ModalDecision>
        </>
    )
}