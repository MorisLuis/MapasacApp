import React, { JSX, useState } from 'react';
import { View, Switch, Platform, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { toggleStyles } from '../../theme/Components/inputs';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../hooks/styles/useTheme';

interface ToggleInterface {
    label: string;
    message: string;
    extraStyles: StyleProp<ViewStyle>;
    value?: boolean;
    onChange: (_newValue: boolean) => void;
}

const Toggle = ({
    label,
    message,
    extraStyles,
    value,
    onChange
}: ToggleInterface): JSX.Element => {

    const { theme, typeTheme, size } = useTheme();
    const [isEnabled, setIsEnabled] = useState(value ? value : false);
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const toggleSwitch = (): void => {
        onChange(!isEnabled)
        setIsEnabled(() => !isEnabled);
    };

    return (
        <View style={[toggleStyles({ theme, typeTheme, size }).Toggle, extraStyles]}>
            <View>
                <CustomText style={toggleStyles({ theme, typeTheme, size }).togglelabel}>{label}</CustomText>
                <CustomText style={toggleStyles({ theme, typeTheme, size }).togglemessage}>{message}</CustomText>
            </View>

            <View style={toggleStyles({ theme, typeTheme, size }).toggleContainer}>
                {
                    (isEnabled && Platform.OS === 'ios') &&
                    <Icon
                        name="checkmark-outline"
                        size={18}
                        color={iconColor}
                        style={toggleStyles({ theme, typeTheme, isEnabled, size }).togglemessage}
                    />
                }
                <Switch
                    trackColor={{ false: toggleStyles({ theme, typeTheme, size }).SwitchTrackColorFalse.backgroundColor, true: toggleStyles({ theme, typeTheme, size }).SwitchTrackColorTrue.backgroundColor }}
                    thumbColor={
                        Platform.OS === 'android' && isEnabled ? toggleStyles({ theme, typeTheme, size }).SwitchThumbColorAndroidEnabled.backgroundColor :
                            Platform.OS === 'android' && !isEnabled ? toggleStyles({ theme, typeTheme, size }).SwitchThumbColorAndroidNotEnabled.backgroundColor :
                                Platform.OS === 'ios' && isEnabled ? toggleStyles({ theme, typeTheme, size }).SwitchThumbColorIOSdEnabled.backgroundColor :
                                    toggleStyles({ theme, typeTheme, size }).SwitchThumbColorIOSdNotEnabled.backgroundColor
                    }
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

export default Toggle;