import React, { JSX } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

import { useTheme } from '../../context/ThemeContext';
import { PrivacyScreenStyles } from '../../theme/Screens/Profile/PrivacyScreenTheme';
import CustomText from '../../components/UI/CustumText';


export const PrivacyScreen = () : JSX.Element => {

    const { theme } = useTheme();

    return (
        <SafeAreaView style={PrivacyScreenStyles(theme).PrivacyScreen} >
            <ScrollView style={PrivacyScreenStyles(theme).PrivacyScreen_content}>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    Tu privacidad es importante para nosotros. Es nuestra política respetar su
                    privacidad con respecto a cualquier información que podamos recopilar mientras
                    opera nuestra aplicación móvil. Solicitamos ciertos permisos al usar nuestra
                    aplicación para brindarle la mejor experiencia posible. No compartiremos su
                    información con terceros, excepto en los casos expresamente descritos en esta
                    Política de Privacidad.
                    Recopilación y uso de información
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).subtitle}>Recopilación y uso de información</CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    • Información de perfil de M&MITSystems: Recopilamos información relacionada con su
                    perfil o perfiles de M&MITSystems (como por ejemplo Id Usuario y contraseña).
                    Utilizamos esta información para el acceso a tu base de datos localizada en
                    la nube de Microsoft Azure.
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    • No compartimos su información con terceros, excepto con Microsoft Azure
                    quien es nuestro proveedor de servicios que nos asisten en la operación de
                    la aplicación.
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).subtitle}>Cookies</CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    • Utilizamos cookies para operar y proporcionar nuestros servicios, por
                    ejemplo, usamos cookies para recordar el usuario y contraseña de M&MITSystems, a fin
                    de proporcionarte una experiencia más eficaz, segura y rápida.
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).subtitle}>Seguridad</CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    • Nos comprometemos a proteger la seguridad de su información personal.
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).subtitle}>Cambios en la política de privacidad</CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    • Nos reservamos el derecho de actualizar nuestra Política de Privacidad
                    periódicamente.
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    • Se le notificará sobre los cambios en la política de privacidad en la
                    aplicación o a través de otros medios.
                </CustomText>
                <CustomText style={PrivacyScreenStyles(theme).paragraph}>
                    Al utilizar nuestra aplicación, acepta los términos de nuestra Política de Privacidad.
                    Si tiene alguna pregunta o inquietud sobre nuestra Política de Privacidad, contacta
                    al Soporte M&MITSystems.
                </CustomText>
            </ScrollView>
        </SafeAreaView>
    )
}