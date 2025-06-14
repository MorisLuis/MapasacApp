import React, { JSX } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { SellsDataScreenTheme } from '../../theme/Screens/Sells/SellsDataScreenTheme';
import CustomText from '../../components/UI/CustumText';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Tag from '../../components/UI/Tag';
import ImageContainerCustum from '../../components/UI/ImageContainerCustum';
import CardButtonSecondary from '../../components/Cards/CardButtonSecondary';
import { SellsNavigationProp } from '../../interface';
import { useProductDetails } from '../../hooks/Sells/useProductDetails';
import { NUMBER_0 } from '../../utils/globalConstants';
import { useTheme } from '../../hooks/styles/useTheme';
import { globalStyles } from '../../theme/appTheme';

type ProductDetailsSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - SellsProductDetails'>;

interface ProductDetailsSellsInterface {
    route: ProductDetailsSellsScreenRouteProp;
}

const ONE_CLASS = 1;

export const ProductDetailsSells = ({
    route
}: ProductDetailsSellsInterface): React.ReactElement => {

    const { typeTheme, theme, size } = useTheme();
    const { navigate } = useNavigation<SellsNavigationProp>();

    const {
        watchedValues,
        submitBagProduct,
        navigateToClass,
        extraData,
        buttonDisabled
    } = useProductDetails(route);

    const renderHeader = (): JSX.Element => (
        <>
            <View style={SellsDataScreenTheme({ theme, typeTheme, size }).header}>
                <CustomText style={SellsDataScreenTheme({ theme, typeTheme, size }).title}>
                    {extraData.descripcio.trim()}
                </CustomText>
                {
                    extraData.totalClasses > NUMBER_0 &&
                    <Tag
                        message={`${extraData.totalClasses} ${extraData.totalClasses === ONE_CLASS ? 'Clase' : 'Clases'}`}
                        color='purple'
                        extraStyles={SellsDataScreenTheme({ theme, typeTheme, size }).title_tag}
                    />
                }
            </View>
            <ImageContainerCustum
                imageValue={extraData.image}
                sizeImage="small"
            />
        </>
    );

    return (
        <SafeAreaView style={{ flex: globalStyles().flex.flex }}>
            <View style={SellsDataScreenTheme({ theme, typeTheme, size }).SellsDataScreen}>
                <ScrollView
                    contentContainerStyle={SellsDataScreenTheme({ theme, typeTheme, size }).SellsDataScreen_content}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHeader()}

                    <CardButtonSecondary
                        onPress={navigateToClass}
                        value={watchedValues['capa']}
                        label='Clase:'
                        emptyValue='No tiene clase'
                        color="blue"
                        icon='resize-outline'
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[Sells] - PiecesScreen', {
                            from: "pieces",
                            valueDefault: watchedValues['pieces'] || '',
                            unit: 'PZA'
                        })}
                        value={watchedValues?.pieces || ''}
                        label='Cantidad:'
                        emptyValue='Seleccionar la cantidad'
                        color="green"
                        icon="bag-handle"
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[Sells] - UnitScreen', { valueDefault: watchedValues['units'] })}
                        value={watchedValues['units'].value}
                        label='Unidad:'
                        emptyValue='Seleccionar Unidad'
                        color="red"
                        icon="shapes"
                    />

                    <CardButtonSecondary
                        onPress={() => navigate('[Sells] - PriceScreen', { from: "price", valueDefault: watchedValues['price'], unit: 'MXN' })}
                        value={watchedValues['price']}
                        label='Precio:'
                        emptyValue='Seleccionar precio'
                        color="purple"
                        icon="pricetags"
                    />

                </ScrollView>
                <FooterScreen
                    buttonTitle="Publicar"
                    buttonOnPress={submitBagProduct}
                    buttonDisabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
};
