import { MODAL_INGREDIENT, MODAL_DELETE_INGREDIENT } from "../constants/modal-item";
import { TIngredientProps } from "../../utils/types";


export type TModalAction = {
    type: typeof MODAL_INGREDIENT;
    payload: TIngredientProps;
  };
  
  export const setModalIngredient = (item: TIngredientProps): TModalAction => ({
    type: MODAL_INGREDIENT,
    payload: item,
  });
  