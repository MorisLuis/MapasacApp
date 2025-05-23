import { RouteProp } from "@react-navigation/native";
import ClassInterface from "../../interface/class";
import { SellsBagForm } from "../../context/Sells/SellsBagProvider.interface";
import { SellsNavigationStackParamList } from "../../navigator/SellsNavigation";


type Route = RouteProp<SellsNavigationStackParamList, '[Sells] - SellsProductDetails'>;

type ExtraProductData = {
    image: string;
    descripcio: string;
    totalClasses: number;
    cvefamilia: number;
    classValue: ClassInterface
};

interface useProductDetailsResponse {
    extraData: ExtraProductData;
    watchedValues: SellsBagForm;
    submitBagProduct: () => void;
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