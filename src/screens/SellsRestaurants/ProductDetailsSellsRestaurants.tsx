import React, { JSX, useMemo } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';
import CardButtonSecondary from '../../components/Cards/CardButtonSecondary';
import { useProductRestaurantDetails } from '../../hooks/Sells/useProductRestaurantDetails';
import ImageContainerCustum from '../../components/UI/ImageContainerCustum';
import { useTheme } from '../../hooks/styles/useTheme';
import { globalStyles } from '../../theme/appTheme';


type ProductDetailsSellsRestaurantsScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - SellsRestaurantsDetailsScreen'>;

interface ProductDetailsSellsRestaurantsInterface {
    route: ProductDetailsSellsRestaurantsScreenRouteProp;
};

export const ProductDetailsSellsRestaurants = ({
    route
}: ProductDetailsSellsRestaurantsInterface): React.ReactElement => {

    const {
        watchedValues,
        submitBagRestaurantsProduct,
        navigateToClass,
        selectAmount,
        buttonDisabled,
        extraData
    } = useProductRestaurantDetails(route);

    const { typeTheme, theme, size } = useTheme();
    const { navigate } = useNavigation<SellsRestaurantNavigationProp>();

    const renderHeader = useMemo(() => {
        const RenderHeader = (): JSX.Element => (
            <>
                <View style={SellsDataScreenTheme({ theme, typeTheme, size }).header}>
                    <Text style={SellsDataScreenTheme({ theme, typeTheme, size }).title}>
                        {extraData.descripcio.trim()}
                    </Text>
                </View>
                <ImageContainerCustum imageValue={extraData.image} sizeImage="small" />
            </>
        );
        return RenderHeader;
    }, [extraData, theme, typeTheme, size]);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color, flex: globalStyles().flex.flex }} >
            <View style={SellsDataScreenTheme({ theme, typeTheme, size }).SellsDataScreen}>
                <ScrollView
                    contentContainerStyle={SellsDataScreenTheme({ theme, typeTheme, size }).SellsDataScreen_content}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHeader()}
                    <CardButtonSecondary
                        onPress={navigateToClass}
                        value={watchedValues?.typeClass?.value.trim() || ''}
                        label='Clase:'
                        emptyValue='Seleccionar la clase'
                        color='blue'
                        icon='resize-outline'
                    />

                    <CardButtonSecondary
                        label='Precio:'
                        value={watchedValues?.price || ''}
                        emptyValue='Seleccionar precio'
                        color='purple'
                        icon="pricetags"
                        isPrice={true}
                    />

                    <CardButtonSecondary
                        onPress={selectAmount}
                        value={watchedValues?.pieces || ''}
                        label='Cantidad:'
                        emptyValue='Seleccionar cantidad'
                        color='green'
                        icon="bag-handle"
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[SellsRestaurants] - CommentInProduct')}
                        label='Comentarios:'
                        value={watchedValues?.comments || ''}
                        emptyValue='Escribir comentario'
                        color='red'
                        icon="chatbox"
                    />
                </ScrollView>

                <FooterScreen
                    buttonTitle="Publicar"
                    buttonOnPress={submitBagRestaurantsProduct}
                    buttonDisabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
};