export const MODAL_INGREDIENT = 'MODAL_INGREDIENT';
export const MODAL_DELETE_INGREDIENT = 'MODAL_DELETE_INGREDIENT';

export const setModalIngredient = (item) => ({
    type: MODAL_INGREDIENT,
    payload: item,
})