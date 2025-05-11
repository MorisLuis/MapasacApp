import { SellsRestaurantBagInterface } from "./SellsRestaurantsBagProvider.interface";


type SellsBagActionType =
    | { type: '[SellsRestaurantBag] - Update Summary', payload: { numberOfItemsSells?: number; } }
    | { type: '[SellsRestaurantBag] - LogOut' }


export const SellsRestaurantsBagReducer = (state: SellsRestaurantBagInterface, action: SellsBagActionType): SellsRestaurantBagInterface => {

    switch (action.type) {

        case '[SellsRestaurantBag] - Update Summary':
            return {
                ...state,
                ...action.payload
            }

        case '[SellsRestaurantBag] - LogOut':
            return {
                ...state,
                numberOfItemsSells : 0,
            }

        default:
            return state
    }

}