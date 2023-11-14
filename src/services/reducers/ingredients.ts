import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "../constants/ingredients";
import { TIngredientProps } from "../../utils/types";
import { TIngredientsAction } from "../actions/ingredients";

export type TIngredientsState = {
    ingredientList: TIngredientProps[]
    ingredientListRequest: boolean 
    ingredientListFailed: boolean}

const initialState = {
    ingredientList: [],
    ingredientListRequest: false,
    ingredientListFailed: false}

export const ingredientsReducer = (state = initialState, action:TIngredientsAction) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientListRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientListRequest: false,
                ingredientList: action.payload,
                ingredientListFailed: false

            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientListFailed: true,
                ingredientListRequest: false,
                ingredientList: []
            };
        }
        default: {
            return state;
        }
    }
};
