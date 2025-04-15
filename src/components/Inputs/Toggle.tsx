import React, { JSX, useState } from 'react';
import { View, Switch, Platform, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { toggleStyles } from '../../theme/Components/inputs';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../UI/CustumText';

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

    const { theme, typeTheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(value ? value : false);
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const toggleSwitch = (): void => {
        onChange(!isEnabled)
        setIsEnabled(() => !isEnabled);
    };

    return (
        <View style={[toggleStyles(theme, typeTheme).Toggle, extraStyles]}>
            <View>
                <CustomText style={toggleStyles(theme, typeTheme).togglelabel}>{label}</CustomText>
                <CustomText style={toggleStyles(theme, typeTheme).togglemessage}>{message}</CustomText>
            </View>

            <View style={toggleStyles(theme, typeTheme).toggleContainer}>
                {
                    (isEnabled && Platform.OS === 'ios') &&
                    <Icon
                        name="checkmark-outline"
                        size={18}
                        color={iconColor}
                        style={toggleStyles(theme, typeTheme, isEnabled).togglemessage}
                    />
                }
                <Switch
                    trackColor={{ false: toggleStyles(theme, typeTheme).SwitchTrackColorFalse.backgroundColor, true: toggleStyles(theme, typeTheme).SwitchTrackColorTrue.backgroundColor }}
                    thumbColor={
                        Platform.OS === 'android' && isEnabled ? toggleStyles(theme, typeTheme).SwitchThumbColorAndroidEnabled.backgroundColor :
                            Platform.OS === 'android' && !isEnabled ? toggleStyles(theme, typeTheme).SwitchThumbColorAndroidNotEnabled.backgroundColor :
                                Platform.OS === 'ios' && isEnabled ? toggleStyles(theme, typeTheme).SwitchThumbColorIOSdEnabled.backgroundColor :
                                    toggleStyles(theme, typeTheme).SwitchThumbColorIOSdNotEnabled.backgroundColor
                    }
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

export default Toggle;