import { InventoryBagInterface } from "./InventoryBagProvider";


type InventoryBagActionType =
    | { type: '[InventoryBag] - Post Inventory' }
    | {
        type: '[InventoryBag] - Update Summary',
        payload: {
            numberOfItems?: string;
        }
    }
    | { type: '[InventoryBag] - LogOut' }


export const innventoryBagReducer = (state: InventoryBagInterface, action: InventoryBagActionType): InventoryBagInterface => {

    switch (action.type) {

        case '[InventoryBag] - Post Inventory':
            return {
                ...state
            }

        case '[InventoryBag] - Update Summary':
            return {
                ...state,
                ...action.payload
            }

        case '[InventoryBag] - LogOut':
            return {
                ...state,
                numberOfItems: "0"
            }

        default:
            return state
    }

}