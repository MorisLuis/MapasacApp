import React, { JSX } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ErrorScreenStyles } from '../theme/ErrorScreenTheme';
import { globalStyles } from '../theme/appTheme';
import ButtonCustum from '../components/Inputs/ButtonCustum';
import { useTheme } from '../hooks/styles/useTheme';


interface ErroScreenInterface {
    onRetry: () => void;
    title: string;
}

export const ErroScreen = ({
    onRetry,
    title
}: ErroScreenInterface): JSX.Element => {

    const { theme, size } = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={[ErrorScreenStyles(theme, size).SuccesMessage]}>
                <View style={ErrorScreenStyles(theme, size).content}>
                    <Text style={ErrorScreenStyles(theme, size).title}>
                        {title}
                    </Text>
                    <Text style={ErrorScreenStyles(theme, size).text}>
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
