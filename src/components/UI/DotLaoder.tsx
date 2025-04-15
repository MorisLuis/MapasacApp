import React, { useRef, useEffect, JSX } from 'react';
import { View, Animated, ViewStyle } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { LoaderStyles } from '../../theme/UI/LoaderStyles';
import { NUMBER_0 } from '../../utils/globalConstants';

// ⚙️ Config animación
const DOT_BOUNCE_DISTANCE = -10;
const DOT_ANIMATION_DURATION = 500;

// eslint-disable-next-line no-magic-numbers
const DOT_ANIMATION_DELAYS = [0, 150, 300];
const NUMBER_1 = 1;
const NUMBER_2 = 2;

const DotLoader = (): JSX.Element => {
    const { theme, typeTheme } = useTheme();

    const dot1 = useRef(new Animated.Value(NUMBER_0)).current;
    const dot2 = useRef(new Animated.Value(NUMBER_0)).current;
    const dot3 = useRef(new Animated.Value(NUMBER_0)).current;

    const animateDot = (dot: Animated.Value, delay: number): void => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(dot, {
                    toValue: DOT_BOUNCE_DISTANCE,
                    duration: DOT_ANIMATION_DURATION,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(dot, {
                    toValue: NUMBER_0,
                    duration: DOT_ANIMATION_DURATION,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        animateDot(dot1, DOT_ANIMATION_DELAYS[NUMBER_0]);
        animateDot(dot2, DOT_ANIMATION_DELAYS[NUMBER_1]);
        animateDot(dot3, DOT_ANIMATION_DELAYS[NUMBER_2]);
    }, [dot1, dot2, dot3]);

    const dotStyle = (dot: Animated.Value): ViewStyle => ({
        transform: [{ translateY: dot }],
    });

    return (
        <View style={LoaderStyles(theme, typeTheme).container}>
            <Animated.View style={[LoaderStyles(theme, typeTheme).dot, dotStyle(dot1)]} />
            <Animated.View style={[LoaderStyles(theme, typeTheme).dot, dotStyle(dot2)]} />
            <Animated.View style={[LoaderStyles(theme, typeTheme).dot, dotStyle(dot3)]} />
        </View>
    );
};

export default DotLoader;
