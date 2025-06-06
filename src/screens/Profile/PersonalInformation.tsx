import React, { JSX, useContext } from 'react';
import { SafeAreaView, View } from 'react-native';

import { AuthContext } from '../../context/auth/AuthContext';
import { PersonalInformationStyles } from '../../theme/Screens/Profile/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../../components/UI/CustumText';

const FIRST_LETTER_INDEX = 0;
const FIRST_LETTER_END_INDEX = 1;

export const PersonalInformation = () : JSX.Element=> {
    const { user } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();

    return (
        <SafeAreaView style={PersonalInformationStyles(theme).PersonalInformation} >
            <View style={PersonalInformationStyles(theme).PersonalInformation_content}>
                <View style={PersonalInformationStyles(theme).profile}>
                    <View style={PersonalInformationStyles(theme).circle}>
                        <View style={PersonalInformationStyles(theme).circleContent}>
                            <CustomText style={PersonalInformationStyles(theme).circleText}>
                                {user?.usr?.slice(FIRST_LETTER_INDEX, FIRST_LETTER_END_INDEX)}
                            </CustomText>
                        </View>
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

                    <View style={PersonalInformationStyles(theme).data}>
                        <CustomText style={PersonalInformationStyles(theme).label}>Servidor:</CustomText>
                        <CustomText style={{ color: theme.text_color }}>{user?.svr}</CustomText>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>

                    <View style={PersonalInformationStyles(theme).data}>
                        <CustomText style={PersonalInformationStyles(theme).label}>Base de datos:</CustomText>
                        <CustomText style={{ color: theme.text_color }}>{user?.dba}</CustomText>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
