export const MODAL_INGREDIENT = 'MODAL_INGREDIENT';
export const MODAL_DELETE_INGREDIENT = 'MODAL_DELETE_INGREDIENT';
import { TIngredient } from "../../utils/types";

export const setModalIngredient = (item: TIngredient) => ({
    type: MODAL_INGREDIENT,
    payload: item,
})