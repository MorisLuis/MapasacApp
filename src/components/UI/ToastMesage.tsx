import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

import { globalFont } from '../../theme/appTheme';
import CustomText from './CustumText';

const FONT_SIZE = 15;

const toastConfig = {
    success: (props: BaseToastProps): JSX.Element => (
        <BaseToast
            {...props}
            style={styles.BaseToast_style}
            contentContainerStyle={styles.BaseToast_container}
            text1Style={styles.BaseToast_text}
        />
    ),
    error: (props: BaseToastProps): JSX.Element => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: FONT_SIZE
            }}
            text2Style={{
                fontSize: FONT_SIZE
            }}
        />
    ),

    tomatoToast: ({ text1 }: BaseToastProps): JSX.Element => (
        <View style={styles.ToastMessage}>
            <Icon name="checkmark-circle" size={24} color="yellowgreen" style={styles.icon} />
            <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.message}>
                {text1}
            </CustomText>
        </View>
    ),

    tomatoError: ({ text1 }: BaseToastProps): JSX.Element => (
        <View style={styles.ToastMessage}>
            <Icon name="close-circle" size={24} color="red" style={styles.icon} />
            <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.message}>
                {text1}
            </CustomText>
        </View>
    )
};


export const ShowToastMessage = (): JSX.Element => {
    return <Toast config={toastConfig} />
}

const styles = StyleSheet.create({
    ToastMessage: {
        display: "flex",
        minHeight: 50,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        maxWidth: "90%",
    },
    icon: {
        marginRight: 10,
    },
    message: {
        fontSize: globalFont.font_normal,
        flexShrink: 1,
        marginRight: 10,
    },
    BaseToast_style: {
        borderLeftColor: 'pink'
    },
    BaseToast_container: {
        paddingHorizontal: 15
    },
    BaseToast_text: {
        fontSize: FONT_SIZE,
        fontWeight: '400'
    }
});
