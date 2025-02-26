import { SellsBagInterface } from "./SellsBagProvider";


type SellsBagActionType =
    | { type: '[SellsBag] - Update Summary', payload: { numberOfItemsSells?: string; } }
    | { type: '[SellsBag] - LogOut' }


export const sellsBagReducer = (state: SellsBagInterface, action: SellsBagActionType): SellsBagInterface => {

    switch (action.type) {

        case '[SellsBag] - Update Summary':
            return {
                ...state,
                ...action.payload
            }

        case '[SellsBag] - LogOut':
            return {
                ...state,
                numberOfItemsSells : "0",
            }

        default:
            return state
    }

}