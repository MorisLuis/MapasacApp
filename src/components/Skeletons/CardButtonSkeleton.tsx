import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../UI/CustumText';
import { useTheme } from '../../context/ThemeContext';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { globalFont, globalStyles } from '../../theme/appTheme';

const CardButtonSkeleton = () => {
    const { typeTheme, theme } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <View
            style={[
                SellsDataScreenTheme(theme, typeTheme).inputContainer,
                {
                    minHeight: globalFont.font_normal + globalStyles().globalPadding.padding * 2,
                    backgroundColor: theme.background_color,
                    display: 'flex',
                    flexDirection: 'row'
                }
            ]}

        >
            {/* LABEL */}
            <ShimmerPlaceholder
                style={[
                    {
                        width: '70%',
                        height: "100%",
                        borderRadius: globalStyles().borderRadius.borderRadius / 2
                    }
                ]}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            ></ShimmerPlaceholder>

            {/* VALUE */}
            <ShimmerPlaceholder
                style={{
                    width: "10%",
                    height: "100%",
                    borderRadius: 100
                }}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            ></ShimmerPlaceholder>
        </View>
    );
};

export default CardButtonSkeleton;
