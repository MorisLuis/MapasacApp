import React, { useContext, useState } from 'react'

import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileScreenStyles } from '../../theme/Screens/Profile/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import DeviceInfo from 'react-native-device-info';
//import { SellsBagContext } from '../../context/Sells/SellsBagContext';
//import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import CustomText from '../../components/UI/CustumText';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import { ProfileNavigationProp } from '../../interface/navigation';
//import ModalDecision from '../../components/Modals/ModalDecision';
import useErrorHandler from '../../hooks/useErrorHandler';


// pending

export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    //const { handleCleanState } = useContext(SellsBagContext);
    //const { handleCleanState: handleCleanStateInventory } = useContext(InventoryBagContext);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [logingOut, setlogingOut] = useState(false)

    const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<ProfileNavigationProp>();
    const { handleError } = useErrorHandler()

    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleLogOut = async () => {
        try {
            setlogingOut(true)
            await logOut()
            //handleCleanState()
            //handleCleanStateInventory()
        } catch (error) {
            handleError(error);
        } finally {
            setlogingOut(false)
        }
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
                <View style={ProfileScreenStyles(theme, typeTheme).ProfileScreen}>
                    <CustomText style={ProfileScreenStyles(theme, typeTheme).title}>Configuación</CustomText>

                    <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - personalInformationScreen')} style={ProfileScreenStyles(theme, typeTheme).section}>
                        <CustomText style={{ color: theme.text_color }}>Información Personal</CustomText>
                        <Icon name="person-outline" size={22} color={iconColor} />
                    </TouchableOpacity>

                    <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>


                    <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - settingsSceen')} style={[ProfileScreenStyles(theme, typeTheme).section]}>
                        <CustomText style={{ color: theme.text_color }}>Configuración General</CustomText>
                        <Icon name="settings-outline" size={22} color={iconColor} />
                    </TouchableOpacity>

                    <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>

                    <CustomText style={ProfileScreenStyles(theme, typeTheme).title}>Legal</CustomText>

                    <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - privacyScreen')} style={[ProfileScreenStyles(theme, typeTheme).section]}>
                        <CustomText style={{ color: theme.text_color }}>Aviso de privacidad</CustomText>
                        <Icon name="book-outline" size={22} color={iconColor} />
                    </TouchableOpacity>

                    <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>

                    <View style={ProfileScreenStyles(theme, typeTheme).closeSession}>
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

            {/* <ModalDecision
                visible={openModalDecision}
                message="Seguro de cerrar sesión?"
            >
                <ButtonCustum
                    title="Cerrar sesión"
                    onPress={handleLogOut}
                    extraStyles={{ ...globalStyles(theme).globalMarginBottomSmall }}
                    disabled={logingOut}
                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={() => setOpenModalDecision(false)}
                    buttonColor="white"
                    disabled={logingOut}
                />
            </ModalDecision> */}
        </>
    )
}