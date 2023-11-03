import { MODAL_INGREDIENT } from "../constants/modal-item";
import { TIngredientProps } from "../../utils/types";
import { TModalAction } from "../actions/modal-item";


export type TIngedientModalState = {
    modalIngredient: TIngredientProps
};

const initialState = {
    modalIngredient: null,
};

export const modalItemReducer = (state = initialState, action:TModalAction) => {
    switch (action.type) {
        case MODAL_INGREDIENT: {
            return {
                ...state,
                modalIngredient: action.payload
            };
        }
        default: {
            return state;
        }
    }
};