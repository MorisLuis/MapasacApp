import { SellsRestaurantsBagInterface } from "./SellsRestaurantsBagProvider";


type SellsBagActionType =
    | { type: '[SellsRestaurantBag] - Update Summary', payload: { numberOfItemsSells?: string; } }
    | { type: '[SellsRestaurantBag] - LogOut' }


export const SellsRestaurantsBagReducer = (state: SellsRestaurantsBagInterface, action: SellsBagActionType): SellsRestaurantsBagInterface => {

    switch (action.type) {

        case '[SellsRestaurantBag] - Update Summary':
            return {
                ...state,
                ...action.payload
            }

        case '[SellsRestaurantBag] - LogOut':
            return {
                ...state,
                numberOfItemsSells : "0",
            }

        default:
            return state
    }

}