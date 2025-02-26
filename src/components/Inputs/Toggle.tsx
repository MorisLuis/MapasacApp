import React, { useState } from 'react';
import { View, Switch, Platform, ViewStyle, StyleProp } from 'react-native';
import { toggleStyles } from '../../theme/Components/inputs';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../UI/CustumText';

interface ToggleInterface {
    label: string;
    message: string;
    extraStyles: StyleProp<ViewStyle>;
    value?: boolean;
    onChange: (newValue: boolean) => void;
}

const Toggle = ({
    label,
    message,
    extraStyles,
    value,
    onChange
}: ToggleInterface) => {

    const { theme, typeTheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(value ? value : false);
    const iconColor = typeTheme === 'dark' ? "white" : "black"


    const toggleSwitch = () => {
        onChange(!isEnabled)
        setIsEnabled(previousState => !isEnabled);
    };

    return (
        <View style={[toggleStyles(theme, typeTheme).Toggle, extraStyles]}>
            <View style={toggleStyles(theme, typeTheme).toggleText}>
                <CustomText style={toggleStyles(theme, typeTheme).togglelabel}>{label}</CustomText>
                <CustomText style={toggleStyles(theme, typeTheme).togglemessage}>{message}</CustomText>
            </View>

            <View
                style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center"
                }}
            >
                {
                    isEnabled &&
                    <Icon
                        name="checkmark-outline"
                        size={18}
                        color={iconColor}

                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            left: isEnabled ? "52.5%" : "12.5%"
                        }}
                    />
                }
                <Switch
                    trackColor={{ false: toggleStyles(theme, typeTheme).SwitchTrackColorFalse.backgroundColor, true: toggleStyles(theme, typeTheme).SwitchTrackColorTrue.backgroundColor }}
                    thumbColor={
                        Platform.OS === 'android' && isEnabled ? toggleStyles(theme, typeTheme).SwitchThumbColorAndroidEnabled.backgroundColor :
                            Platform.OS === 'android' && !isEnabled ? toggleStyles(theme, typeTheme).SwitchThumbColorAndroidNotEnabled.backgroundColor :
                                Platform.OS === 'ios' && isEnabled ? toggleStyles(theme, typeTheme).SwitchThumbColorIOSdEnabled.backgroundColor : toggleStyles(theme, typeTheme).SwitchThumbColorIOSdNotEnabled.backgroundColor
                    }
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

export default Toggle;