import { Image, View, ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import React, { JSX, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { uiImageCustumContainerStyles } from '../../theme/UI/uiElementsTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/styles/useTheme';

interface ImageContainerCustumInterface {
    imageValue?: string;
    sizeImage?: 'small';
}

const MAX_HEIGH = 180;
const MAX_HEIGH_TABLET = 300;

export default function ImageContainerCustum({
    imageValue,
    sizeImage
}: ImageContainerCustumInterface) : JSX.Element {

    const { typeTheme, theme, size } = useTheme();
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
                uiImageCustumContainerStyles({ theme, typeTheme, size }).imageBackground,
                { height: imageHeight || MAX_HEIGH, maxHeight: MAX_HEIGH }
            ]}>
                <Image
                    source={{ uri: `data:image/png;base64,${imageValue}` }}
                    style={uiImageCustumContainerStyles({ theme, typeTheme, size }).image}
                    onLoad={handleImageLoad}
                    resizeMode="cover"
                />
            </View>
        )
    };

    const notImageRender = () : JSX.Element => {
        return (
            <View style={uiImageCustumContainerStyles({ theme, typeTheme, size }).notImage}>
                <View style={uiImageCustumContainerStyles({theme, typeTheme, size}).notImageBackground}>
                    <Icon name={'image-outline'} size={24} color={'gray'} />
                </View>
            </View>
        )
    }

    return (
        <View
            style={[
                uiImageCustumContainerStyles({ theme, typeTheme, size }).imageContainer,
                sizeImage && { height: isTablet ? MAX_HEIGH_TABLET : MAX_HEIGH }
            ]}
        >
            {
                imageValue ? imageRender() : notImageRender()
            }
        </View>
    );
}
