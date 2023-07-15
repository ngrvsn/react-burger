export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';

export function updateIngredientCount(id, count) {
  return {
    type: UPDATE_INGREDIENT_COUNT,
    payload: { id, count },
  };
}