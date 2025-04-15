import { Image, View, ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import React, { JSX, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { uiImageCustumContainerStyles } from '../../theme/UI/uiElementsTheme';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';

interface ImageContainerCustumInterface {
    imageValue?: string;
    size?: 'small';
}

const MAX_HEIGH = 180;
const MAX_HEIGH_TABLET = 300;

export default function ImageContainerCustum({
    imageValue,
    size
}: ImageContainerCustumInterface) : JSX.Element {

    const { typeTheme, theme } = useTheme();
    const [imageHeight, setImageHeight] = useState<number | undefined>(undefined); // Track dynamic height
    const  { isTablet } = useResponsive()

    const handleImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) : void => {
        const { width, height } = event.nativeEvent.source;
        const aspectRatio = height / width;

        const calculatedHeight = MAX_HEIGH * aspectRatio;
        setImageHeight(calculatedHeight > MAX_HEIGH ? MAX_HEIGH : calculatedHeight);
    };

    const imageRender = () : JSX.Element => {
        return (
            <View style={[
                uiImageCustumContainerStyles(theme, typeTheme).imageBackground,
                { height: imageHeight || MAX_HEIGH, maxHeight: MAX_HEIGH }
            ]}>
                <Image
                    source={{ uri: `data:image/png;base64,${imageValue}` }}
                    style={uiImageCustumContainerStyles(theme, typeTheme).image}
                    onLoad={handleImageLoad}
                    resizeMode="cover"
                />
            </View>
        )
    };

    const notImageRender = () : JSX.Element => {
        return (
            <View style={uiImageCustumContainerStyles(theme, typeTheme).notImage}>
                <View style={uiImageCustumContainerStyles(theme).notImageBackground}>
                    <Icon name={'image-outline'} size={24} color={'gray'} />
                </View>
            </View>
        )
    }

    return (
        <View
            style={[
                uiImageCustumContainerStyles(theme, typeTheme).imageContainer,
                size && { height: isTablet ? MAX_HEIGH_TABLET : MAX_HEIGH }
            ]}
        >
            {
                imageValue ? imageRender() : notImageRender()
            }
        </View>
    );
}
