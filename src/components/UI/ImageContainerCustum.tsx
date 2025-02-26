import { Image, View, ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import React, { useState } from 'react';
import { uiImageCustumContainerStyles } from '../../theme/UI/uiElementsTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface ImageContainerCustumInterface {
    imageValue?: string;
    size?: 'small';
}

export default function ImageContainerCustum({
    imageValue,
    size
}: ImageContainerCustumInterface) {

    const { typeTheme, theme } = useTheme();
    const [imageHeight, setImageHeight] = useState<number | undefined>(undefined); // Track dynamic height

    const handleImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
        const { width, height } = event.nativeEvent.source;
        const aspectRatio = height / width;

        // Assuming we have a fixed width, calculate the height based on aspect ratio
        const calculatedHeight = 180 * aspectRatio;  // Or adapt this with actual width
        setImageHeight(calculatedHeight > 180 ? 180 : calculatedHeight);  // Respect maxHeight
    };

    const imageRender = () => {
        return (
            <View style={[
                uiImageCustumContainerStyles(theme, typeTheme).imageBackground,
                { height: imageHeight || 180, maxHeight: 180 }  // Dynamic height with maxHeight 180
            ]}>
                <Image
                    source={{ uri: `data:image/png;base64,${imageValue}` }}
                    style={uiImageCustumContainerStyles(theme, typeTheme).image}
                    onLoad={handleImageLoad}  // Trigger when image is loaded to get size
                    resizeMode="cover"  // Contain the image inside the view
                />
            </View>
        )
    };

    const notImageRender = () => {
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
                size && { height: 200 }
            ]}
        >
            {
                imageValue ? imageRender() : notImageRender()
            }
        </View>
    );
}
