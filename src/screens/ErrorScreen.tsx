import React, { JSX } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ErrorScreenStyles } from '../theme/ErrorScreenTheme';
import { globalStyles } from '../theme/appTheme';
import ButtonCustum from '../components/Inputs/ButtonCustum';


interface ErroScreenInterface {
    onRetry: () => void;
    title: string;
}

export const ErroScreen = ({
    onRetry,
    title
}: ErroScreenInterface): JSX.Element => {

    const { theme } = useTheme();

    return (
        <SafeAreaView>
            <View style={[ErrorScreenStyles(theme).SuccesMessage]}>
                <View style={ErrorScreenStyles(theme).content}>
                    <Text style={ErrorScreenStyles(theme).title}>
                        {title}
                    </Text>
                    <Text style={ErrorScreenStyles(theme).text}>
                        Intentatalo de nuevo.
                    </Text>
                    <ButtonCustum
                        title={'Reintentar'}
                        onPress={onRetry}
                        disabled={false}
                        loading={false}
                        extraStyles={{ marginBottom: globalStyles().globalMarginBottomSmall.marginBottom }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
