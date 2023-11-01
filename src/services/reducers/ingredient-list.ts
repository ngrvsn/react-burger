import { BURGER_INGREDIENTS_LIST } from "../constants/ingrerient-list";
import { TIngredientProps } from "../../utils/types";
import { TBurgerIngredientsActions } from "../actions/ingredient-list";


export type TBurgerInitialState = {
    burgerIngredientsList: TIngredientProps[]}

const initialState:TBurgerInitialState = {
    burgerIngredientsList: []}

export const ingredientListReducer = (state = initialState, action:TBurgerIngredientsActions) => {
    switch (action.type) {
        case BURGER_INGREDIENTS_LIST: {
             return {
                ...state,
                burgerIngredientsList: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
