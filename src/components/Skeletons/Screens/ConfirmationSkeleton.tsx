import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme';

export const ConfirmationSkeleton = () => {
    const { theme, typeTheme } = useTheme();


    return (

        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
                <ShimmerPlaceholder style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <ShimmerPlaceholder></ShimmerPlaceholder>
                </ShimmerPlaceholder>

                <ShimmerPlaceholder style={ConfirmationScreenStyles(theme).confirmationSells}>
                    <ShimmerPlaceholder style={ConfirmationScreenStyles(theme).confirmationContainer}>
                        <ShimmerPlaceholder style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <ShimmerPlaceholder style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}></ShimmerPlaceholder>
                            <ShimmerPlaceholder style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}></ShimmerPlaceholder>
                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <ShimmerPlaceholder style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}></ShimmerPlaceholder>
                            <ShimmerPlaceholder style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}></ShimmerPlaceholder>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <ShimmerPlaceholder style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}></ShimmerPlaceholder>
                            <ShimmerPlaceholder style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}></ShimmerPlaceholder>
                        </ShimmerPlaceholder>

                    </ShimmerPlaceholder>
                </ShimmerPlaceholder>


                <FlatList
                    data={Array(6).fill({})}
                    renderItem={() => <ProductCardSkeleton />}
                    style={LayoutBagStyles(theme, typeTheme).content}
                    keyExtractor={(_, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />} // Espaciado de 10px
                />
            </View>
        </SafeAreaView>
    )
}
