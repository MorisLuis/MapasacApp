import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { useTheme } from '../../context/ThemeContext';
import { OnboardingScreenStyles } from '../../theme/OnboardingScreenTheme';
import { globalStyles } from '../../theme/appTheme';
import { View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ModulesSkeleton = () => {
    const { theme, typeTheme } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <View
            style={[
                {
                    marginBottom: globalStyles(theme).globalPadding.padding / 2,
                    flexDirection: 'row',
                    height: 'auto'
                }
            ]}>
            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[OnboardingScreenStyles(theme).moduleOption, { flex: 1, height: hp("12.5%"), marginRight: 10, padding: 0, borderWidth: 0 }]}
            ></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[OnboardingScreenStyles(theme).moduleOption, { flex: 1, height: hp("12.5%"), marginRight: 0, padding: 0, borderWidth: 0 }]}
            ></ShimmerPlaceHolder>
        </View>

    )
}
