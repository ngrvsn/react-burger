export const BURGER_INGREDIENTS_LIST = 'BURGER_INGREDIENTS_LIST';
import { TIngredient } from "../../utils/types";

export const setBurgerIngredientsList = (items: TIngredient[]) => ({
    type: BURGER_INGREDIENTS_LIST,
    payload: items,
});
