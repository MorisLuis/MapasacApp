import { StyleSheet } from "react-native";

import { Theme, globalFont, globalStyles } from "./appTheme";

export const OnboardingScreenStyles = ({ theme, typeTheme, size }: { theme: Theme, typeTheme?: string, size: (_value: string) => number }) => StyleSheet.create({
    OnboardingScreen: {
        backgroundColor: theme.background_color,
        height: size('100%'),
        padding: globalStyles().globalPadding.padding
    },
    topbar: {
        height: size('5%'),
        minHeight: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    topbar_profile: {
        backgroundColor: theme.color_secondary,
        height: 40,
        width: 40,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: globalStyles().borderRadius.borderRadius,
    },
    topbar_profile_landscape: {
        height: 60,
        width: 60,
    },
    topbar_profile_text: {
        fontSize: globalFont(size).font_normal,
        color: theme.color_tertiary,
        fontFamily: 'Rubik-Bold'
    },
    header: {
        width: size("100%"),
        marginBottom: size("1%"),
        maxWidth: "100%"
    },
    headerTitle: {
        fontSize: globalFont(size).font_med * 1.2,
        color: theme.text_color,
        marginBottom: globalStyles().globalMarginBottom.marginBottom,
        width: '100%',
        maxWidth: '100%',
        fontFamily: 'Rubik-Bold',
        flexWrap: 'wrap',
    },
    content: {
        flex: 1,
        width: '100%',
        height: '100%',
        gap: globalStyles().gap.gap
    },
    content_wrapper: {
        justifyContent: 'space-between',
        gap: globalStyles().gap.gap
    },
    content_container: {
        gap: globalStyles().gap.gap,
    },
    moduleOption: {
        flex: 1,
        gap: globalStyles().gap.gap,
        borderWidth: 1,
        borderRadius: globalStyles().borderRadius.borderRadius * 3,
        borderColor: typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary,
        padding: globalStyles().globalPadding.padding
    },
    optionText: {
        fontSize: globalFont(size).font_normal,
        color: "black"
    }

})