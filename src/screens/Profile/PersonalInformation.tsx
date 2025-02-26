import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { PersonalInformationStyles } from '../../theme/Screens/Profile/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../../components/UI/CustumText';


export const PersonalInformation = () => {
    const { user } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
            <View style={PersonalInformationStyles(theme).PersonalInformation}>
                <View style={PersonalInformationStyles(theme).profile}>
                    <View style={PersonalInformationStyles(theme).circle}>
                        <View style={PersonalInformationStyles(theme).circleContent}>
                            <CustomText style={PersonalInformationStyles(theme).circleText}>
                                {user?.usr?.slice(0, 1)}
                            </CustomText>
                        </View>
                    </View>

                    <View>
                        <CustomText style={PersonalInformationStyles(theme).name}>{user?.nombres}</CustomText>
                    </View>
                </View>

                <View style={PersonalInformationStyles(theme, typeTheme).information}>
                    <View style={PersonalInformationStyles(theme).data}>
                        <CustomText style={PersonalInformationStyles(theme).label}>Empresa:</CustomText>
                        <CustomText style={{ color: theme.text_color }}>{user?.empresa}</CustomText>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>

                    <View style={PersonalInformationStyles(theme).data}>
                        <CustomText style={PersonalInformationStyles(theme).label}>Razón Social:</CustomText>
                        <CustomText style={{ color: theme.text_color }}>{user?.razonsocial}</CustomText>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>

                    {(user?.usr) && (
                        <View style={PersonalInformationStyles(theme).data}>
                            <CustomText style={PersonalInformationStyles(theme).label}>Usuario:</CustomText>
                            <CustomText style={{ color: theme.text_color }}>{user?.usr}</CustomText>
                            <View style={PersonalInformationStyles(theme).separator} />
                        </View>
                    )}

                    {(user?.idsucursal) && (
                        <View style={PersonalInformationStyles(theme).data}>
                            <CustomText style={PersonalInformationStyles(theme).label}>Sucursal:</CustomText>
                            <CustomText style={{ color: theme.text_color }}>{user?.idsucursal}</CustomText>
                            <View style={PersonalInformationStyles(theme).separator} />
                        </View>
                    )}

                    <View style={PersonalInformationStyles(theme).data}>
                        <CustomText style={PersonalInformationStyles(theme).label}>Servidor:</CustomText>
                        <CustomText style={{ color: theme.text_color }}>{user?.svr}</CustomText>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>

                    <View style={PersonalInformationStyles(theme).data}>
                        <CustomText style={PersonalInformationStyles(theme).label}>Base de datos:</CustomText>
                        <CustomText style={{ color: theme.text_color }}>{user?.usrdba}</CustomText>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
