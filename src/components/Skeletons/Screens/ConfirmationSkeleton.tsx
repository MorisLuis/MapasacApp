import React, { JSX } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { useTheme } from '../../../context/ThemeContext';
import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme';
import { globalStyles } from '../../../theme/appTheme';

const ARRAY_LENGTH = 6;

export const ConfirmationSkeleton = (): JSX.Element => {
    const { theme, typeTheme } = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
                <ShimmerPlaceholder style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <ShimmerPlaceholder></ShimmerPlaceholder>
                </ShimmerPlaceholder>

                <ShimmerPlaceholder style={[ConfirmationScreenStyles(theme).confirmationSells, extraStyles.confirmationSells]}>
                    <ShimmerPlaceholder style={[ConfirmationScreenStyles(theme).confirmationContainer]}>
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
                    data={Array(ARRAY_LENGTH).fill({})}
                    renderItem={() => <ProductCardSkeleton />}
                    style={LayoutBagStyles(theme, typeTheme).content}
                    keyExtractor={(_, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={globalStyles().ItemSeparator} />}
                />
            </View>
        </SafeAreaView>
    )
}

const extraStyles = StyleSheet.create({
    confirmationSells: {
        minHeight: 100
    }
})
