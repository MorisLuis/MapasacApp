import React from 'react'
import { View, FlatList } from 'react-native'
import { useTheme } from '../../../context/ThemeContext'
import { globalFont, globalStyles } from '../../../theme/appTheme'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { SelectScreenTheme } from '../../../theme/Screens/Sells/SelectScreenTheme'
import CardButtonSkeleton from '../CardButtonSkeleton'

export default function SelectClassSkeleton() {
    const { theme, typeTheme } = useTheme();

    // Definir los colores del shimmer
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <View style={[
            SelectScreenTheme(theme, typeTheme).SelectScreen,
            {
                display: 'flex',
                alignItems: 'center'
            }
        ]}>
            <ShimmerPlaceholder
                style={[
                    SelectScreenTheme(theme, typeTheme).header,
                    {
                        height: globalFont.font_med + 5,
                        borderRadius: globalStyles().borderRadius.borderRadius
                    }
                ]}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceholder>
            <FlatList
                data={Array(6).fill({})}
                renderItem={() => <CardButtonSkeleton />}
                keyExtractor={(_, index) => index.toString()} // Usamos el índice como key temporal
                onEndReachedThreshold={0}
            />
        </View>
    )
}