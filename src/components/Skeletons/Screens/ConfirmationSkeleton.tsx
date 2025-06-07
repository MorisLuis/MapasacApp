import React, { JSX } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { ConfirmationScreenStyles } from '../../../theme/Layout/ConfirmationScreenTheme';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { LayoutBagStyles } from '../../../theme/Layout/LayoutBagTheme';
import { globalStyles } from '../../../theme/appTheme';
import { useTheme } from '../../../hooks/styles/useTheme';

const ARRAY_LENGTH = 6;

export const ConfirmationSkeleton = (): JSX.Element => {
    const { theme, typeTheme, size } = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={ConfirmationScreenStyles({ theme, typeTheme, size }).ConfirmationScreen}>
                <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, size }).subtitleConfirmation}>
                    <ShimmerPlaceholder></ShimmerPlaceholder>
                </ShimmerPlaceholder>

                <ShimmerPlaceholder style={[ConfirmationScreenStyles({ theme, size }).confirmationSells, extraStyles.confirmationSells]}>
                    <ShimmerPlaceholder style={[ConfirmationScreenStyles({ theme, size }).confirmationContainer]}>
                        <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                            <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}></ShimmerPlaceholder>
                            <ShimmerPlaceholder style={[ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationText]}></ShimmerPlaceholder>
                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                            <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}></ShimmerPlaceholder>
                            <ShimmerPlaceholder style={[ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationText]}></ShimmerPlaceholder>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItem}>
                            <ShimmerPlaceholder style={ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationItemLabel}></ShimmerPlaceholder>
                            <ShimmerPlaceholder style={[ConfirmationScreenStyles({ theme, typeTheme, size }).confirmationText]}></ShimmerPlaceholder>
                        </ShimmerPlaceholder>

                    </ShimmerPlaceholder>
                </ShimmerPlaceholder>


                <FlatList
                    data={Array(ARRAY_LENGTH).fill({})}
                    renderItem={() => <ProductCardSkeleton />}
                    style={LayoutBagStyles({theme, typeTheme, size }).content}
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
