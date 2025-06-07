import React, { JSX } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OnboardingScreenStyles } from '../../theme/OnboardingScreenTheme';
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../hooks/styles/useTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ModulesSkeleton = (): JSX.Element => {

    const { theme, typeTheme } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <View style={extraStyles.ModulesSkeleton}>
            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[OnboardingScreenStyles(theme).moduleOption, extraStyles.moduleOption]}
            ></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[OnboardingScreenStyles(theme).moduleOption, extraStyles.moduleOption2]}
            ></ShimmerPlaceHolder>
        </View>
    )
}

const DIVIDER_TWO = 2;

const extraStyles = StyleSheet.create({
    ModulesSkeleton: {
        marginBottom: globalStyles().globalPadding.padding / DIVIDER_TWO,
        flexDirection: 'row',
        height: 'auto'
    },

    moduleOption: {
        flex: 1,
        height: hp("12.5%"),
        marginRight: 10,
        padding: 0,
        borderWidth: 0
    },

    moduleOption2: {
        flex: 1,
        height: hp("12.5%"),
        marginRight: 0,
        padding: 0,
        borderWidth: 0
    }
})
