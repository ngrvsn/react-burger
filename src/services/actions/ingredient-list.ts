import { BURGER_INGREDIENTS_LIST } from "../constants/ingrerient-list";
import { TIngredientProps } from "../../utils/types";

export type TBurgerIngredientsActions = {
     type: typeof BURGER_INGREDIENTS_LIST;
     payload: TIngredientProps[];
  }


export const setBurgerIngredientsList = (items: TIngredientProps[]):TBurgerIngredientsActions => ({
    type: BURGER_INGREDIENTS_LIST,
    payload: items,
});
