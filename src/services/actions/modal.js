export const MODAL_ADD_INGREDIENT = 'MODAL_ADD_INGREDIENT';
export const MODAL_DELETE_INGREDIENT = 'MODAL_DELETE_INGREDIENT';

export const addModalItem = item => {
  return {
    type: MODAL_ADD_INGREDIENT,
    ingredient: item,
  };
};