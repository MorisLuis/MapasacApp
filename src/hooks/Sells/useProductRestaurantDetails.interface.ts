import { RouteProp } from "@react-navigation/native";
import { SellsRestaurantsNavigationStackParamList } from "../../navigator/SellsRestaurantsNavigation";
import ClassInterface from "../../interface/class";
import { SellsRestaurantBagForm } from "../../context/SellsRestaurants/SellsRestaurantsBagProvider.interface";


type Route = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - SellsRestaurantsDetailsScreen'>;


type ExtraProductData = {
    image: string;
    descripcio: string;
    totalClasses: number;
    cvefamilia: number;
    classValue?: ClassInterface;
};

interface useProductDetailsResponse {
    extraData: ExtraProductData;
    watchedValues: SellsRestaurantBagForm;
    submitBagRestaurantsProduct: () => void;
    selectAmount:  () => void;
    navigateToClass: () => void;
    buttonDisabled: boolean;
};

const DEFAULT_VALUE = 0;
const MINIMUM_CLASSES = 1;


export {
    DEFAULT_VALUE,
    MINIMUM_CLASSES
}

export type {
    Route,
    ExtraProductData,
    useProductDetailsResponse
}