import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNavigationStackParamList } from "../navigator/AppNavigation";
import { InventoryNavigationStackParamList } from "../navigator/InventoryNavigation";
import { SellsNavigationStackParamList } from "../navigator/SellsNavigation";
import { RouteProp } from "@react-navigation/native";
import { CodebarNavigationStackParamList } from "../navigator/CodebarUpdateNavigation";
import { ProfileNavigationStackParamList } from "../navigator/ProfileNavigation";
import { SellsRestaurantsNavigationStackParamList } from "../navigator/SellsRestaurantsNavigation";


// App Navigation. 
export type AppNavigationProp = NativeStackNavigationProp<Partial<AppNavigationStackParamList>>;
export type CombineNavigationProp = NativeStackNavigationProp<Partial<CombinedSellsAndInventoryNavigationStackParamList>>;

export type CombinedInventoryAndAppNavigationStackParamList = InventoryNavigationStackParamList & AppNavigationStackParamList;
export type CombinedSellsAndAppNavigationStackParamList =
    SellsNavigationStackParamList &
    AppNavigationStackParamList &
    SellsRestaurantsNavigationStackParamList;

export type CombinedSellsAndInventoryNavigationStackParamList =
    AppNavigationStackParamList &
    SellsNavigationStackParamList &
    InventoryNavigationStackParamList &
    SellsRestaurantsNavigationStackParamList;

// Codebar navigation
export type CodebarNavigationProp = NativeStackNavigationProp<Partial<CodebarNavigationStackParamList>>;
export type CodebarUpdateNavigationPageRouteProp = RouteProp<InventoryNavigationStackParamList, 'CodebarUpdateNavigation'>;
export type CodebarUpdateNavigationInterface = {
    route: CodebarUpdateNavigationPageRouteProp
};

// Inventory navigation.
export type InventoryNavigationProp = NativeStackNavigationProp<Partial<InventoryNavigationStackParamList>>;


// Profile navigation.
export type ProfileNavigationProp = NativeStackNavigationProp<Partial<ProfileNavigationStackParamList>>;


// Sells navigation.
export type SellsNavigationProp = NativeStackNavigationProp<Partial<SellsNavigationStackParamList>>;

export type UnitType = {
    value: string;
    id: number;
};

// Sells Restaurants navigation.
export type SellsRestaurantNavigationProp = NativeStackNavigationProp<Partial<SellsRestaurantsNavigationStackParamList>>;
