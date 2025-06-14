import React, { JSX, useContext } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { AuthContext } from '../../context/auth/AuthContext';
import { PersonalInformationStyles } from '../../theme/Screens/Profile/PersonalInformationTheme';
import CustomText from '../../components/UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';

const FIRST_LETTER_INDEX = 0;
const FIRST_LETTER_END_INDEX = 1;

export const PersonalInformation = (): JSX.Element => {
    const { user } = useContext(AuthContext);
    const { theme, typeTheme, size } = useTheme();

    return (
        <SafeAreaView style={PersonalInformationStyles({ theme, size }).PersonalInformation} >
            <ScrollView>
                <View style={PersonalInformationStyles({ theme, size }).PersonalInformation_content}>
                    <View style={PersonalInformationStyles({ theme, size }).profile}>
                        <View style={PersonalInformationStyles({ theme, size }).circle}>
                            <View style={PersonalInformationStyles({ theme, size }).circleContent}>
                                <CustomText style={PersonalInformationStyles({ theme, size }).circleText}>
                                    {user?.usr?.slice(FIRST_LETTER_INDEX, FIRST_LETTER_END_INDEX)}
                                </CustomText>
                            </View>
                        </View>

                    </View>

                    <View style={PersonalInformationStyles({ theme, typeTheme, size }).information}>
                        <View style={PersonalInformationStyles({ theme, size }).data}>
                            <CustomText style={PersonalInformationStyles({ theme, size }).label}>Empresa:</CustomText>
                            <CustomText style={{ color: theme.text_color }}>{user?.empresa}</CustomText>
                            <View style={PersonalInformationStyles({ theme, size }).separator} />
                        </View>

                        <View style={PersonalInformationStyles({ theme, size }).data}>
                            <CustomText style={PersonalInformationStyles({ theme, size }).label}>Razón Social:</CustomText>
                            <CustomText style={{ color: theme.text_color }}>{user?.razonsocial}</CustomText>
                            <View style={PersonalInformationStyles({ theme, size }).separator} />
                        </View>

                        {(user?.usr) && (
                            <View style={PersonalInformationStyles({ theme, size }).data}>
                                <CustomText style={PersonalInformationStyles({ theme, size }).label}>Usuario:</CustomText>
                                <CustomText style={{ color: theme.text_color }}>{user?.usr}</CustomText>
                                <View style={PersonalInformationStyles({ theme, size }).separator} />
                            </View>
                        )}

                        <View style={PersonalInformationStyles({ theme, size }).data}>
                            <CustomText style={PersonalInformationStyles({ theme, size }).label}>Servidor:</CustomText>
                            <CustomText style={{ color: theme.text_color }}>{user?.svr}</CustomText>
                            <View style={PersonalInformationStyles({ theme, size }).separator} />
                        </View>

                        <View style={PersonalInformationStyles({ theme, size }).data}>
                            <CustomText style={PersonalInformationStyles({ theme, size }).label}>Base de datos:</CustomText>
                            <CustomText style={{ color: theme.text_color }}>{user?.dba}</CustomText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
